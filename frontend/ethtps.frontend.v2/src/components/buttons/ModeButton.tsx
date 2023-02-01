import { CustomButtonGroup } from "./CustomButtonGroup"

export function ModeButton(): JSX.Element {
  return <CustomButtonGroup {...{ buttons: ["TPS", "GPS", "GTPS"] }} />
}
