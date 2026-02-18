import { type DefinitionListProps } from "./DefinitionListTypes";

export function DefinitionList({ children, cx, ...rest }: DefinitionListProps) {
  const definitionListProps = {
    ...rest,
    className: cx,
  };
  return (
    <>
      <dl {...definitionListProps}>{children}</dl>
    </>
  );
}
