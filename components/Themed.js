// Learn more about Light and Dark modes:
// https://docs.expo.dev/guides/color-schemes/
import {
  Text as DefaultText,
  useColorScheme,
  View as DefaultView,
} from "react-native";
import * as _ from 'lodash'
import Colors from "../constants/Colors";
export function useTheme() {
  const theme = useColorScheme();
  return Colors[theme]
}
export function useThemeColor(props, propertyPath) {
  const theme = useColorScheme();
  return props?.[theme] ?? _.get(Colors, `${theme}.${propertyPath}`)
}

export function Text(props) {
  const { style, lightColor, darkColor, type = 'primary', ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, `text.${type}`);

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function BgView(props) {
  const { style, lightColor, darkColor, type = 'primary', ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    `background.${type}`
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}
