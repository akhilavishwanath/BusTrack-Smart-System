import { createContext, useState } from "react";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
	const [currentLanguage, setCurrentLanguage] = useState("english");

	return (
		<LanguageContext.Provider
			value={{
				currentLanguage,
				setCurrentLanguage,
			}}
		>
			{children}
		</LanguageContext.Provider>
	);
};
