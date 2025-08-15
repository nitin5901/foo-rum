/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ComponentType } from "react";

// a function to retry loading a chunk to avoid chunk load error for out of date code
const lazyRetry = (
  componentImport: () => Promise<{ default: ComponentType<any> }>
): Promise<{ default: ComponentType<any> }> => {
  return new Promise<{ default: ComponentType<any> }>((resolve, reject) => {
    const hasRefreshed = JSON.parse(
      window.sessionStorage.getItem("retry-lazy-refreshed") || "false"
    );

    componentImport()
      .then((component) => {
        window.sessionStorage.setItem("retry-lazy-refreshed", "false");
        resolve(component);
      })
      .catch((error) => {
        if (!hasRefreshed) {
          window.sessionStorage.setItem("retry-lazy-refreshed", "true");
          return window.location.reload();
        }
        reject(error);
      });
  });
};

export default lazyRetry;
