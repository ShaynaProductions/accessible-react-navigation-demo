import fs from "fs";
import { Metadata } from "next";
import { MultipleListButtonsPage } from "@/folio/Pages/Examples";
import "./page.css";

const jsonObj = fs.readFileSync(
  "src/ui/__static__/multiple-lists-buttons.json",
  "utf8",
);
const data = {
  navigationArray: JSON.parse(jsonObj),
};

export const metadata: Metadata = {
  title: "Multiple Lists with Button Ends Example",
};

export default async function MultipleListButtonsExample() {
  if (data.navigationArray) {
    return <MultipleListButtonsPage data={data} />;
  }
}
