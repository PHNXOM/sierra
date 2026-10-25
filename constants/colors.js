// Colors shared by both themes
export const COLORS = {
  primary: "#6993ff",
  success: "#4CAF50",
  typing: "#00fa57",
  danger: "#de0007",
  dangerSoft: "#fc8d95",
  warning: "#ff9800",
  muted: "#7f8c8d",
  white: "#ffffff",
};

// Colors that change with the theme
export const THEMES = {
  light: {
    background: "#ffffff",
    gradient: ["rgb(215, 236, 250)", "rgb(239, 239, 255)", "rgb(255, 235, 253)"],
    surface: "#ffffff", // headers, tab bar, cards, inputs
    text: "#333333", // titles and secondary text
    textStrong: "#000000", // body text and icons
    bubble: "#cccccc", // received message bubble
    authTitle: "#2c3e50",
    statusBar: "dark-content",
    progressTrack: "#cccccc",
    progressBar: "#000000aa",
  },
  dark: {
    background: "#000000",
    gradient: null,
    surface: "rgb(30, 30, 30)",
    text: "#EAEAEA",
    textStrong: "#ffffff",
    bubble: "rgb(30, 30, 30)",
    authTitle: "#d3c1af",
    statusBar: "light-content",
    progressTrack: "#333333",
    progressBar: "#ffffffaa",
  },
};
