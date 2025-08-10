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
import drawerItemData from "../configs/drawerItemData";
import DrawerItem from "../components/drawer/DrawerItem";
import { getLanguage } from "../reducers/lang/languageSlice";
import Home from "../screens/home/Home";
const Drawer = createDrawerNavigator();
const MainContainer = ({ toggleLanguage }) => {
    let isDarkTheme = useSelector(themeStatus);
    let insets = useSafeAreaInsets();
    let { direction } = useSelector(getLanguage);
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
                    drawerPosition: direction === "rtl" ? "right" : "left"
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
