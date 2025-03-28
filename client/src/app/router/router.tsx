import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "../layout/Layout";
import MainPage from "../../pages/MainPage/mainPage";

export default function router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
            <Route path="/" element={<MainPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
