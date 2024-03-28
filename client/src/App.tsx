import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const HomePage = lazy(() => import("./pages/Home"));

const App = () => {
  return (
    <Suspense fallback={<div></div>}>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
      </Routes>
    </Suspense>
  );
};

export default App;
