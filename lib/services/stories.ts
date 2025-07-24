// services/stories.ts
import { storiesCollection } from "@/utils/firebase.browser";
import { DocumentData, Query, getDocs, doc, getDoc, where, query } from "firebase/firestore";



export interface Story {
  id: string;
  planetId: string;
  title: string;
  date: string;
  content: {
    story1: string;
    story2: string;
    story3: string;
    story4: string;
    story5: string;
  };
  illustrations: string[];
  dialogs: {
    question: string;
    option1: string;
    response1: string;
    answer: string;
  };
  metadata: {
    generatedBy: string;
    theme: string;
    targetAge: string;
    moralLesson: string;
  };
  isPublished: boolean;
  createdAt: string;
}

export async function getAllStories(): Promise<Story[]> {
  const querySnapshot = await getDocs(storiesCollection);
  
  const stories = querySnapshot.docs.map((doc: DocumentData) => {
    return { ...doc.data(), id: doc.id };
  });

  return stories as Story[];
}

export async function getStoriesByPlanet(planetId: string): Promise<Story[]> {
  const q = query(storiesCollection, where("planetId", "==", planetId));
  const querySnapshot = await getDocs(q);
  
  const stories = querySnapshot.docs.map((doc: DocumentData) => {
    return { ...doc.data(), id: doc.id };
  });

  return stories as Story[];
}

export async function getStoryById(storyId: string): Promise<Story | null> {
  const docRef = doc(storiesCollection, storyId);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return { ...docSnap.data(), id: docSnap.id } as Story;
  }
  
  return null;
}