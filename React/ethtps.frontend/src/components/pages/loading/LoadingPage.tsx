import { Box, LinearProgress } from "@mui/material"
import React from "react"

export default function LoadingPage(): JSX.Element {
    return <>
        <Box sx={{ width: '20%' }}>
            <LinearProgress />
        </Box>
    </>
}