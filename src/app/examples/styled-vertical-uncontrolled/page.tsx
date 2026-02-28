import fs from "fs";
import { Metadata } from "next";
import { StyledVerticalUncontrolledPage } from "@/folio/Pages/Examples";
import "./page.css";

const jsonObj = fs.readFileSync(
  "src/ui/__static__/multiple-lists-buttons.json",
  "utf8",
);
const data = {
  navigationArray: JSON.parse(jsonObj),
};

export const metadata: Metadata = {
  title: "Vertical Styled Navigation Example",
};

export default async function StyledHorizontalUncontrolledExample() {
  if (data.navigationArray) {
    return <StyledVerticalUncontrolledPage data={data} />;
  }
}
