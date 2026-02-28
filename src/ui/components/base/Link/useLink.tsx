"use client";
import { Icon, Text } from "@/ui/components";
import { NewWindowIcon } from "@/ui/svg";
import { UseLinkProps } from "./LinkTypes";
import { sanitizeUrl } from "@/ui/utilities";

export default function useLink() {
  const getIsTargetSpecific: UseLinkProps["GetIsTargetSpecificTypes"] = (
    linkTarget,
  ) => {
    const nonTargeted = ["_parent", "_self", "_top"];
    return nonTargeted.indexOf(linkTarget) === -1;
  };

  const getLinkTarget: UseLinkProps["GetLinkTargetTypes"] = (
    openInNewTab,
    target,
  ) => {
    if (target) {
      return target;
    } else {
      return openInNewTab ? "_blank" : "_self";
    }
  };
  const getNewTab: UseLinkProps["GetNewTabTypes"] = (
    newTabText,
    suppressNewIcon,
  ) => {
    const iconProps = {
      IconComponent: NewWindowIcon,
      label: newTabText,
    };
    if (suppressNewIcon) {
      return (
        <Text isInline={true} isHidden={true}>
          {newTabText}
        </Text>
      );
    } else {
      return <Icon {...iconProps} />;
    }
  };

  const getSafeHref: UseLinkProps["GetSafeHrefTypes"] = (href) => {
    if (!!href && href.length > 0) {
      return sanitizeUrl(href);
    }
    return;
  };

  return {
    getIsTargetSpecific,
    getLinkTarget,
    getNewTab,
    getSafeHref,
  };
}
