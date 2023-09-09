import * as React from "react";
import Buy from "./components/Buy";
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
      <Buy/>
      <Sell/>
    </div>
  )
}
