import React, { Component } from "react";

import { asElement, isHTMLElement } from "../lib/pdfjs-dom";
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
  onSelection: (
    startTarget: HTMLElement,
    boundingRect: LTWH,
    resetSelection: () => void,
    categoryLabels: Array<{ label: string; background: string }>
  ) => void;
  onDragStart: () => void;
  onDragEnd: () => void;
  shouldStart: (event: MouseEvent) => boolean;
  onChange: (isVisible: boolean) => void;
  categoryLabels: Array<{ label: string; background: string }>;
}

class MouseSelection extends Component<Props, State> {
  state: State = {
    locked: false,
    start: null,
    end: null,
  };

  root?: HTMLElement;

  reset = () => {
    const { onDragEnd } = this.props;

    onDragEnd();
    this.setState({ start: null, end: null, locked: false });
  };

  getBoundingRect(start: Coords, end: Coords): LTWH {
    return {
      left: Math.min(end.x, start.x),
      top: Math.min(end.y, start.y),

      width: Math.abs(end.x - start.x),
      height: Math.abs(end.y - start.y),
    };
  }

  // Add a helper function to check if an element is whitespace
  isWhitespaceElement(element: HTMLElement | null): boolean {
    if (!element) {
      // If the element is null or undefined, it's not whitespace
      return false;
    }

    // Define an array of class names that you consider as indicating whitespace
    const whitespaceClassNames = ["whitespace-class-1", "whitespace-class-2"];

    // Check if the element has any of the whitespace class names
    for (const className of whitespaceClassNames) {
      if (element.classList.contains(className)) {
        // The element has a whitespace class name, so it's considered whitespace
        return true;
      }
    }

    // Alternatively, you can check the element's tag name
    // For example, if <br> tags are considered whitespace
    if (element.tagName.toLowerCase() === "br") {
      return true;
    }

    // If none of the above conditions match, it's not whitespace
    return false;
  }

  componentDidUpdate() {
    const { onChange } = this.props;
    const { start, end } = this.state;

    const isVisible = Boolean(start && end);

    onChange(isVisible);
  }

  componentDidMount() {
    if (!this.root) {
      return;
    }

    const that = this;

    const { onSelection, onDragStart, onDragEnd, shouldStart } = this.props;

    const container = asElement(this.root.parentElement);

    if (!isHTMLElement(container)) {
      return;
    }

    let containerBoundingRect: DOMRect | null = null;

    const containerCoords = (pageX: number, pageY: number) => {
      if (!containerBoundingRect) {
        containerBoundingRect = container.getBoundingClientRect();
      }

      return {
        x: pageX - containerBoundingRect.left + container.scrollLeft,
        y: pageY - containerBoundingRect.top + container.scrollTop,
      };
    };

    container.addEventListener("mousemove", (event: MouseEvent) => {
      const { start, locked } = this.state;

      if (!start || locked) {
        return;
      }

      const targetElement = event.target as HTMLElement;

      // Check if the target element is a whitespace element
      if (this.isWhitespaceElement(targetElement)) {
        // Prevent text selection on mousemove for whitespace elements
        event.preventDefault();
        return;
      }

      that.setState({
        ...this.state,
        end: containerCoords(event.pageX, event.pageY),
      });
    });

    container.addEventListener("mousedown", (event: MouseEvent) => {
      if (!shouldStart(event)) {
        this.reset();
        return;
      }

      const startTarget = asElement(event.target);
      if (
        !isHTMLElement(startTarget) ||
        this.isWhitespaceElement(startTarget)
      ) {
        // Prevent text selection on whitespace elements
        event.preventDefault();
        return;
      }

      onDragStart();

      this.setState({
        start: containerCoords(event.pageX, event.pageY),
        end: null,
        locked: false,
      });

      const onMouseUp = (event: MouseEvent): void => {
        // emulate listen once
        event.currentTarget?.removeEventListener(
          "mouseup",
          onMouseUp as EventListener
        );

        const { start } = this.state;

        if (!start) {
          return;
        }

        const end = containerCoords(event.pageX, event.pageY);

        const boundingRect = that.getBoundingRect(start, end);

        if (
          !isHTMLElement(event.target) ||
          !container.contains(asElement(event.target)) ||
          !that.shouldRender(boundingRect)
        ) {
          that.reset();
          return;
        }

        that.setState(
          {
            end,
            locked: true,
          },
          () => {
            const { start, end } = that.state;

            if (!start || !end) {
              return;
            }

            if (isHTMLElement(event.target)) {
              onSelection(
                startTarget,
                boundingRect,
                that.reset,
                this.props.categoryLabels
              );

              onDragEnd();
            }
          }
        );
      };

      const { ownerDocument: doc } = container;
      if (doc.body) {
        doc.body.addEventListener("mouseup", onMouseUp);
      }
    });
  }

  shouldRender(boundingRect: LTWH) {
    return boundingRect.width >= 1 && boundingRect.height >= 1;
  }

  render() {
    const { start, end } = this.state;

    return (
      <div
        className="MouseSelection-container"
        ref={(node) => {
          if (!node) {
            return;
          }
          this.root = node;
        }}
      >
        {start && end ? (
          <div
            className="MouseSelection"
            style={this.getBoundingRect(start, end)}
          />
        ) : null}
      </div>
    );
  }
}

export default MouseSelection;
