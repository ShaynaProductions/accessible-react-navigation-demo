import fs from "fs";
import { Metadata } from "next";
import { StyledHorizontalUncontrolledPage } from "@/folio/Pages/Examples";
import "./page.css";

const jsonObj = fs.readFileSync(
  "src/ui/__static__/multiple-lists-link-ends.json",
  "utf8",
);
const data = {
  navigationArray: JSON.parse(jsonObj),
};

export const metadata: Metadata = {
  title: "Horizontal Styled Navigation Example",
};

export default async function StyledHorizontalUncontrolledExample() {
  if (data.navigationArray) {
    return <StyledHorizontalUncontrolledPage data={data} />;
  }
}
