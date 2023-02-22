import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
export function LoadingApplicationDataPartial({ children, ...props }, loadees) {
    console.log(loadees.length);
    return _jsx(React.Fragment, { children: children });
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
