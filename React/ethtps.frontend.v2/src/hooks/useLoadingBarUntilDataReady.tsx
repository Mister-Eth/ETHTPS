import { useState, useEffect } from "react";
import React from 'react'

export function useLoadingBarUntilDataReady(message: string, element: JSX.Element | undefined | null, data: any | undefined | null) {
    const [text, setText] = useState(message)
    const [showElement, setShowElement] = useState(false)
    useEffect(() => {
        setShowElement(data !== null || data !== undefined)
    }, [element])
    return <>
        {showElement ? element : text}
    </>
}