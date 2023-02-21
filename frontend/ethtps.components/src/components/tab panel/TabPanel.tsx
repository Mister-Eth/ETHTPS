import * as React from 'react'

export interface TabPanelProps {
	children?: React.ReactNode
	index?: number
	value?: number
}

export function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	}
}
