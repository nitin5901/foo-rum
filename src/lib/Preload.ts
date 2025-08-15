/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import type { ComponentType } from "react";

const ReactLazyPreload = (
  componentImport: () => Promise<{ default: ComponentType<any> }>
) => {
  const Component: any = React.lazy(componentImport);
  try {
    Component.preload = componentImport;
  } catch (error) {
    console.log("--Component Preload Error--", error);
  }
  return Component;
};

export default ReactLazyPreload;
