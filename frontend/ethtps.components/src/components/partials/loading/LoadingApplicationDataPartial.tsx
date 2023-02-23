import React from 'react'
import { PropsWithChildren } from 'react'

type Loadee = {
	loaded: boolean
}
export function LoadingApplicationDataPartial<T>(
	{ children, ...props }: PropsWithChildren<T>,
	loadees: Loadee[]
): JSX.Element {
	console.log(loadees.length)
	return <React.Fragment>{children}</React.Fragment>
	/*
  if (loadees.every((x) => x)) return <>{children}</>
  else
    return (
      <>
        <div className="center">
          <Stack spacing={2} direction="row">
            <LinearProgress variant="indeterminate" style={{ width: "100%" }} />
          </Stack>
          <Typography>Loading...</Typography>
        </div>
      </>
    )*/
}
