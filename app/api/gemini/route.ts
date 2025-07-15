import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

/**
 * api key from env
 */
const apiKey = process.env.GEMINI_API_KEY;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt } = body;

    if (!prompt || prompt.trim() === "") {
      return NextResponse.json(
        { error: "fill all fields" },
        { status: 400 }
      );
    }

    if (!apiKey) {
      return NextResponse.json(
        { error: "Gemini API key not configured" },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: {
        parts: [
          {
            text: `You are a helpful assistant for storytelling. Please be concise and precise. 
             **Your response must always be a valid JSON object with the following structure:
    
             * **text_content:** the generated content.
            `,
          },
        ],
        role: "model",
      },
    });

    const parts = [{ text: prompt }];

    /**
     * generation config for gemini api calls
     * setting responseMimeType to JSON to get back response in json format
     */
    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 8192,
      responseMimeType: "application/json",
    };

    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
    });

    if (
      result.response.promptFeedback &&
      result.response.promptFeedback.blockReason
    ) {
      return NextResponse.json(
        { error: `Blocked for ${result.response.promptFeedback.blockReason}` },
        { status: 200 }
      );
    }

    const response = result.response.candidates?.[0]?.content?.parts?.[0]?.text;

    console.log("Gemini response:", response);

    if (!response) {
      return NextResponse.json(
        { error: "No response generated" },
        { status: 500 }
      );
    }

    // Parse the JSON response from Gemini
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(response);
    } catch (parseError) {
      console.error("Failed to parse Gemini response:", parseError);
      return NextResponse.json(
        { error: "Invalid response format from AI" },
        { status: 500 }
      );
    }

    return NextResponse.json(parsedResponse);
  } catch (error) {
    console.error("Gemini API error:", error);
    return NextResponse.json(
      { error: "Failed to get a response from Gemini" },
      { status: 500 }
    );
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { message: "Method not allowed" },
    { status: 405 }
  );
}

