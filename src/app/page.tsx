import { Metadata } from "next";

import Home from "@/app/Home";

import "./page.css";

export const metadata: Metadata = {
  title: "Home",
};

export default function HomePage() {
  return <Home />;
}
