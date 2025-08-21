import { Metadata } from "next";
import ComplexSubNavigationView from "./ComplexSubNavigationView";
import * as fs from "fs";

export const metadata: Metadata = {
  title: "Complex Subnavigation Example",
};

export default async function ComplexSubMenuExamplePage() {
  const jsonObj = fs.readFileSync(
    "public/__static__/complexStructureWithSubNav.json",
    "utf8",
  );

  const nav = JSON.parse(jsonObj);

  if (nav) {
    return <ComplexSubNavigationView navigation={nav} />;
  }
}
