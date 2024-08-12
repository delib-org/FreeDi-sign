import React, {
	createContext,
	useContext,
	useState,
	useCallback,
	useEffect,
} from "react";

// Define types
type LanguageContextType = {
    currentLanguage: string;
    changeLanguage: (newLanguage: LanguagesEnum) => void;
    t: (text: string) => string;
    dir: "ltr" | "rtl";
};

// Create a context to hold the current language and the language change function
const LanguageContext = createContext<LanguageContextType | undefined>(
	undefined,
);

// Custom hook to provide access to the language context
export function useLanguage() {
	const context = useContext(LanguageContext);
	if (!context) {
		throw new Error("useLanguage must be used within a LanguageProvider");
	}

	return context;
}

interface LanguageProviderProps {
    defaultLanguage: LanguagesEnum;
    children: React.ReactNode;
}

export enum LanguagesEnum {
    en = "en",
    he = "he",
}

import en from "../../assets/languages/en.json";
import he from "../../assets/languages/he.json";
//@ts-ignore
const languages: Record<string, string>[] = [en, he];




// LanguageProvider component to wrap your application and provide the language context
export const LanguageProvider: React.FC<LanguageProviderProps> = ({
	defaultLanguage,
	children,
}) => {
	const [currentLanguage, setCurrentLanguage] = useState(defaultLanguage);

	const [languageData, setLanguageData] = useState<Record<string, string>>(
		{},
	);

	// Function to change the language
	const changeLanguage = useCallback((newLanguage: LanguagesEnum) => {
		setCurrentLanguage(newLanguage);
	}, []);

	// Fetch language data when the language changes or on component mount
	useEffect(() => {
		async function fetchLanguageData() {
			try {
				const languageIndex =
                    Object.values(LanguagesEnum).indexOf(currentLanguage);
				if (languageIndex !== -1) {
					setLanguageData(languages[languageIndex]);
				} else {
					console.error(
						`Language data not found for ${currentLanguage}`,
					);
				}
			} catch (error) {
				console.error(`Error fetching language data: ${error}`);
			}
		}

		fetchLanguageData();
	}, [currentLanguage]);

	const t = (text: string) => {
		return languageData[text] || text;
	};

	// Value passed to the context provider
	const contextValue: LanguageContextType = {
		currentLanguage,
		changeLanguage,
		t,
		dir:
             currentLanguage === LanguagesEnum.he
            	? "rtl"
            	: "ltr",
	};

	return (
		<LanguageContext.Provider value={contextValue}>
			{children}
		</LanguageContext.Provider>
	);
};
