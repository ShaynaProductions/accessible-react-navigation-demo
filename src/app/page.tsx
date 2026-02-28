import { Metadata } from "next";

import { HomePage } from "@/folio/Pages/";
import "./page.css";

export const metadata: Metadata = {
    title: "React Navigation, an Accessible Demonstration",
};

export default function Home() {
    return <HomePage />;
}
