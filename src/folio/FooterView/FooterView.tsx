"use client";
import { JSX } from "react";

export const Footer = (): JSX.Element => {
    const today = new Date();

    return (
        <footer>
            <p>
                <abbr title="copyright">&#169;</abbr> {today.getFullYear()}{" "}
                <a
                    href="https://www.shaynaproductions.com/"
                  target="_blank"
                >
                    Shayna Productions
                </a>
            </p>
        </footer>
    );
};
