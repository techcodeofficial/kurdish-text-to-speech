import { useEffect } from "react";
import { useMaterial3Theme } from "@pchmn/expo-material3-theme";
import { useColorScheme } from "react-native";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { themeStatus, setTheme } from "./src/reducers/theme/themeSlice";
import Toast from "react-native-toast-message"
import CustomToast from "./src/components/utils/Toast"
import App from "./App";
const Main = () => {
    let dispatch = useDispatch();
    const scheme = useColorScheme();
    const { theme } = useMaterial3Theme();
    const isDarkTheme = useSelector(themeStatus);
    useEffect(() => {
        dispatch(setTheme({ scheme }));
    }, [scheme]);
    const paperTheme = isDarkTheme
        ? {
              ...MD3DarkTheme,

              colors: theme.dark
          }
        : {
              ...MD3LightTheme,

              colors: theme.light
          };
    return (
        <PaperProvider theme={paperTheme}>
            <App />
            <Toast
                config={{
                    custom_toast: ({ text1, text2, props }) => (
                        <CustomToast
                            text1={text1}
                            text2={text2}
                            isRTL={props.isRTL}
                        />
                    )
                }}
            />
        </PaperProvider>
    );
};

export default Main;
