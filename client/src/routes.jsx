import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";

// import { HomePage } from "../";
import { Login } from "./pages/Login";
import App from "./App";



const LazyLogin = lazy(
  () => import("./pages/Login")
);

const LazyRegister = lazy(
    () => import("./pages/Register")
);

const LazyUpload = lazy(
    () => import("./pages/Upload")
);

const LazyMy = lazy(
    () => import("./pages/GalleryMy")
);

const LazyAll = lazy(
    () => import("./pages/GalleryAll")
);

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: (
        <Suspense fallback={<div>Loading...</div>}>
            <LazyLogin />
        </Suspense>
    ),
  },
  {
    path: "/register",
    element: (
        <Suspense fallback={<div>Loading...</div>}>
            <LazyRegister />
        </Suspense>
    ),
  },
  {
    path: "/upload",
    element: (
        <Suspense fallback={<div>Loading...</div>}>
            <LazyUpload />
        </Suspense>
    ),
  },
  {
    path: "/my",
    element: (
        <Suspense fallback={<div>Loading...</div>}>
            <LazyMy />
        </Suspense>
    ),
  },
  {
    path: "/all",
    element: (
        <Suspense fallback={<div>Loading...</div>}>
            <LazyAll />
        </Suspense>
    ),
  },
]);

export default appRouter;

