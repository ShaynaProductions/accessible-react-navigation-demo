"use client";
import {JSX} from "react";
import {Heading} from "@/source/components";

export const Header = () : JSX.Element => {

    return (
        <header>
             <Heading headingLevel={1} variant="h2">
                Accessible React Navigation Demonstration
            </Heading>
        </header>
    )
}