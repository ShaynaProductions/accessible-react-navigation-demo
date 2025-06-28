import { axe, render } from "@/test";
import {Footer} from "./Footer";


const renderFooter = () => {
    return render(<Footer />);
};

describe("<Footer />", () => {
    it("should be WCAG compliant", async () => {
        const { container } = renderFooter();

        const results = await axe(container);

        expect(results).toHaveNoViolations();
    });


});
