/// <reference types="vite/client" />

declare module 'stickybits' {
  interface IStickybitsStyle {
    classes: Record<string, boolean>;
    styles: Record<string, string>;
  }

  interface IStickybitsOptions {
    customStickyChangeNumber?: number | null;
    noStyles?: boolean;
    stickyBitStickyOffset?: number;
    parentClass?: string;
    scrollEl?: Window | HTMLElement | string;
    stickyClass?: string;
    stuckClass?: string;
    stickyChangeClass?: string;
    useStickyClasses?: boolean;
    useFixed?: boolean;
    useGetBoundingClientRect?: boolean;
    verticalPosition?: 'top' | 'bottom';
    applyStyle?: (style: IStickybitsStyle, instance: unknown) => void;
  }

  interface IStickybitsInstance {
    update: (updatedProps?: Partial<IStickybitsOptions>) => IStickybitsInstance;
    cleanup: () => void;
  }

  const stickybits: (target: string | Element | Element[], options?: IStickybitsOptions) => IStickybitsInstance;

  export default stickybits;
}
