import { Metadata } from "next";
import { BaseComponentsPage } from "@/folio/Pages";

import "./page.css";

export const metadata: Metadata = {
  title: "Base Components",
};

export default function BaseComponents() {
  return <BaseComponentsPage />;
}
