// lib/services/planets.ts
import { getAllStories, Story } from './stories';

export interface Planet {
  id: string;
  name: string;
  image: string;
  color: string;
  title: string;
  description?: string;
  theme: string;
  isActive: boolean;
  createdAt: string;
  storyId: string; // Link to the story
}

// Generate planets from stories instead of hardcoding
export async function getAllPlanets(): Promise<Planet[]> {
  try {
    console.log('🌍 Generating planets from stories...');
    
    const stories = await getAllStories();
    console.log('📚 Stories for planets:', stories);
    
    if (stories.length === 0) {
      console.warn('⚠️ No stories found, cannot create planets');
      return [];
    }
    
    // Create planets based on available stories
    const planets: Planet[] = stories.map((story, index) => {
      // Extract color from colorPalette
      const primaryColor = story.colorPalette?.[0]?.hex || '#8b5cf6';
      
      // Generate planet themes based on story index
      const themes = ['politeness', 'honesty', 'kindness', 'friendship', 'courage'];
      const planetNames = ['Red Planet', 'Green Planet', 'Blue Planet', 'Yellow Planet', 'Purple Planet'];
      const planetTitles = ['禮貌星球', '誠實星球', '善良星球', '友誼星球', '勇氣星球'];
      const planetImages = ['/b4-06.png', '/yplan.png', '/cplan.png', '/b4-06.png', '/yplan.png'];
      
      const themeIndex = index % themes.length;
      
      return {
        id: `planet_${story.id}`, // Use story ID to create unique planet ID
        name: planetNames[themeIndex],
        image: planetImages[themeIndex],
        color: primaryColor,
        title: planetTitles[themeIndex],
        description: `基於故事《${story.title}》的星球`,
        theme: themes[themeIndex],
        isActive: true,
        createdAt: story.createdAt,
        storyId: story.id // Link to the story
      };
    });
    
    console.log('✅ Generated planets:', planets);
    return planets;
  } catch (error) {
    console.error('❌ Error generating planets:', error);
    throw error;
  }
}

export async function getPlanetById(planetId: string): Promise<Planet | null> {
  const planets = await getAllPlanets();
  return planets.find(planet => planet.id === planetId) || null;
}

export async function getPlanetByStoryId(storyId: string): Promise<Planet | null> {
  const planets = await getAllPlanets();
  return planets.find(planet => planet.storyId === storyId) || null;
}