import { Metadata } from "next";
import SimpleLinksView from "./SimpleLinksView";
import * as fs from "fs";

export const metadata: Metadata = {
  title: "Simple Links Example",
};

export default async function SimpleLinksExamplePage() {
  const jsonObj = fs.readFileSync(
    "public/__static__/simpleStructure.json",
    "utf8",
  );

  const nav = JSON.parse(jsonObj);
  if (nav) {
    return <SimpleLinksView navigation={nav.navigation} />;
  }
}
