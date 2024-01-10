type CSSProperties = { [key: string]: string | number };

export interface StyledComponentProps {
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}

type DynamicStyleFunction<P> = (props: P) => CSSProperties;

export const styled = <T extends keyof HTMLElementTagNameMap>(
  tag: T
) => (styles: CSSProperties | DynamicStyleFunction<any>) => {
  return function StyledComponent<P>(props: StyledComponentProps & P & { children?: (HTMLElement | string)[] }, children?: (HTMLElement | string)[]) {
    const { className, style, onClick, ...rest } = props;
    const element = document.createElement(tag);

    let resolvedStyles: CSSProperties;
    if (typeof styles === 'function') {
      resolvedStyles = styles(props);
    } else {
      resolvedStyles = styles;
    }

    Object.assign(element.style, resolvedStyles);
    if (style) Object.assign(element.style, style);

    if (className) element.className = className;

    Object.assign(element, rest);

    if (children) {
      children.forEach(child => {
        if (typeof child === 'string') {
          element.appendChild(document.createTextNode(child));
        } else {
          element.appendChild(child);
        }
      });
    }

    if (onClick) {
      element.addEventListener('click', onClick);
    }

    return element;
  };
};
