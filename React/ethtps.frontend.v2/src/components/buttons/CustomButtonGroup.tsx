import { Button, ButtonGroup } from "@mui/material";
import React from "react";

interface ICustomButtonGroupParameters {
  buttons?: string[];
}

export function CustomButtonGroup(params: ICustomButtonGroupParameters) {
  return (
    <ButtonGroup variant="contained" aria-label="outlined primary button group">
      {params?.buttons?.map((x) => (
        <Button>{x}</Button>
      ))}
    </ButtonGroup>
  );
}
