"use client"

import Link from "next/link";

export const Header = () => {
    return (
        <header>
            <h1>Accessible React Navigation</h1>
            <p>Demonstrating layering accessibility and functionality for a main navigation component.</p>
            <p><Link href="/">Home</Link></p>
        </header>
    )
}