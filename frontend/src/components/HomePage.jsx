import React from "react";
import Navbar from "./layout/Navbar";
import Hero from "./home/Hero";
import About from "./home/About";
import FAQ from "./home/FAQ";
import Connect from "./home/Connect";
import Featured from "./home/Featured";
import Footer from "./layout/Footer";

const HomePage = () => {
  return (
    <main className="bg-[#FCEDDA]">
      <div className="flex w-full flex-col items-stretch bg-[#FCEDDA] py-1 max-md:max-w-full">
        <div className="flex w-full flex-col items-stretch px-[50px] max-md:max-w-full max-md:px-5">
          <Navbar />
          <Hero />
        </div>
        <About />
        <FAQ />
        <Connect />
        <Featured />
        <Footer />
      </div>
    </main>
  );
};

export default HomePage;
