import { Metadata } from "next";
import SimpleSubNavigationView from "./SimpleSubNavigationView";
import * as fs from "fs";
import { transformNavigation } from "@/source/components";

export const metadata: Metadata = {
  title: "Simple Subnavigation Example",
};

export default async function SimpleSubNavExamplePage() {
  const jsonObj = fs.readFileSync(
    "public/__static__/SimpleStructureWithSubNav.json",
    "utf8",
  );
  const navObj = JSON.parse(jsonObj);

  const navigation = transformNavigation(navObj.navigation);

  return <SimpleSubNavigationView navigation={navigation} />;
}
