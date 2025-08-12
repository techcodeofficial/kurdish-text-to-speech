import { useEffect } from "react";
import { Text } from "react-native";
import {
    getStatusIntro,
    seted,
    unSeted
} from "./src/reducers/intro/introSlice";
import { getLanguage } from "./src/reducers/lang/languageSlice";
import * as Updates from "expo-updates";
import IntroContainer from "./src/containers/IntroContainer";
import MainContainer from "./src/containers/MainContainer";
import i18n from "i18next";
import { initReactI18next, I18nextProvider } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { languageChanged } from "./src/reducers/lang/languageSlice";
import { useDispatch, useSelector } from "react-redux";
import useStyleDirection from "./src/hooks/useStyleDirection";

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
    useEffect(() => {
        const prepare = async () => {
            let lang = await AsyncStorage.getItem("lang");
            if (lang) {
                let dir = lang === "ckb" ? "rtl" : "ltr";
                dispatch(languageChanged({ lang, direction: dir }));
                i18n.changeLanguage(lang);
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
    const toggleLanguage = async language => {
        let lang = i18n.language === "ckb" ? "en" : "ckb";
        let dir = lang === "ckb" ? "rtl" : "ltr";
        i18n.changeLanguage(lang);
        dispatch(languageChanged({ lang, direction: dir }));
        await AsyncStorage.setItem("lang", lang);
    };
    let isIntro = useSelector(getStatusIntro);
    return (
        <I18nextProvider i18n={i18n}>
            {isIntro ? (
                <IntroContainer toggleLanguage={toggleLanguage} />
            ) : (
                <MainContainer toggleLanguage={toggleLanguage} />
            )}
        </I18nextProvider>
    );
};

export default App;
