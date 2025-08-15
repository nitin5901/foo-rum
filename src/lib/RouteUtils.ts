import React from "react";
import lazyRetry from "./LazyRetry";
import ReactLazyPreload from "./Preload";

const Feed = ReactLazyPreload(() => lazyRetry(() => import('../pages/Feed')));
const Login = ReactLazyPreload(() => lazyRetry(() => import('../container/Login')));
const SignUp = ReactLazyPreload(() => lazyRetry(() => import('../container/Signup')));

export const RouteList : {
    path: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    element: React.LazyExoticComponent<React.ComponentType<any>>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fallback?: React.NamedExoticComponent<any>;
}[] = [
    {
        path: '/',
        element: Feed,
    },
     {
        path: '/login',
        element: Login,
     },
     {
        path: '/signup',
        element: SignUp,
     }
];