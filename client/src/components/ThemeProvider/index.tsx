import React, {
	useState,
	type ReactNode,
} from "react";

type ThemeType = 'dark' | 'light';

type ThemeContextType = {
	theme: ThemeType,
	toggleTheme: () => void,
}

interface IThemeProviderProps {
	children: ReactNode;
}

export const ThemeContext = React.createContext<ThemeContextType>({
	theme: 'dark',
	toggleTheme: () => null,
});

export const ThemeProvider = (props: IThemeProviderProps) => {
	const { children } = props;
	const storedTheme = localStorage.getItem('theme');
	const currentTheme = storedTheme ? storedTheme as ThemeType : 'dark';

	const [theme, setTheme] = useState(currentTheme);

	const toggleTheme = () => {
		setTheme((prevTheme) => {
			const newTheme = prevTheme === 'light' ? 'dark' : 'light';
			localStorage.setItem('theme', newTheme);
			return newTheme;
		});
	};

	return (
		<ThemeContext.Provider
			value={{
				theme, toggleTheme
			}}
		>
			<main className={`${theme} text-foreground bg-background`}>
				{children}
			</main>
		</ThemeContext.Provider>
	)
};