import * as React from "react";
import Inventory from "./components/Inventory";
import Sell from "./components/Sell";
import Nav from "./components/Nav"
import Header from "./components/Header"
import Skills from "./components/Skills";

export default function Home() {
  return (
    <div>
      <Nav/>
      <Header/>
      <Skills/>
      <Inventory/>
      <Sell/>
    </div>
  )
}
