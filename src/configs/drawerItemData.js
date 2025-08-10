import FontAwesome from "react-native-vector-icons/FontAwesome";
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";
let drawerItemData = [
    {
        routeName: "Profile",
        text: "پروفایل",
        Icon: MCIcon,
        iconName: "face-man-profile"
    },
    {
        routeName: "LinkedAccounts",
        text: "حساب های مرتبط روبیکا",
        Icon: FontAwesome,
        iconName: "link"
    },
    {
        routeName: "Tickets",
        text: "تیکت ها",
        Icon: FontAwesome,
        iconName: "support"
    },
    {
        routeName: "Questions",
        text: "سوالات متداول",
        Icon: FontAwesome,
        iconName: "question"
    },
    {
        routeName: "About",
        text: "درباره ما",
        Icon: FontAwesome,
        iconName: "info"
    }
];
export default drawerItemData;
