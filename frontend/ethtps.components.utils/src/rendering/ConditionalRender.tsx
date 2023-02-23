import React, { ReactNode } from "react";
import { Fragment } from "react";

export function BinaryConditionalRender(props: {
  condition: boolean;
  childrenGenerator: () => ReactNode;
}) {
  return (
    <Fragment>{props.condition ? props.childrenGenerator() : null}</Fragment>
  );
}
