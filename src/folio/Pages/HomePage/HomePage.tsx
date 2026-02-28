"use client";
import { Box, Heading, Link, Text } from "@/ui/components";
import { Examples, LatestRelease, PreviousReleases } from "./sections";

export function HomePage() {
  return (
    <Box id="home-page">
      <Box cx="intro">
        <Text>
          This code base is provided as a progressive example of developing an
          accessible React navigation component. It is accompanied by a{" "}
          <Link href="https://dev.to/shaynaproductions/" target="_blank">
            set of articles hosted on Dev.to
          </Link>
          .
        </Text>
      </Box>

      <Box cx="latest-release">
        <Heading headingLevel={2}>Latest Release</Heading>
        <LatestRelease />
      </Box>
      <Box cx="examples">
        <Heading headingLevel={2}>Examples</Heading>
        <Examples />
      </Box>
      <Box cx="prev-releases">
        <Heading headingLevel={2}>Previously Released</Heading>
        <PreviousReleases headingLevel={3} />
      </Box>
    </Box>
  );
}
