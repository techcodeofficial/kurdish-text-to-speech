import { useEffect } from "react";
import { useMaterial3Theme } from "@pchmn/expo-material3-theme";
import { useColorScheme } from "react-native";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { themeStatus, setTheme } from "./src/reducers/theme/themeSlice";
import App from "./App";
const Main = () => {
    let dispatch = useDispatch();
    let fonts = {
        regular: { fontFamily: "VazirRegular" },
        medium: { fontFamily: "VazirMedium" },
        light: { fontFamily: "VazirLight" },
        thin: { fontFamily: "VazirThin" },
        bold: { fontFamily: "VazirBold" }
    };
    const scheme = useColorScheme();
    const { theme } = useMaterial3Theme();
    const isDarkTheme = useSelector(themeStatus);
    useEffect(() => {
        dispatch(setTheme({ scheme }));
    }, [scheme]);
    const paperTheme = isDarkTheme
        ? {
              ...MD3DarkTheme,
              fonts,
              colors: theme.dark
          }
        : {
              ...MD3LightTheme,
              fonts,
              colors: theme.light
          };
    return (
        <PaperProvider theme={paperTheme}>
            <App />
        </PaperProvider>
    );
};

export default Main;
