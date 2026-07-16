import ReactDOM from "react-dom";

if (typeof window !== "undefined" && !ReactDOM.findDOMNode) {
  ReactDOM.findDOMNode = (componentOrElement) => {
    if (!componentOrElement) return null;
    if (componentOrElement instanceof HTMLElement) return componentOrElement;
    if (componentOrElement.updater) {
      // Fallback strategy for older React class instances
      return componentOrElement.base || null;
    }
    return null;
  };
}
