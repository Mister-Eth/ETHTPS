import React from 'react'
import { Fragment, useEffect } from 'react'
import { useState } from 'react'
import { Typography } from '@mui/material'
import { useGetLiveDataFromAppStore } from 'ethtps.data'

export function WSTestPage() {
	const liveData = useGetLiveDataFromAppStore()
	const [text, setText] = useState('ready')
	useEffect(() => {
		setText(JSON.stringify(liveData.data))
	}, [liveData])
	return (
		<Fragment>
			<Typography>{text}</Typography>
		</Fragment>
	)
}
