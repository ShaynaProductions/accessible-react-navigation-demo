import { Metadata } from "next";
import LinksButtonsView from "./LinksButtonsView";
import * as fs from "fs";

export const metadata: Metadata = {
  title: "Simple Links Navigaton with out of component buttons",
};

export default async function SimpleLinksExamplePage() {
  const jsonObj = fs.readFileSync(
    "public/__static__/simpleStructure.json",
    "utf8",
  );

  const nav = JSON.parse(jsonObj);
  if (nav) {
    return <LinksButtonsView navigation={nav.navigation} />;
  }
}
