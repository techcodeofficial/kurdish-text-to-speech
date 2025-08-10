import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
    NavigationContainer,
    DarkTheme,
    DefaultTheme
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
    Provider as PaperProvider,
    MD3LightTheme,
    MD3DarkTheme,
    useTheme
} from "react-native-paper";
import {
    Text,
    View,
    Button,
    useColorScheme,
    Dimensions,
    Pressable
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMaterial3Theme } from "@pchmn/expo-material3-theme";
import {
    login,
    logOut,
    setUser,
    setThumbnail
} from "./reducers/authentication/authenticationSlice";
import { addManySession } from "./reducers/sessions/sessionsSlice";
import { setCoins } from "./reducers/coin/coinSlice";
import { toggleTheme, setTheme } from "./reducers/theme/themeSlice";
import { Fast, Support } from "./screens/introduction";
import { Image } from "expo-image";
import {
    Login,
    Register,
    ForgetPassword,
    VerifyOtp,
    ChangePassword,
    VerifyAccount
} from "./screens/authentication";
import * as Linking from "expo-linking";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import Toast from "react-native-toast-message";
import customToastConfig from "./configs/toastConfig";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";
import Api from "./services/Api";
import User from "./screens/user/User";
const linking = {
    prefixes: [Linking.createURL("/")],
    config: {
        screens: {
            User: "home",
            VerifyAccount: "verifyaccount/:token"
        }
    }
};
console.log(linking);
console.log(Linking.createURL("/"));
const Tasks = () => {
    const dispatch = useDispatch();
    return (
        <View
            style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1
            }}
        >
            <Text>Welcome to React Native!</Text>
            <Text>TASKS PAGE</Text>
            <Button
                title="click me"
                onPress={() => {
                    dispatch(toggleTheme());
                }}
            />
        </View>
    );
};
const Shop = () => {
    const dispatch = useDispatch();
    return (
        <View
            style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1
            }}
        >
            <Text>Welcome to React Native!</Text>
            <Text>Shop PAGE</Text>
            <Button
                title="click me"
                onPress={() => {
                    dispatch(toggleTheme());
                }}
            />
        </View>
    );
};

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Main = () => {
    const dispatch = useDispatch();
    const scheme = useColorScheme();
    const [imageUri, setImageUri] = useState(null);
    const [hasSessions, setHasSessions] = useState(false);
    const isDarkTheme = useSelector(state => state.theme.isDarkTheme);
    const { isLogin, profile, user, token } = useSelector(
        state => state.authentication
    );
    useEffect(() => {
        const getStorageData = async () => {
            try {
                let loginData = await AsyncStorage.getItem("login");
                loginData = loginData || "{}";
                loginData = JSON.parse(loginData);
                if (loginData.user && loginData.token) {
                    dispatch(
                        login({ user: loginData.user, token: loginData.token })
                    );
                } else {
                    dispatch(logOut());
                }
            } catch (err) {
                Toast.show({
                    type: "warning",
                    text1: "خطا",
                    text2: "لطفا داده های برنامه را پاک کنید و مجدداً اقدام کنید"
                });
            }
        };
        getStorageData();
    }, []);
    useEffect(() => {
        dispatch(setTheme({ scheme }));
    }, [scheme]);
    useEffect(() => {
        if (isLogin) {
            const initialApp = async () => {
                try {
                    let api = new Api(token);
                    let { data: my } = await api.getMy();
                    let user = my.user;
                    dispatch(setUser({ user }));
                    let login = await AsyncStorage.getItem("login");
                    login = login || "{}";
                    login = JSON.parse(login);
                    login.user = user;
                    await AsyncStorage.setItem("login", JSON.stringify(login));
                    if (user.profile) {
                        const cachePath = `${FileSystem.cacheDirectory}${user.profile}`;
                        const fileInfo =
                            await FileSystem.getInfoAsync(cachePath);
                        if (fileInfo.exists) {
                            setImageUri(fileInfo.uri);
                            dispatch(setThumbnail(fileInfo.uri));
                        } else {
                            const downloaded = await FileSystem.downloadAsync(
                                `http://localhost:3000/profile/${user.profile}`,
                                cachePath
                            );
                            dispatch(setThumbnail(downloaded.uri));
                            setImageUri(downloaded.uri);
                        }
                    }
                    let { data: sessionData } = await api.getSessions();
                    let sessions = sessionData.sessions;
                    if (sessions.length > 0) {
                        setHasSessions(true);
                        dispatch(addManySession(sessions));
                    }
                    let { data: coinData } = await api.getCoinCount();
                    dispatch(setCoins(coinData.coin));
                } catch (err) {
                    if (user.profile) {
                        const cachePath = `${FileSystem.cacheDirectory}${user.profile}`;
                        const fileInfo =
                            await FileSystem.getInfoAsync(cachePath);
                        if (fileInfo.exists) {
                            setImageUri(fileInfo.uri);
                            dispatch(setThumbnail(fileInfo.uri));
                        } else {
                            const downloaded = await FileSystem.downloadAsync(
                                `http://localhost:3000/profile/${user.profile}`,
                                cachePath
                            );
                            dispatch(setThumbnail(downloaded.uri));
                            setImageUri(downloaded.uri);
                        }
                    }
                    if (err.response) {
                        if (err.response.status == 401) {
                            Toast.show({
                                type: "warning",
                                text1: "هشدار",
                                text2: "لطفا مجدداً وارد شوید"
                            });
                            dispatch(logOut());
                            await AsyncStorage.clear();
                        } else {
                            Toast.show({
                                type: "warning",
                                text1: "هشدار",
                                text2: err.response?.data?.error_message
                            });
                        }
                    } else {
                        Toast.show({
                            type: "error",
                            text1: "خطا",
                            text2: "اتصال اینترنت خود را برسی کنید"
                        });
                    }
                }
            };
            initialApp();
        }
    }, [isLogin]);
    let { theme: MD3Theme } = useMaterial3Theme();
    const theme = isDarkTheme
        ? { ...MD3DarkTheme, colors: MD3Theme.dark }
        : { ...MD3LightTheme, colors: MD3Theme.light };
    let { width } = Dimensions.get("screen");
    return (
        <SafeAreaProvider>
            <PaperProvider theme={theme}>
                <NavigationContainer
                    linking={linking}
                    theme={isDarkTheme ? DarkTheme : DefaultTheme}
                >
                    {isLogin ? (
                        <Tab.Navigator
                            initialRouteName="User"
                            screenOptions={({ route }) => ({
                                tabBarIcon: ({ focused, color, size }) => {
                                    let iconName;
                                    if (route.name === "User") {
                                        return imageUri ? (
                                            <Image
                                                source={{
                                                    uri: profile || imageUri
                                                }}
                                                transition={1000}
                                                style={{
                                                    width: size,
                                                    height: size,
                                                    borderRadius: 100
                                                }}
                                                contentFit="contain"
                                            />
                                        ) : (
                                            <FontAwesome
                                                name="user"
                                                size={size}
                                                color={color}
                                            />
                                        );
                                    } else if (route.name === "Tasks") {
                                        iconName = "tasks";
                                        return (
                                            <FontAwesome5Icon
                                                name={iconName}
                                                size={size}
                                                color={color}
                                            />
                                        );
                                    } else if (route.name === "Shop") {
                                        iconName = "shopping-cart";
                                        return (
                                            <FontAwesome5Icon
                                                name={iconName}
                                                size={size}
                                                color={color}
                                            />
                                        );
                                    }
                                    return (
                                        <Ionicons
                                            name={iconName}
                                            size={size}
                                            color={color}
                                        />
                                    );
                                },
                                tabBarActiveTintColor: isDarkTheme
                                    ? "whitesmoke"
                                    : "black",
                                tabBarInactiveTintColor: "gray",
                                headerShown: false,
                                tabBarPosition:
                                    width > 550 ? "right" : "bottom",
                                animation: "none",
                                tabBarLabel: ({ color, focused }) => {
                                    let children;
                                    if (route.name === "User") {
                                        children = "پروفایل";
                                    } else if (route.name === "Tasks") {
                                        children = "کار ها";
                                    } else if (route.name === "Shop") {
                                        children = "فروشگاه";
                                    }
                                    return (
                                        <Text
                                            style={{
                                                color,
                                                fontWeight: 700,
                                                fontSize: 10
                                            }}
                                        >
                                            {children}
                                        </Text>
                                    );
                                }
                            })}
                        >
                            <Tab.Screen name="Shop" component={Shop} />
                            <Tab.Screen name="Tasks" component={Tasks} />
                            <Tab.Screen name="User" component={User} />
                        </Tab.Navigator>
                    ) : (
                        <Stack.Navigator
                            initialRouteName="Fast"
                            screenOptions={{
                                headerShown: false,
                                animationEnabled: false
                            }}
                        >
                            <Stack.Screen name="Fast" component={Fast} />
                            <Stack.Screen name="Support" component={Support} />
                            <Stack.Screen name="Login" component={Login} />
                            <Stack.Screen
                                name="Register"
                                component={Register}
                            />
                            <Stack.Screen
                                name="VerifyAccount"
                                component={VerifyAccount}
                            />
                            <Stack.Screen
                                name="ForgetPassword"
                                component={ForgetPassword}
                            />
                            <Stack.Screen
                                name="VerifyOtp"
                                component={VerifyOtp}
                            />
                            <Stack.Screen
                                name="ChangePassword"
                                component={ChangePassword}
                            />
                        </Stack.Navigator>
                    )}
                </NavigationContainer>
                <Toast config={customToastConfig(isDarkTheme)} />
            </PaperProvider>
        </SafeAreaProvider>
    );
};

export default Main;
