import { type DefinitionDetailProps } from "./DefinitionListTypes";

export function DefinitionDetail({
  children,
  cx,
  ...rest
}: DefinitionDetailProps) {
  const definitionDetailProps = {
    ...rest,
    className: cx,
  };
  return (
    <>
      <dd {...definitionDetailProps}>{children}</dd>
    </>
  );
}
