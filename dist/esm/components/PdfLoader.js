var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { Component } from "react";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
class PdfLoader extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            pdfDocument: null,
            error: null,
        };
        this.documentRef = React.createRef();
    }
    componentDidMount() {
        this.load();
    }
    componentWillUnmount() {
        const { pdfDocument: discardedDocument } = this.state;
        if (discardedDocument) {
            discardedDocument.destroy();
        }
    }
    componentDidUpdate({ data, url }) {
        if (this.props.url !== url || this.props.data !== data) {
            this.load();
        }
    }
    componentDidCatch(error, info) {
        const { onError } = this.props;
        if (onError) {
            onError(error);
        }
        this.setState({ pdfDocument: null, error });
    }
    load() {
        const { ownerDocument = document } = this.documentRef.current || {};
        const { workerSrc } = this.props;
        const { pdfDocument: discardedDocument } = this.state;
        this.setState({ pdfDocument: null, error: null });
        if (typeof workerSrc === "string") {
            GlobalWorkerOptions.workerSrc = workerSrc;
        }
        Promise.resolve()
            .then(() => discardedDocument && discardedDocument.destroy())
            .then(() => {
            const _a = this.props, { data, url } = _a, otherProps = __rest(_a, ["data", "url"]);
            if (!url && !data)
                return;
            return getDocument(Object.assign({ url: url !== null && url !== void 0 ? url : undefined, data: data !== null && data !== void 0 ? data : undefined, ownerDocument }, otherProps)).promise.then((pdfDocument) => {
                this.setState({ pdfDocument });
            });
        })
            .catch((e) => this.componentDidCatch(e));
    }
    render() {
        const { children, beforeLoad } = this.props;
        const { pdfDocument, error } = this.state;
        return (React.createElement(React.Fragment, null,
            React.createElement("span", { ref: this.documentRef }),
            error
                ? this.renderError()
                : !pdfDocument || !children
                    ? beforeLoad
                    : children(pdfDocument)));
    }
    renderError() {
        const { errorMessage } = this.props;
        if (errorMessage) {
            return React.cloneElement(errorMessage, { error: this.state.error });
        }
        return null;
    }
}
PdfLoader.defaultProps = {
    workerSrc: "https://unpkg.com/pdfjs-dist@3.5.141/build/pdf.worker.min.js",
};
export { PdfLoader };
export default PdfLoader;
//# sourceMappingURL=PdfLoader.js.map