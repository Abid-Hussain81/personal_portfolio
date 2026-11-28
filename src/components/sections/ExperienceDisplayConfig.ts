const assets = "/models/experience";

export const experienceDisplays = {
  "mind-gauge": {
    tint: "#e2ebe8",
    edge: "#d0dfd8",
    preview: assets + "/mind-gauge.webp",
    mobilePreview: assets + "/mind-gauge-mobile.webp",
  },
  gaply: {
    tint: "#eae6ee",
    edge: "#ddd6e2",
    preview: assets + "/gaply.webp",
    mobilePreview: assets + "/gaply-mobile.webp",
  },
  independent: {
    tint: "#ede2d4",
    edge: "#e1d4c5",
    preview: assets + "/independent.webp",
    mobilePreview: assets + "/independent-mobile.webp",
  },
} as const;

export type ExperienceScene = keyof typeof experienceDisplays;
export const courtyardPhoto = assets + "/courtyard.webp";
