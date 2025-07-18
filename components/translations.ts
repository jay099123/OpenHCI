export const translations = {
  ENGLISH: {
    welcome: "WELCOME!",
    languageSetting: "Language Setting",
    start: "START",
    connecting: "connecting...(GooGoo Clock)",
    searching: "Searching...",
    almostThere: "Almost there...",
    connectionComplete: "Connection Complete!",
    next: "NEXT",
    back: "Back",
    continue: "Continue",
    onboardingFlow: "Onboarding Flow",
    welcomeSubtitle: "Welcome to StoryTeller AI Setup",
    languageSelection: "Language Selection",
    connectProduct: "Connect Product",
    stepOf: "Step {current} of {total}",
    setting: "Setting"
  },
  中文: {
    welcome: "歡迎！",
    languageSetting: "語言設定",
    start: "開始",
    connecting: "連接中...(GooGoo Clock)",
    searching: "搜尋中...",
    almostThere: "快要看到了...",
    connectionComplete: "連結完成！",
    next: "下一步",
    back: "返回",
    continue: "繼續",
    onboardingFlow: "引導流程",
    welcomeSubtitle: "歡迎使用 StoryTeller AI 設定",
    languageSelection: "語言選擇",
    connectProduct: "連結產品",
    stepOf: "第 {current} 步，共 {total} 步",
    setting: "設定"
  },
  日本語: {
    welcome: "ようこそ！",
    languageSetting: "言語設定",
    start: "開始",
    connecting: "接続中...(GooGoo Clock)",
    searching: "検索中...",
    almostThere: "もうすぐです...",
    connectionComplete: "接続完了！",
    next: "次へ",
    back: "戻る",
    continue: "続行",
    onboardingFlow: "オンボーディングフロー",
    welcomeSubtitle: "StoryTeller AI セットアップへようこそ",
    languageSelection: "言語選択",
    connectProduct: "製品接続",
    stepOf: "ステップ {current} / {total}",
    setting: "設定"
  },
  한국어: {
    welcome: "환영합니다!",
    languageSetting: "언어 설정",
    start: "시작",
    connecting: "연결 중...(GooGoo Clock)",
    searching: "검색 중...",
    almostThere: "거의 다 왔습니다...",
    connectionComplete: "연결 완료!",
    next: "다음",
    back: "뒤로",
    continue: "계속",
    onboardingFlow: "온보딩 플로우",
    welcomeSubtitle: "StoryTeller AI 설정에 오신 것을 환영합니다",
    languageSelection: "언어 선택",
    connectProduct: "제품 연결",
    stepOf: "단계 {current} / {total}",
    setting: "설정"
  },
};

export const languages = [
  { code: "ENGLISH", label: "English" },
  { code: "中文", label: "中文" },
  { code: "日本語", label: "日本語" },
  { code: "한국어", label: "한국어" },
];

// Helper function to get translations
export const getTranslation = (language: string) => {
  return translations[language as keyof typeof translations] || translations.ENGLISH;
};