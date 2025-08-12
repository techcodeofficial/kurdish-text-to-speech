import { useSelector } from "react-redux"
import { getLanguage } from "../reducers/lang/languageSlice"
const useStyleDirection = () => {
    let { direction } = useSelector(getLanguage);
    return direction ==="rtl"
};
export default useStyleDirection