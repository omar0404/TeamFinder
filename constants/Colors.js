const tintColorLight = "#2f95dc";
const tintColorDark = "#fff";
export const darkColor = "#181541";
export const lighterDarkerColor = "#332f6f";
export const lightDarkColor = "#242150";
export const skyColor = "#726eb7"
export const lightColor = "#bf206e";
const defaultTheme = {
  text: {
    primary: 'white',
    secondary: lightColor,
    tertiary: skyColor,
  },
  background: {
    primary: darkColor,
    secondary: lightDarkColor,
    tertiary: lighterDarkerColor,
    fourth: skyColor,
    fifth: lightColor
  },
  border: {
    primary: lightDarkColor,
    secondary: lightDarkColor,
  },
  icon: {
    primary: lightColor,
    secondary: lightDarkColor,
  },
  button: {
    primary: lightColor,
    secondary: lightDarkColor,
  },
  tint: tintColorLight,
  tabIconDefault: "#ccc",
  tabIconSelected: tintColorLight,
}
export default {
  light: {
    ...defaultTheme
  },
  dark: {
    ...defaultTheme
  },
};
