"use client";
import {JSX} from "react";
import {Text} from "@/source/components";

export const Footer = () : JSX.Element => {
    const today = new Date();

    return (
        <footer>
            <Text>
                <abbr title="copyright">&#169;</abbr> {today.getFullYear()} Shayna Productions
            </Text>
        </footer>
    )
}