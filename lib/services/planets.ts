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
  storyId: string;
}

// Generate planets from stories with dynamic theming
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
      
      // Generate diverse themes that cycle but aren't limited to 5
      const themes = [
        'politeness', 'honesty', 'kindness', 'friendship', 'courage',
        'wisdom', 'creativity', 'empathy', 'perseverance', 'gratitude',
        'respect', 'responsibility', 'generosity', 'patience', 'humility'
      ];
      
      // Use planetName from database, fallback to generated name if not available
      const planetName = story.planetName || generatePlanetName(primaryColor, index);
      const planetTitle = generatePlanetTitle(story.title, index);
      
      const themeIndex = index % themes.length;
      
      console.log(`🏷️ Planet name for story "${story.title}":`, {
        dbPlanetName: story.planetName,
        generatedName: generatePlanetName(primaryColor, index),
        finalName: planetName
      });
      
      return {
        id: `planet_${story.id}`,
        name: planetName, // Now uses database planetName or fallback
        image: '/cplan.png', // Use same base image for all planets
        color: primaryColor, // Use the story's color
        title: planetTitle,
        description: `基於故事《${story.title}》的星球`,
        theme: themes[themeIndex],
        isActive: true,
        createdAt: story.createdAt,
        storyId: story.id
      };
    });
    
    console.log('✅ Generated planets:', planets);
    return planets;
  } catch (error) {
    console.error('❌ Error generating planets:', error);
    throw error;
  }
}

// Helper function to generate planet names based on color
function generatePlanetName(color: string, index: number): string {
  // Extract RGB values to determine color characteristics
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // Determine dominant color
  const max = Math.max(r, g, b);
  const colorNames = [];
  
  if (r === max) colorNames.push('紅');
  if (g === max) colorNames.push('綠'); 
  if (b === max) colorNames.push('藍');
  
  // If it's a grayscale color
  if (Math.abs(r - g) < 30 && Math.abs(g - b) < 30 && Math.abs(r - b) < 30) {
    if (max > 200) colorNames.push('亮');
    else if (max < 100) colorNames.push('暗');
    else colorNames.push('灰');
  }
  
  const colorName = colorNames.length > 0 ? colorNames[0] : '彩';
  const planetNumber = index + 1;
  
  return `${colorName}色星球 ${planetNumber}`;
}

// Helper function to generate planet titles
function generatePlanetTitle(storyTitle: string, index: number): string {
  const themes = [
    '品格', '智慧', '友誼', '勇氣', '善良',
    '誠實', '禮貌', '創意', '關懷', '感恩',
    '尊重', '責任', '慷慨', '耐心', '謙遜'
  ];
  
  const theme = themes[index % themes.length];
  return `${theme}星球`;
}

export async function getPlanetById(planetId: string): Promise<Planet | null> {
  const planets = await getAllPlanets();
  return planets.find(planet => planet.id === planetId) || null;
}

export async function getPlanetByStoryId(storyId: string): Promise<Planet | null> {
  const planets = await getAllPlanets();
  return planets.find(planet => planet.storyId === storyId) || null;
}