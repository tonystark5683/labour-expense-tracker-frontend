// constants/colors.js
const coffeeTheme = {
  primary: "#8B593E",
  background: "#FFF8F3",
  text: "#4A3428",
  border: "#E5D3B7",
  white: "#FFFFFF",
  textLight: "#9A8478",
  expense: "#E74C3C",
  income: "#2ECC71",
  card: "#FFFFFF",
  shadow: "#000000",
};

const forestTheme = {
  primary: "#2E7D32",
  background: "#E8F5E9",
  text: "#1B5E20",
  border: "#C8E6C9",
  white: "#FFFFFF",
  textLight: "#66BB6A",
  expense: "#C62828",
  income: "#388E3C",
  card: "#FFFFFF",
  shadow: "#000000",
};

const purpleTheme = {
  primary: "#6A1B9A",
  background: "#F3E5F5",
  text: "#4A148C",
  border: "#D1C4E9",
  white: "#FFFFFF",
  textLight: "#BA68C8",
  expense: "#D32F2F",
  income: "#388E3C",
  card: "#FFFFFF",
  shadow: "#000000",
};

const oceanTheme = {
  primary: "#0277BD",
  background: "#E1F5FE",
  text: "#01579B",
  border: "#B3E5FC",
  white: "#FFFFFF",
  textLight: "#4FC3F7",
  expense: "#EF5350",
  income: "#26A69A",
  card: "#FFFFFF",
  shadow: "#000000",
};

const darkTheme = {
  primary: "#64B5F6", // Bright blue for primary actions
  background: "#121212", // Dark background
  text: "#E0E0E0", // Light gray text for good readability
  border: "#2C2C2C", // Slightly lighter than background for subtle borders
  white: "#FFFFFF", // Pure white for high contrast elements
  textLight: "#9E9E9E", // Medium gray for secondary text
  expense: "#FF5252", // Bright red for expenses
  income: "#69F0AE", // Bright green for income
  card: "#1E1E1E", // Slightly lighter than background for cards
  shadow: "#000000", // Black shadows
};
const teaTheme = {
  primary: "#6B8E23", // Olive Green
  background: "#F0EAD6", // Light Cream
  text: "#3B3C36", // Dark Olive
  border: "#C2B280", // Tan
  white: "#FFFFFF",
  textLight: "#AFAF9D", // Light Olive
  expense: "#D32F2F", // Red
  income: "#388E3C", // Green
  card: "#FFFFFF",
  shadow: "#4B4B4B", // Dark Gray
};


export const THEMES = {
  coffee: coffeeTheme,
  forest: forestTheme,
  purple: purpleTheme,
  ocean: oceanTheme,
  dark: darkTheme,
  tea: teaTheme,
};

// 👇 change this to switch theme
export const COLORS = THEMES.tea;
