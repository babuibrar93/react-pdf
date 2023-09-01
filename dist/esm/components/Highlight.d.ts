import { Component } from "react";
import "../style/Highlight.css";
import type { LTWHP } from "../types.js";
interface Props {
    categoryLabels: Array<{
        label: string;
        background: string;
    }>;
    position: {
        boundingRect: LTWHP;
        rects: Array<LTWHP>;
    };
    onClick?: () => void;
    onMouseOver?: () => void;
    onMouseOut?: () => void;
    comment: {
        category: string;
        text: string;
    };
    isScrolledTo: boolean;
}
export declare class Highlight extends Component<Props> {
    render(): JSX.Element;
}
export default Highlight;
