// types/index.ts
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
}

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