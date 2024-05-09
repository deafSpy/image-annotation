import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

const LazyLogin = lazy(() => import("./pages/Login"));
const LazyRegister = lazy(() => import("./pages/Register"));
const LazyUpload = lazy(() => import("./pages/Upload"));
const LazyGallery = lazy(() => import("./pages/Gallery"));
const Homepage = lazy(() => import("./pages/Homepage"));

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
        <Homepage />
        <Footer />
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
        <Header page="upload" />
        <LazyUpload />
        <Footer />
      </Suspense>
    ),
  },
  {
    path: "/gallery",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Header page="gallery" />
        <LazyGallery />
        <Footer />
      </Suspense>
    ),
  },
]);

export default appRouter;

