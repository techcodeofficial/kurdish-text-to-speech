import { View } from "react-native";
import Equalizer from "../components/utils/Equalizer";
import {
    NavigationContainer,
    DarkTheme,
    DefaultTheme
} from "@react-navigation/native";
import {
    createDrawerNavigator,
    DrawerContentScrollView
} from "@react-navigation/drawer";
import DrawerCloseButton from "../components/drawer/DrawerCloseButton";
import ToggleLang from "../components/intro/ToggleLang";
import DrawerHeader from "../components/drawer/DrawerHeader";
import { useSelector } from "react-redux";
import { themeStatus } from "../reducers/theme/themeSlice";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DrawerItem from "../components/drawer/DrawerItem";
import { getLanguage } from "../reducers/lang/languageSlice";
import Home from "../screens/home/Home";
import About from "../screens/about/About";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Lucide } from "@react-native-vector-icons/lucide";
import { useTranslation } from "react-i18next";
import useStyleDirection from "../hooks/useStyleDirection";
const Drawer = createDrawerNavigator();
const MainContainer = ({ toggleLanguage }) => {
    let isDarkTheme = useSelector(themeStatus);
    let insets = useSafeAreaInsets();
    let { t } = useTranslation();
    let isRTL = useStyleDirection();
    let drawerItemData = [
        {
            routeName: "Home",
            text: t("const.homeDrawerText"),
            Icon: Lucide,
            iconName: "speech"
        },
        {
            routeName: "About",
            text: t("const.aboutDrawerText"),
            Icon: FontAwesome,
            iconName: "info"
        }
    ];
    return (
        <NavigationContainer theme={isDarkTheme ? DarkTheme : DefaultTheme}>
            <Drawer.Navigator
                drawerContent={props => {
                    return (
                        <DrawerContentScrollView {...props}>
                            <View
                                style={{
                                    flexDirection: isRTL
                                        ? "row-reverse"
                                        : "row",
                                    alignItems: "center",
                                    justifyContent: "space-between"
                                }}
                            >
                                <ToggleLang
                                    onPress={toggleLanguage}
                                    styles={{
                                        position: "relative",
                                        top: 0,
                                        left: 0,
                                        right: 0
                                    }}
                                />
                                <DrawerCloseButton
                                    closeDrawer={props.navigation.closeDrawer}
                                />
                            </View>
                            <View
                                style={{
                                    marginTop: 15
                                }}
                            >
                                {drawerItemData.map((item, index) => (
                                    <DrawerItem
                                        key={index}
                                        navigation={props.navigation}
                                        state={props.state}
                                        index={index}
                                        {...item}
                                    />
                                ))}
                            </View>
                        </DrawerContentScrollView>
                    );
                }}
                screenOptions={{
                    header: props => {
                        return (
                            <DrawerHeader
                                {...props}
                                toggleLanguage={toggleLanguage}
                            />
                        );
                    },
                    drawerStyle: {
                        width: 300,
                        marginTop: insets.top,
                        borderStartStartRadius: 0,
                        borderStartEndRadius: 0
                    },
                    drawerType: "back", // front push back slide permanent
                    drawerPosition: isRTL ? "right" : "left"
                }}
                initialRouteName="Home"
            >
                <Drawer.Screen name="Home" component={Home} />
                <Drawer.Screen name="About" component={About} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
};
export default MainContainer;
