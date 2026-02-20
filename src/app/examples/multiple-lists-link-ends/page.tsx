import fs from "fs";
import { Metadata } from "next";
import { MultipleListLinkEndsPage } from "@/folio/Pages/Examples";
import "./page.css";

const jsonObj = fs.readFileSync(
  "src/ui/__static__/multiple-lists-link-ends.json",
  "utf8",
);
const data = {
  navigationArray: JSON.parse(jsonObj),
};

export const metadata: Metadata = {
  title: "Multiple Lists with Link Ends Example",
};

export default async function MultipleListLinkEndsExample() {
  if (data.navigationArray) {
    return <MultipleListLinkEndsPage data={data} />;
  }
}
