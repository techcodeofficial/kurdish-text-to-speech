import { View, Text } from "react-native";
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
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {Lucide} from "@react-native-vector-icons/lucide"
import { useTranslation } from "react-i18next";
const Drawer = createDrawerNavigator();
const MainContainer = ({ toggleLanguage }) => {
    let isDarkTheme = useSelector(themeStatus);
    let insets = useSafeAreaInsets();
    let { direction } = useSelector(getLanguage);
    let {t} = useTranslation()
    let drawerItemData = [{
        routeName: "Home",
        text: t("const.homeDrawerText"),
        Icon: Lucide,
        iconName: "speech"
    },    {
        routeName: "About",
        text:  t("const.aboutDrawerText"),
        Icon: FontAwesome,
        iconName: "info"
    }]
    return (
        <NavigationContainer theme={isDarkTheme ? DarkTheme : DefaultTheme}>
            <Drawer.Navigator
                drawerContent={props => {
                    return (
                        <DrawerContentScrollView {...props}>
                            <View
                                style={{
                                    flexDirection:
                                        direction === "rtl"
                                            ? "row"
                                            : "row-reverse",
                                    alignItems: "center",
                                    justifyContent: "space-between"
                                }}
                            >
                                <DrawerCloseButton
                                    closeDrawer={props.navigation.closeDrawer}
                                />
                                <ToggleLang
                                    onPress={toggleLanguage}
                                    styles={{
                                        top: -10,
                                        ...(direction === "rtl"
                                            ? { right: 0 }
                                            : { left: 0 })
                                    }}
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
                    drawerPosition: direction === "rtl" ? "left" : "right"
                }}
                initialRouteName="Home"
            >
                <Drawer.Screen name="Home" component={Home} />
                <Drawer.Screen
                    name="About"
                    component={() => <Text>hello</Text>}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    );
};
export default MainContainer;
