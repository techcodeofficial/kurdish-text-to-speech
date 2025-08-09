import { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import { getStatusIntro } from "../reducers/intro/introSlice";
import IntroContainer from "../containers/IntroContainer";
import MainContainer from "../containers/MainContainer";

const Stack = createNativeStackNavigator();
export default Routes = () => {
    let isIntro = useSelector(getStatusIntro);

    return isIntro ? (
      <IntroContainer/>
    ) : (
        <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name="Main" component={MainContainer} />
        </Stack.Navigator>
    );
};
