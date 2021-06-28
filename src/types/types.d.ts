export type MutationType = 'animation' | 'transition';

declare global {
  interface HTMLElement {
    __modalIsInit?: boolean;
  }
}