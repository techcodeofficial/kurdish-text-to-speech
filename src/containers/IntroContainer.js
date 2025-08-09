import Introduction from "../screens/intro/Introduction";
import ToggleLang from "../components/intro/ToggleLang";
const IntroContainer = ({ toggleLanguage }) => {
    return (
        <>
        
            <ToggleLang onPress={toggleLanguage} />
            <Introduction />
        </>
    );
};

export default IntroContainer;
