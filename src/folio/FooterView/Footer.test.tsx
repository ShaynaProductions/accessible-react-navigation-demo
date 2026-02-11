import React, { act } from "react";
import { axe, render } from "@/test";
import {Footer} from "./FooterView";


const renderFooterComponent = () => {
    return render(<Footer />);
}

describe("<Footer />", () => {
    
    it("passes auto-wcag", async () => {
        const {container} = renderFooterComponent();
        const results = await act(() => axe(container));
        expect(results).toHaveNoViolations();
    });
    });