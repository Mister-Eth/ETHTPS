import { Fragment } from "react"
import { ProviderIntervalDropdown } from "../dropdowns/ProviderIntervalDropdown"
import { IntervalDropdown } from "../dropdowns/IntervalDropdown"

export function MultiProviderVSIXChart() {
  return (
    <Fragment>
      <div className="container">
        <IntervalDropdown />
      </div>
    </Fragment>
  )
}
