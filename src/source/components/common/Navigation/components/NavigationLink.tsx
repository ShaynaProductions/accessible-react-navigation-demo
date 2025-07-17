import { InternalLink, ListItem } from "@/source/components/base";
import { NavigationItemProps } from "../NavigationTypes";
import { RefObject, use, useEffect, useRef } from "react";
import { NavListContext } from "../providers/NavListProvider/NavListProvider";
import { returnTrueElementOrUndefined } from "@/source/utilities";
import { FocusableElement } from "@/source/components/common/Navigation/providers";
import { usePrevious } from "@/source/hooks";
import { ListActionTypes } from "../utilities";

export default function NavigationLink({
  cx,
  href,
  id,
  label,
  ...rest
}: NavigationItemProps) {
  const navListContextObject = use(NavListContext);

  const { currentListItems, listDispatch, parentRef } =
    returnTrueElementOrUndefined(!!navListContextObject, navListContextObject);

  const itemRef = useRef<FocusableElement>(null);
  const prevItemRef = usePrevious(itemRef);

  useEffect(() => {
    /* istanbul ignore else */
    if (itemRef !== prevItemRef) {
      listDispatch(ListActionTypes.REGISTER, itemRef.current);
    }
  }, [itemRef, listDispatch, prevItemRef]);

  const linkProps = {
    ...rest,
    href,
    ref: itemRef as unknown as RefObject<HTMLAnchorElement>,
  };
  return (
    <>
      <ListItem cx={cx} key={id}>
        <InternalLink {...linkProps}>{label}</InternalLink>
      </ListItem>
    </>
  );
}
