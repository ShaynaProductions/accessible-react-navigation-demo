export interface NavigationHookProps {
  closeOpenSiblings(): void;
  isTopRow: (parentEl: HTMLButtonElement | null) => boolean;
}
