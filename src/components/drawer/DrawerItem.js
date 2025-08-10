import { useTheme as useNavigationTheme } from "@react-navigation/native";
import styles from "./styles/DrawerItem.style";
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { View, Pressable, Text } from "react-native";
import { getLanguage } from "../../reducers/lang/languageSlice";
import { useSelector } from "react-redux";

const DrawerItem = ({
    index,
    navigation,
    Icon,
    iconName,
    text,
    state,
    routeName
}) => {
    let { direction } = useSelector(getLanguage);
    let { colors: navigationColors } = useNavigationTheme();
    return (
        <View
            style={[
                styles.drawerItemContainer,
                {
                    backgroundColor:
                        state.index === index
                            ? navigationColors.primary
                            : navigationColors.background
                }
            ]}
        >
            <Pressable
                onPress={() => navigation.navigate(routeName)}
                android_ripple={{
                    color: "grey",
                    borderless: false,
                    foreground: true
                }}
                style={[
                    styles.drawerItem,
                    {
                        flexDirection:
                            direction === "ltr" ? "row" : "row-reverse"
                    }
                ]}
            >
                <Text
                    style={{
                        color: navigationColors.text,
                        fontWeight: "bold",
                        fontFamily: "Vazir"
                    }}
                >
                    {text}
                </Text>
                <Icon
                    name={iconName}
                    style={{
                        fontSize: 25,
                        color: navigationColors.text,
                        marginHorizontal: 5,
                        fontWeight: "bold"
                    }}
                />
            </Pressable>
        </View>
    );
};
export default DrawerItem;
