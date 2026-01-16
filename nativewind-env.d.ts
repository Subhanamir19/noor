/// <reference types="nativewind/types" />

/**
 * React 19 + React Native JSX Compatibility Fix
 *
 * Problem: React 19's @types/react defines JSX types that are incompatible
 * with React Native's class-based components (View, Text, etc.).
 *
 * Solution: Override React's JSX namespace to accept class components.
 *
 * See: https://github.com/facebook/react-native/issues/44854
 */

import type { ComponentClass, ReactElement, ReactNode, FunctionComponent } from 'react';

// Override React module's JSX namespace
declare module 'react' {
  namespace JSX {
    // Make ElementClass accept both class and function components
    interface ElementClass {
      render(): ReactNode;
    }

    // Accept any component as a valid JSX element
    interface IntrinsicAttributes {
      key?: string | number | null | undefined;
    }
  }
}

// Also declare in global namespace for good measure
declare global {
  namespace JSX {
    type Element = ReactElement<any, any>;

    interface ElementClass {
      render(): ReactNode;
    }

    interface ElementAttributesProperty {
      props: {};
    }

    interface ElementChildrenAttribute {
      children: {};
    }

    interface IntrinsicElements {
      [elemName: string]: any;
    }

    interface IntrinsicAttributes {
      key?: string | number | null | undefined;
    }

    interface IntrinsicClassAttributes<T> {
      ref?: React.Ref<T>;
    }
  }
}

export {};
