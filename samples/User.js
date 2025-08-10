import {
    createDrawerNavigator,
    DrawerContentScrollView
} from "@react-navigation/drawer";
import { View } from "react-native";
import { Image } from "expo-image";
import DrawerHeader from "../../components/drawer/DrawerHeader";
import DrawerCloseButton from "../../components/drawer/DrawerCloseButton";
import ToggleThemeButton from "../../components/ToggleThemeButton";
import Profile from "../user/Profile";
import DrawerItem from "../../components/drawer/DrawerItem";
import { useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import drawerItemData from "../../configs/drawerItemData";
const Drawer = createDrawerNavigator();
const Home = () => {
    let insets = useSafeAreaInsets();
    let { colors } = useTheme();
    let Test2 = () => null;
    let Test3 = () => null;
    let Test4 = () => null;
    let Test5 = () => null;
    return (
        <Drawer.Navigator
            drawerContent={props => {
                return (
                    <DrawerContentScrollView {...props}>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between"
                            }}
                        >
                            <DrawerCloseButton
                                closeDrawer={props.navigation.closeDrawer}
                            />
                            <ToggleThemeButton style={{ top: 0, right: 0 }} />
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
                    return <DrawerHeader {...props} />;
                },
                drawerStyle: {
                    width: 300,
                    borderStartStartRadius: 0,
                    borderStartEndRadius: 0
                },
                drawerType: "back", // front push back slide permanent
                drawerPosition: "right"
            }}
            initialRouteName="Profile"
        >
            <Drawer.Screen name="Profile" component={Profile} />
            <Drawer.Screen name="LinkedAccounts" component={Test2} />
            <Drawer.Screen name="Tickets" component={Test3} />
            <Drawer.Screen name="Questions" component={Test4} />
            <Drawer.Screen name="About" component={Test5} />
        </Drawer.Navigator>
    );
};

export default Home;
