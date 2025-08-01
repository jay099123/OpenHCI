// hooks/usePlanets.ts
import { useState, useEffect, useCallback } from 'react';
import { getAllPlanets, Planet } from '@/lib/services/planets';
import { getStoryById, Story, StoryPage } from '@/lib/services/stories';

export interface PlanetWithStory extends Planet {
  story?: Story;
  diaryContent?: {
    date: string;
    title: string;
    story: string;
    story2: string;
    story3: string;
    story4: string;
    story5: string;
    illustration: string;
    illustration2: string;
    illustration3: string;
    illustration4: string;
    illustration5: string;
    dialog: string;
    dialog2: string;
    dialog3: string;
    dialog4: string;
    colorImage: string;
    titleImage: string;
    planetColor: string;
    sourceImage: string; // Add sourceImage field
  };
}

// Helper function to sort pages by pageNumber
function sortPagesByNumber(pages: { [key: string]: StoryPage }): StoryPage[] {
  return Object.values(pages).sort((a, b) => a.pageNumber - b.pageNumber);
}

export const usePlanets = () => {
  const [planets, setPlanets] = useState<PlanetWithStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPlanets = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('🔄 Loading planets...');
      
      const planetsData = await getAllPlanets();
      console.log('📊 Raw planets data:', planetsData);
      
      const planetsWithStories = await Promise.all(
        planetsData.map(async (planet) => {
          try {
            if (!planet.storyId) {
              console.warn(`⚠️ Planet ${planet.name} has no storyId`);
              return planet;
            }

            const story = await getStoryById(planet.storyId);
            if (!story) {
              console.warn(`⚠️ Story not found for planet: ${planet.name} (storyId: ${planet.storyId})`);
              return planet;
            }

            if (story && story.pages) {
              // Sort pages by pageNumber to ensure correct order
              const sortedPages = sortPagesByNumber(story.pages);
              console.log(`📑 Sorted pages for ${story.title}:`, sortedPages);
              console.log(`🖼️ Source image for ${story.title}:`, story.sourceImage);
              
              return {
                ...planet,
                story,
                diaryContent: {
                  // Use actual createdAt from database
                  date: new Date(story.createdAt).toLocaleDateString('zh-TW', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                  }),
                  title: story.title,
                  // Use actual text from pages
                  story: sortedPages[0]?.text || `${story.title} - 開始我們的故事吧！`,
                  story2: sortedPages[1]?.text || '故事繼續...',
                  story3: sortedPages[2]?.text || '故事發展...',
                  story4: sortedPages[3]?.text || '故事高潮...',
                  story5: sortedPages[4]?.text || '故事結局...',
                  // Use actual imageUrls from pages
                  illustration: sortedPages[0]?.imageUrl || "/page1SS.png",
                  illustration2: sortedPages[1]?.imageUrl || "/p2.png", 
                  illustration3: sortedPages[2]?.imageUrl || "/p3.png",
                  illustration4: sortedPages[3]?.imageUrl || "/p4.png",
                  illustration5: sortedPages[4]?.imageUrl || "/p5.png",
                  dialog: "這個故事教會了我們什麼？",
                  dialog2: "我學到了很多！",
                  dialog3: "很棒的領悟！",
                  dialog4: `從《${story.title}》中我們可以學習到重要的品格。`,
                  colorImage: planet.image,
                  titleImage: "/draw-09.png",
                  // Use actual color from database
                  planetColor: story.colorPalette?.[0]?.hex || planet.color || story.colorPalette?.[1]?.hex || story.colorPalette?.[2]?.hex,
                  // Add sourceImage from story
                  sourceImage: story.sourceImage || planet.sourceImage || '/placeholder.png'
                }
              };
            } else {
              console.warn(`⚠️ No story or pages found for planet: ${planet.id}`);
              return planet;
            }
          } catch (error) {
            console.error(`❌ Error processing planet ${planet.name}:`, error);
            return planet;
          }
        })
      );

      console.log('✅ Planets with stories loaded:', planetsWithStories);
      setPlanets(planetsWithStories);
    } catch (err) {
      console.error('❌ Error in usePlanets:', err);
      setError(err instanceof Error ? err.message : 'Failed to load planets');
    } finally {
      setLoading(false);
    }
  }, []);

  // Add refresh function
  const refreshPlanets = useCallback(() => {
    return loadPlanets();
  }, [loadPlanets]);

  useEffect(() => {
    loadPlanets();
  }, [loadPlanets]);

  return { planets, loading, error, refreshPlanets };
};