declare module "hc-sticky" {
  type HCStickyOptions = {
    stickTo?: string | HTMLElement;
    innerTop?: number;
    top?: number;
    bottom?: number;
    bottomEnd?: number;
    innerSticker?: string | HTMLElement | null;
    stickyClass?: string;
    followScroll?: boolean;
    responsive?: Record<string, HCStickyOptions> | null;
    mobileFirst?: boolean;
    onStart?: (() => void) | null;
    onStop?: (() => void) | null;
    onBeforeResize?: (() => void) | null;
    onResize?: (() => void) | null;
    resizeDebounce?: number;
    disable?: boolean;
  };

  export default class HCSticky {
    constructor(element: string | HTMLElement, options?: HCStickyOptions);
    destroy(): void;
  }
}
