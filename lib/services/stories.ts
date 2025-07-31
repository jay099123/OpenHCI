// lib/services/stories.ts
import { database } from "@/utils/firebase.browser";
import { ref, get, query, orderByChild, equalTo } from "firebase/database";

export interface StoryPage {
  imageUrl: string;
  pageNumber: number;
  text: string;
}

export interface Story {
  id: string; // Firebase key like "-OWKo20VEu1lzsK7OaFT"
  storyId: string;
  title: string;
  createdAt: string;
  colorPalette: {
    hex: string;
    name: string;
  }[];
  pages: { [key: string]: StoryPage }; // Pages indexed by number (0, 1, 2, etc.)
  planetName: string; // Optional field for planet name
}

export async function getAllStories(): Promise<Story[]> {
  try {
    console.log('🚀 Getting all stories from Realtime Database...');
    
    const storiesRef = ref(database, 'stories');
    const snapshot = await get(storiesRef);
    
    if (!snapshot.exists()) {
      console.log('📊 No stories found in database');
      return [];
    }
    
    const storiesData = snapshot.val();
    console.log('📊 Raw stories data:', storiesData);
    
    const stories: Story[] = Object.keys(storiesData).map(key => ({
      id: key,
      ...storiesData[key]
    }));

    console.log('✅ Final stories array:', stories);
    return stories;
  } catch (error) {
    console.error('❌ Error in getAllStories:', error);
    throw error;
  }
}

export async function getStoryById(storyId: string): Promise<Story | null> {
  try {
    console.log(`🚀 Getting story by ID: ${storyId}`);
    
    const storyRef = ref(database, `stories/${storyId}`);
    const snapshot = await get(storyRef);
    
    if (!snapshot.exists()) {
      console.log(`❌ Story not found: ${storyId}`);
      return null;
    }
    
    const storyData = snapshot.val();
    const story: Story = {
      id: storyId,
      ...storyData
    };
    
    console.log(`✅ Found story:`, story);
    return story;
  } catch (error) {
    console.error(`❌ Error getting story ${storyId}:`, error);
    throw error;
  }
}

export async function getStoriesByTitle(title: string): Promise<Story[]> {
  try {
    console.log(`🚀 Getting stories with title: ${title}`);
    
    const storiesRef = ref(database, 'stories');
    const titleQuery = query(storiesRef, orderByChild('title'), equalTo(title));
    const snapshot = await get(titleQuery);
    
    if (!snapshot.exists()) {
      console.log(`📊 No stories found with title: ${title}`);
      return [];
    }
    
    const storiesData = snapshot.val();
    const stories: Story[] = Object.keys(storiesData).map(key => ({
      id: key,
      ...storiesData[key]
    }));

    console.log(`✅ Stories with title "${title}":`, stories);
    return stories;
  } catch (error) {
    console.error(`❌ Error getting stories by title ${title}:`, error);
    throw error;
  }
}