// hooks/usePlanets.ts
import { useState, useEffect } from 'react';
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
  };
}

// Helper function to sort pages by pageNumber
function sortPagesByNumber(pages: { [key: string]: StoryPage }): StoryPage[] {
  return Object.values(pages).sort((a, b) => a.pageNumber - b.pageNumber);
}

export function usePlanets() {
  const [planets, setPlanets] = useState<PlanetWithStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPlanetsWithStories() {
      try {
        setLoading(true);
        setError(null);
        
        console.log('🌍 Starting to fetch planets...');
        const planetsData = await getAllPlanets();
        console.log('🌍 Planets fetched:', planetsData.length, planetsData);
        
        if (planetsData.length === 0) {
          console.warn('⚠️ No planets generated from stories');
          setPlanets([]);
          return;
        }
        
        console.log('📚 Fetching stories for each planet...');
        const planetsWithStories = await Promise.all(
          planetsData.map(async (planet) => {
            try {
              const story = await getStoryById(planet.storyId);
              console.log(`📖 Story for planet ${planet.id}:`, story);
              
              if (story && story.pages) {
                // Sort pages by pageNumber to ensure correct order
                const sortedPages = sortPagesByNumber(story.pages);
                console.log(`📑 Sorted pages for ${story.title}:`, sortedPages);
                
                return {
                  ...planet,
                  story,
                  diaryContent: {
                    date: new Date(story.createdAt).toLocaleDateString('zh-TW'),
                    title: story.title,
                    // Use actual text from pages, fallback to title if not enough pages
                    story: sortedPages[0]?.text || `${story.title} - 開始我們的故事吧！`,
                    story2: sortedPages[1]?.text || '故事繼續...',
                    story3: sortedPages[2]?.text || '故事發展...',
                    story4: sortedPages[3]?.text || '故事高潮...',
                    story5: sortedPages[4]?.text || '故事結局...',
                    // Use actual imageUrls from pages, fallback to placeholders
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
                    titleImage: "/draw-09.png"
                  }
                };
              } else {
                console.warn(`⚠️ No story or pages found for planet: ${planet.id}`);
                return planet;
              }
            } catch (storyError) {
              console.error(`❌ Error fetching story for planet ${planet.id}:`, storyError);
              return planet;
            }
          })
        );
        
        console.log('✅ Final planets with stories:', planetsWithStories);
        setPlanets(planetsWithStories);
      } catch (err) {
        console.error('❌ Error in fetchPlanetsWithStories:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    }

    fetchPlanetsWithStories();
  }, []);

  return { planets, loading, error };
}