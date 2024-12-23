import { ThemeContext } from "../Contexts/Theme/ThemeContext";
import { useContext } from "react";

export const useThemeContext = () => {
    return useContext(ThemeContext);
};
