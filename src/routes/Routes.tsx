import React, { Suspense } from "react";
import { Route, HashRouter as Router, Routes } from "react-router-dom";

import { RouteList } from "../lib/RouteUtils";

const AppRoutes: React.FC = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Router>
      <Routes>
        {RouteList.map((routeItem) => {
          return (
            <Route
              path={routeItem.path}
              element={
                <Suspense
                  fallback={routeItem?.fallback ? <routeItem.fallback /> : null}
                >
                  <routeItem.element />
                </Suspense>
              }
              key={routeItem.path}
            />
          );
        })}
      </Routes>
    </Router>
  </Suspense>
);

export default React.memo(AppRoutes);
