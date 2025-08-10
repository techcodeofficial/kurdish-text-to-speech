import { useEffect } from "react";
import { I18nManager, Text } from "react-native";
import {
    getStatusIntro,
    seted,
    unSeted
} from "./src/reducers/intro/introSlice";
import { getLanguage } from "./src/reducers/lang/languageSlice";
import IntroContainer from "./src/containers/IntroContainer";
import MainContainer from "./src/containers/MainContainer";
import i18n from "i18next";
import { initReactI18next, I18nextProvider } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { languageChanged } from "./src/reducers/lang/languageSlice";
import { useDispatch, useSelector } from "react-redux";
import { GestureHandlerRootView } from "react-native-gesture-handler";
I18nManager.forceRTL(false);
I18nManager.allowRTL(false);
i18n.use(initReactI18next).init({
    resources: {
        ckb: {
            translation: require("./src/locales/ckb/translation.json")
        },
        en: {
            translation: require("./src/locales/en/translation.json")
        }
    },
    lng: "ckb",
    fallbackLng: "ckb",
    interpolation: {
        escapeValue: false
    }
});
const App = () => {
    let dispatch = useDispatch();
    let { direction } = useSelector(getLanguage);
    useEffect(() => {
        const prepare = async () => {
            let lang = await AsyncStorage.getItem("lang");
            if (lang) {
                i18n.changeLanguage(lang);
                let dir = lang === "ckb" ? "rtl" : "ltr";
                console.log(dir)
                dispatch({ lang, direction: dir });
            }
        };
        prepare();
    }, []);
    useEffect(() => {
        const prepare = async () => {
            let logged = await AsyncStorage.getItem("logged");
            if (!!logged) {
                dispatch(unSeted());
            } else {
                dispatch(seted());
            }
        };
        prepare();
    }, []);
    const toggleLanguage = async () => {
        let lang = i18n.language === "ckb" ? "en" : "ckb";
        let dir = direction === "rtl" ? "ltr" : "rtl";
        i18n.changeLanguage(lang);
        dispatch(languageChanged({ direction: dir, lang }));
        await AsyncStorage.setItem("lang", lang);
    };
    let isIntro = useSelector(getStatusIntro);
    return (
        <I18nextProvider i18n={i18n}>
            {isIntro ? (
                <IntroContainer toggleLanguage={toggleLanguage} />
            ) : (
                <GestureHandlerRootView style={{ flex: 1 }}>
                    <MainContainer toggleLanguage={toggleLanguage} />
                </GestureHandlerRootView>
            )}
        </I18nextProvider>
    );
};

export default App;
