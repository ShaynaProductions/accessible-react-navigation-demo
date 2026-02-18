"use client";
import {JSX} from "react";
import {Box, Link} from "@/ui/components";

export const Footer = (): JSX.Element => {
    const today = new Date();

    return (<footer>
            <Box>
                <abbr title="copyright">&#169;</abbr> {today.getFullYear()}{" "}
                <Link
                    href="https://www.shaynaproductions.com/"
                    openInNewTab={true}
                >
                    Shayna Productions
                </Link>
            </Box>
        </footer>);
};
