import { TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import langGif from "../../assets/intro/language.gif";

const ToggleLang = props => {
    const insets = useSafeAreaInsets();
    return (
        <TouchableOpacity
            {...props}
            style={[
                {
                    position: "absolute",
                    zIndex: 10000,
                    top: insets.top + 15,
                    right: 15,
                    width: 65,
                    height: 65,
                    borderRadius: 100
                },
                props.styles
            ]}
        >
            <Image
                source={langGif}
                contentFit="contain"
                style={[{
                    width: "100%",
                    height: "100%"
                },props.imageStyle]}
            />
        </TouchableOpacity>
    );
};
export default ToggleLang;
