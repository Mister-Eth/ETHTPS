import { DataType } from 'ethtps.data'

export interface IDataModeButtonGroupConfiguration {
	modeChanged: (mode: DataType) => void
}
