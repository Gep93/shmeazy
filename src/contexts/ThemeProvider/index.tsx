import {createContext, useState, useContext} from "react";
import useToggleState from "../../hooks/useToggleState";

const GlobalStyles = {
    dark: {
        background: "black"
    },
    light: {
        background: "white"
    },
    common: {
        fontSize: {
            shmeazyBig: "40px",
            shmeazyMedium: "25px",
            shmeazySmall: "10px",
            shmeazyNormal: "20px"
        },
    color: {
        shmeazyWhite: "#c8c8c8",
        shmeazyRed: "#e8175d",
        shmeazyBlack: "#0B0E11"
    }
    }
}

export const ThemeProviderContext = createContext<any>({});

export const ThemeProvider = ({children}:{children: any}) => {
    //based on user preference.
    const [theme, setTheme] = useState({...GlobalStyles.dark, ...GlobalStyles.common});
    const [isDark, toggleDark] = useToggleState(true);

    const toggleTheme = () => {
        toggleDark();
        const theme = isDark ? GlobalStyles.dark : GlobalStyles.light;
        setTheme({...theme, ...GlobalStyles.common});  
    }  

    return(
        <ThemeProviderContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeProviderContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeProviderContext);
