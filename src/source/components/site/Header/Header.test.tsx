import { axe, render } from "@/test";
import {Header} from "./Header";


const renderHeader = () => {
    return render(<Header />);
};

describe("<Header />", () => {
    it("should be WCAG compliant", async () => {
        const { container } = renderHeader();

        const results = await axe(container);

        expect(results).toHaveNoViolations();
    });


});
