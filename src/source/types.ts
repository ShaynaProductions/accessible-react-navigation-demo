export type Orientation = "horizontal" | "vertical";

const emptySymbol = Symbol("EmptyOject type");
export type EmptyObject = { [emptySymbol]?: never };

export interface BaseProps {
  /**
   *  classnames to pass
   */
  cx?: string;
  /**
   * The element's unique identifier. See <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id">MDN</a>
   */
  id?: string;
  /**
   * Id used for testing purposes only.
   */
  testId?: string;
}

export interface SvgProps
  extends Omit<BaseProps, "cx">,
    React.SVGAttributes<SVGElement> {
  /**
   * classes to pass
   */
  cx?: string;
  /**
   * non-visual label describing the image.
   */
  label?: string;
  /**
   * size of Icon if needed.
   */
  size?: number;
}
