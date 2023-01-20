import React, { PropsWithChildren } from "react"
import { useState } from 'react';

export function LoadingApplicationDataPartial({ children, ...props }: PropsWithChildren): JSX.Element {
    const [loaded, setLoaded] = useState(false);

    setTimeout(() => {
        setLoaded(true)
    }, 1000);

    if (loaded)
        return <>
            {children}
        </>
    else return <>
        Loading...
    </>
}