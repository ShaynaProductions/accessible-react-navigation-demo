import { Metadata } from "next";

import * as fs from "fs";
import { MobileNavigationPage } from "@/folio/Pages/Examples";

import "./page.css";

export const metadata: Metadata = {
  title: "Mobile Navigation Example (link ends)",
};

export default async function SimpleSubNavExamplePage() {
  const jsonObj = fs.readFileSync(
    "src/ui/__static__/multiple-lists-link-ends.json",
    "utf8",
  );
  const title = "Mobile Navigation (Links) Example";
  const description =
    "An example of a controlled navigation component with top row links and buttons. All keyboard and pointer interactions are complete";
  const nav = JSON.parse(jsonObj);
  if (nav) {
    return (
      <MobileNavigationPage
        navigation={nav}
        title={title}
        description={description}
      />
    );
  }
}
