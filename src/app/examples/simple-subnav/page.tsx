import { Metadata } from "next";
import SimpleSubNavigationView from "./SimpleSubNavigationView";
import * as fs from "fs";

export const metadata: Metadata = {
  title: "Simple Subnavigation Example",
};

export default async function SimpleSubNavExamplePage() {
  const jsonObj = fs.readFileSync(
    "public/__static__/SimpleStructureWithSubNav.json",
    "utf8",
  );

  const nav = JSON.parse(jsonObj);
  if (nav) {
    return <SimpleSubNavigationView navigation={nav.navigation} />;
  }
}
