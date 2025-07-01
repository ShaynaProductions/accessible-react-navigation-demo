import { NavigationProps } from "./NavigationTypes";
import NavigationList from "./NavigationList";
import "./navigation.css";

export default function Navigation({
  children,
  cx,
  id,
  label,
}: NavigationProps) {
  return (
    <>
      <nav aria-label={label} className={cx}>
        <NavigationList id={id}>{children}</NavigationList>
      </nav>
    </>
  );
}
