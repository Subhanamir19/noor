/**
 * React 19 + React Native Type Compatibility Fix
 *
 * This fixes the JSX element type mismatch between React 19's new JSX transform
 * and React Native's component types.
 */

import type { JSX as ReactJSX } from 'react';

declare global {
  namespace JSX {
    interface Element extends ReactJSX.Element {}
    interface ElementClass extends ReactJSX.ElementClass {}
    interface ElementAttributesProperty extends ReactJSX.ElementAttributesProperty {}
    interface ElementChildrenAttribute extends ReactJSX.ElementChildrenAttribute {}
    interface IntrinsicAttributes extends ReactJSX.IntrinsicAttributes {}
    interface IntrinsicClassAttributes<T> extends ReactJSX.IntrinsicClassAttributes<T> {}
  }
}

export {};
