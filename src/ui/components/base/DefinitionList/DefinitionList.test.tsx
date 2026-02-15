import { act } from "react";
import { axe, render } from "@/test";
import {
  DefinitionDetail,
  DefinitionList,
  DefinitionTerm,
} from "@/ui/components";

const renderDefinitionList = () => {
  return render(
    <DefinitionList>
      <DefinitionTerm>farrago</DefinitionTerm>
      <DefinitionDetail>a confused mixture; hodgepodge</DefinitionDetail>
      <DefinitionTerm>louche</DefinitionTerm>
      <DefinitionDetail>not reputable or decent</DefinitionDetail>
      <DefinitionTerm>parse</DefinitionTerm>
      <DefinitionDetail>
        to examine in a minute way; analyze critically
      </DefinitionDetail>
      <DefinitionTerm>argot</DefinitionTerm>
      <DefinitionDetail>
        the language used by a particular group of people; an often more or less
        secret vocabulary and idiom peculiar to a particular group.
      </DefinitionDetail>
    </DefinitionList>,
  );
};

describe("DefinitionList", () => {
  it("should be WCAG compliant", async () => {
    const { container } = await act(() => renderDefinitionList());

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
