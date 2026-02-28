export const getSingleListTestElements = (getByRole) => {
  return {
    homeLink: getByRole("link", { name: "Home navigation" }),
    baseComponentsLink: getByRole("link", {
      name: "Accessible Base Components navigation",
    }),
    singleListLink: getByRole("link", {
      name: "Single List Links navigation",
    }),
    horizontalButtonsLink: getByRole("link", {
      name: "Horizontal All Buttons navigation",
    }),
    horizontalLinkEndsLink: getByRole("link", {
      name: "Horizontal Link Ends navigation",
    }),
    horizontalStyledLink: getByRole("link", {
      name: "Horizontal Styled navigation",
    }),
    verticalStyledLink: getByRole("link", {
      name: "Vertical Styled navigation",
    }),
  };
};

export const getMultipleButtonsTestElements = (
  getByRole,
  getByTestId,
  testId,
) => {
  return {
    communityButton: getByRole("button", { name: "Community subnavigation" }),
    communityList: getByTestId(`${testId}-community-menu-list`),
    blogLink: getByRole("link", { name: "Musings navigation" }),
    forumLink: getByRole("link", { name: "Forum navigation" }),
    storiesButton: getByRole("button", {
      name: "Tales subnavigation",
    }),
    referenceButton: getByRole("button", { name: "Reference subnavigation" }),
    aboutButton: getByRole("button", { name: "About subnavigation" }),
    storiesList: getByTestId(`${testId}-tales-menu-list`),
    searchButton: getByRole("button", { name: "Search subnavigation" }),
    searchList: getByTestId(`${testId}-search-menu-list`),
    basicSearchLink: getByRole("link", { name: "Basic Search navigation" }),
    advancedSearchLink: getByRole("link", {
      name: "Advanced Search navigation",
    }),
    allStoriesLink: getByRole("link", { name: "All Stories navigation" }),
    allCommentaryLink: getByRole("link", {
      name: "All Commentary navigation",
    }),
    findNextStoryButton: getByRole("button", {
      name: "Find Your Next Story subnavigation",
    }),
    findNextStoryList: getByTestId(`${testId}-find-next-story-list`),
    byStorytellerLink: getByRole("link", {
      name: "By Storyteller navigation",
    }),
    byEraLink: getByRole("link", { name: "By Era navigation" }),

    aboutList: getByTestId(`${testId}-about-menu-list`),
    aboutSiteLink: getByRole("link", { name: "About the Site navigation" }),
    privacyLink: getByRole("link", { name: "Privacy Policy navigation" }),
    accessibleLink: getByRole("link", { name: "Accessibility navigation" }),
    contactLink: getByRole("link", { name: "Contact Us navigation" }),
    donateLink: getByRole("link", { name: "Donate navigation" }),
  };
};
