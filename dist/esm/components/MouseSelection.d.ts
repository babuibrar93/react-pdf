import { Component } from "react";
import "../style/MouseSelection.css";
import type { LTWH } from "../types.js";
interface Coords {
    x: number;
    y: number;
}
interface State {
    locked: boolean;
    start: Coords | null;
    end: Coords | null;
}
interface Props {
    onSelection: (startTarget: HTMLElement, boundingRect: LTWH, resetSelection: () => void, categoryLabels: Array<{
        label: string;
        background: string;
    }>) => void;
    onDragStart: () => void;
    onDragEnd: () => void;
    shouldStart: (event: MouseEvent) => boolean;
    onChange: (isVisible: boolean) => void;
    categoryLabels: Array<{
        label: string;
        background: string;
    }>;
}
declare class MouseSelection extends Component<Props, State> {
    state: State;
    root?: HTMLElement;
    reset: () => void;
    getBoundingRect(start: Coords, end: Coords): LTWH;
    isWhitespaceElement(element: HTMLElement | null): boolean;
    componentDidUpdate(): void;
    componentDidMount(): void;
    shouldRender(boundingRect: LTWH): boolean;
    render(): JSX.Element;
}
export default MouseSelection;
