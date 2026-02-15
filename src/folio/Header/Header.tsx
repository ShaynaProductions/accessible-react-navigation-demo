"use client"
import {Box, Heading, Link, Text} from "@/ui/components";

export const Header = () => {
    return (
        <header>
            <Heading headingLevel={1}>Accessible React Navigation</Heading>
            <Text>Demonstrating layering accessibility and functionality while development a main navigation component.</Text>
            <Box cx="breadcrumbs"><Link href="/">Home</Link></Box>
        </header>
    )
}