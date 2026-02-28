import { type DefinitionTermProps } from "./DefinitionListTypes";

export function DefinitionTerm({ children, cx, ...rest }: DefinitionTermProps) {
  const definitionTermProps = {
    ...rest,
    className: cx,
  };
  return (
    <>
      <dt {...definitionTermProps}>{children}</dt>
    </>
  );
}
