import { ReactNode } from "react";
export declare function BinaryConditionalRender(props: {
    condition: boolean;
    childrenGenerator: () => ReactNode;
}): JSX.Element;
