import { Theme } from '@mui/material'
import { IThemeProvider } from './IThemeProvider'
import { lightTheme } from '../../themes/LightTheme'
import { darkTheme } from '../../themes/DarkTheme'

export class StorageThemeProvider implements IThemeProvider {
	private _currentTheme = lightTheme

	public getCurrentTheme(): Theme {
		return this._currentTheme
	}
	setLightMode() {
		this._currentTheme = lightTheme
	}
	setDarkMode() {
		this._currentTheme = darkTheme
	}
}
