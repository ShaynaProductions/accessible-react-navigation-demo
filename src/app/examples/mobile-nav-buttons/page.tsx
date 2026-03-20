import { Metadata } from "next";

import * as fs from "fs";
import { MobileNavigationPage } from "@/folio/Pages/Examples";

import "./page.css";

export const metadata: Metadata = {
  title: "Mobile Navigation Example",
};

export default async function SimpleSubNavExamplePage() {
  const jsonObj = fs.readFileSync(
    "src/ui/__static__/multiple-lists-buttons.json",
    "utf8",
  );

  const title = "Mobile Navigation (Buttons) Example";
  const description =
    "A fully functioning Mobile Navigation Component with Button ends. All keyboard and pointer interactions are complete.";
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
