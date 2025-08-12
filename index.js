import { registerRootComponent } from "expo";
import { useEffect } from "react";
import { store } from "./src/store/store";
import { Provider } from "react-redux";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import Main from "./Main";
import { I18nManager } from "react-native";

I18nManager.allowRTL(false);
I18nManager.forceRTL(false);
SplashScreen.preventAutoHideAsync();
const fetchFonts = () => {
    return Font.loadAsync({
        VazirRegular: require("./src/assets/fonts/Vazirmatn-Regular.ttf"),
        VazirMedium: require("./src/assets/fonts/Vazirmatn-Light.ttf"),
        VazirLight: require("./src/assets/fonts/Vazirmatn-Light.ttf"),
        VazirThin: require("./src/assets/fonts/Vazirmatn-Thin.ttf"),
        VazirBold: require("./src/assets/fonts/Vazirmatn-Bold.ttf"),
        NizarNQ: require("./src/assets/fonts/Nizar.ttf")
    });
};
const Root = () => {
    useEffect(() => {
        const prepare = async () => {
            try {
                await fetchFonts();
            } catch (e) {
                console.warn(e);
            } finally {
                await SplashScreen.hideAsync();
            }
        };
        prepare();
    }, []);
    return (
        <Provider store={store}>
            <Main />
        </Provider>
    );
};

registerRootComponent(Root);
