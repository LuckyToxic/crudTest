import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "../layout/Layout";
import MainPage from "../../pages/MainPage/MainPage";

export default function Router() {
  return (
    <BrowserRouter basename="/crudTest">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
