import { useEffect } from "react";
import { I18nManager, Text } from "react-native";
import {
    getStatusIntro,
    seted,
    unSeted
} from "./src/reducers/intro/introSlice";
import IntroContainer from "./src/containers/IntroContainer";
import MainContainer from "./src/containers/MainContainer";
import i18n from "i18next";
import { initReactI18next, I18nextProvider } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { languageChanged } from "./src/reducers/lang/languageSlice";
import { useDispatch, useSelector } from "react-redux";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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
    if (I18nManager.isRTL) {
        I18nManager.forceRTL(false);
    }
    let dispatch = useDispatch();
    useEffect(() => {
        const prepare = async () => {
            let lang = await AsyncStorage.getItem("lang");
            if (lang) {
                i18n.changeLanguage(lang);
                let direction = lang === "ckb" ? "rtl" : "ltr";
                dispatch({ lang, direction });
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
        let direction = i18n.language === "ckb" ? "rtl" : "ltr";
        i18n.changeLanguage(lang);
        dispatch(languageChanged({ direction, lang }));
        await AsyncStorage.setItem("lang", lang);
    };
    let isIntro = useSelector(getStatusIntro);
    return (
        <I18nextProvider i18n={i18n}>
            {isIntro ? (
                <IntroContainer toggleLanguage={toggleLanguage} />
            ) : (
                <GestureHandlerRootView style={{ flex: 1 }}>
                    <MainContainer toggleLanguage={toggleLanguage}/>
                </GestureHandlerRootView>
            )}
        </I18nextProvider>
    );
};

export default App;
