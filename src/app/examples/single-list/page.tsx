import fs from "fs";
import { Metadata } from "next";
import { SingleListPage } from "@/folio/Pages/Examples";
import "./page.css";

const jsonObj = fs.readFileSync("src/ui/__static__/single-list.json", "utf8");
const data = {
  navigationArray: JSON.parse(jsonObj),
};

export const metadata: Metadata = {
  title: "Simple Links Example",
};

export default async function SingleListExample() {
  if (data.navigationArray) {
    return <SingleListPage data={data} />;
  }
}
