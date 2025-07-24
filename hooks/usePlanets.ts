// hooks/usePlanets.ts
import { useState, useEffect } from 'react';
import { getAllPlanets, Planet } from '@/lib/services/planets';
import { getStoriesByPlanet, Story } from '@/lib/services/stories';

export interface PlanetWithStory extends Planet {
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

export function usePlanets() {
  // ✅ All hooks at the top
  const [planets, setPlanets] = useState<PlanetWithStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPlanetsWithStories() {
      try {
        setLoading(true);
        setError(null);
        
        console.log('🚀 Fetching planets...');
        const planetsData = await getAllPlanets();
        console.log('📊 Planets fetched:', planetsData.length);
        
        // Fetch stories for each planet
        const planetsWithStories = await Promise.all(
          planetsData.map(async (planet) => {
            try {
              const stories = await getStoriesByPlanet(planet.id);
              const latestStory = stories[0];
              
              if (latestStory) {
                return {
                  ...planet,
                  diaryContent: {
                    date: latestStory.date,
                    title: latestStory.title,
                    story: latestStory.content.story1,
                    story2: latestStory.content.story2,
                    story3: latestStory.content.story3,
                    story4: latestStory.content.story4,
                    story5: latestStory.content.story5,
                    illustration: latestStory.illustrations[0] || '/placeholder.png',
                    illustration2: latestStory.illustrations[1] || '/placeholder.png',
                    illustration3: latestStory.illustrations[2] || '/placeholder.png',
                    illustration4: latestStory.illustrations[3] || '/placeholder.png',
                    illustration5: latestStory.illustrations[4] || '/placeholder.png',
                    dialog: latestStory.dialogs.question,
                    dialog2: latestStory.dialogs.option1,
                    dialog3: latestStory.dialogs.response1,
                    dialog4: latestStory.dialogs.answer,
                    colorImage: planet.image,
                    titleImage: "/draw-09.png"
                  }
                };
              }
              
              return planet;
            } catch (storyError) {
              console.warn(`Failed to fetch stories for planet ${planet.id}:`, storyError);
              return planet;
            }
          })
        );
        
        console.log('✅ Planets with stories:', planetsWithStories);
        setPlanets(planetsWithStories);
      } catch (err) {
        console.error('❌ Error fetching planets:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch planets');
      } finally {
        setLoading(false);
      }
    }

    fetchPlanetsWithStories();
  }, []);

  return { planets, loading, error };
}