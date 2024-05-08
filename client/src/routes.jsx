import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import Header from "./components/Header";

const LazyLogin = lazy(() => import("./pages/Login"));
const LazyRegister = lazy(() => import("./pages/Register"));
const LazyUpload = lazy(() => import("./pages/Upload"));
const LazyMy = lazy(() => import("./pages/GalleryMy"));
const LazyGallery = lazy(() => import("./pages/Gallery"));
const Homepage = lazy(() => import("./pages/Homepage"));

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
        <Homepage />
      </Suspense>
    ),
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
        <Header />
        <LazyUpload />
      </Suspense>
    ),
  },
  {
    path: "/my",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
        <LazyMy />
      </Suspense>
    ),
  },
  {
    path: "/gallery",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
        <LazyGallery />
      </Suspense>
    ),
  },
]);

export default appRouter;

