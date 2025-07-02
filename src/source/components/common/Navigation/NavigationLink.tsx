import { InternalLink, ListItem } from "@/source/components/base";
import { NavigationItemProps } from "./NavigationTypes";

export default function NavigationLink({
  cx,
  href,
  id,
  label,
  ...rest
}: NavigationItemProps) {
  const linkProps = {
    ...rest,
    href,
  };
  return (
    <>
      <ListItem cx={cx} key={id}>
        <InternalLink {...linkProps}>{label}</InternalLink>
      </ListItem>
    </>
  );
}
