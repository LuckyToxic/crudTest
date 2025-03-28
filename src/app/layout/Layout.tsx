import { Outlet } from "react-router";
import Header from "../../widgets/Header/Header";

export default function Layout() {
  return (
    <>
      <Header/>
      <Outlet/>
    </>
  )
}
