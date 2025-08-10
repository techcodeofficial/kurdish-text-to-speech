import React from "react";
import { View, Pressable, Text } from "react-native";
import { useSelector } from "react-redux";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import ToggleLang from "../intro/ToggleLang";
import { useTheme } from "@react-navigation/native";
import styles from "./styles/DrawerHeader.style";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getLanguage } from "../../reducers/lang/languageSlice";
const DrawerHeader = props => {
    let { colors } = useTheme();
    let { top } = useSafeAreaInsets();
    let { direction } = useSelector(getLanguage);
    return (
        <View
            style={{
                ...styles.container,
                backgroundColor: colors.card,
                paddingTop: top + 5,
                flexDirection: direction === "rtl" ? "row" : "row-reverse"
            }}
        >
            <View style={[styles.toggle]}>
                <Pressable onPress={props.navigation.openDrawer}>
                    <FontAwesome
                        name="bars"
                        style={{
                            fontSize: 30,
                            color: colors.text
                        }}
                    />
                </Pressable>
            </View>
            <View style={[styles.toggle]}>
                <ToggleLang
                    onPress={props.toggleLanguage}
                    styles={{
                        top: -30,
                        ...(direction === "rtl" ? { right: 0 } : { left: 0 })
                    }}
                />
            </View>
        </View>
    );
};
export default DrawerHeader;
