import React, { useState } from "react";

const Footer = ({ className = "" }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email berlangganan:", email);
    setEmail("");
  };

  return (
    <footer className={`w-full ${className} max-md:px-2.5`}>
      <div className="border min-h-px w-full border-black border-solid max-md:max-w-full" />
      <div className="flex w-full gap-[40px_100px] flex-wrap bg-[#FFDEB5] pt-[54px] pb-[95px] px-[61px] max-md:max-w-full max-md:px-5 max-md:pt-5 max-md:pb-10 max-md:gap-2">
        <div className="grow shrink basis-auto mt-[13px] max-md:max-w-full max-md:mt-2">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-2">
            <div className="w-[26%] max-md:w-full max-md:ml-0">
              <div className="flex grow flex-col items-stretch text-xl text-black font-normal whitespace-nowrap max-md:mt-2 max-md:text-base">
                <h3 className="text-2xl max-md:mr-[9px] max-md:text-lg">
                  Jelajahi
                </h3>
                <a
                  href="#"
                  className="mt-[45px] max-md:mt-2 hover:opacity-75 transition-opacity max-md:text-sm"
                >
                  Kontak
                </a>
                <a
                  href="#"
                  className="mt-[34px] hover:opacity-75 transition-opacity max-md:mt-2 max-md:text-sm"
                >
                  Tiket
                </a>
                <a
                  href="#"
                  className="mt-[34px] hover:opacity-75 transition-opacity max-md:mt-2 max-md:text-sm"
                >
                  Workshop
                </a>
              </div>
            </div>
            <div className="w-[49%] ml-5 max-md:w-full max-md:ml-0">
              <div className="flex grow flex-col text-xl text-black font-normal max-md:mt-2 max-md:text-base">
                <h3 className="text-2xl max-md:text-lg">Bantuan</h3>
                <a
                  href="#"
                  className="self-stretch mt-[45px] max-md:mt-2 hover:opacity-75 transition-opacity max-md:text-sm"
                >
                  Syarat & Ketentuan
                </a>
                <a
                  href="#"
                  className="mt-[34px] hover:opacity-75 transition-opacity max-md:mt-2 max-md:text-sm"
                >
                  Kebijakan Privasi
                </a>
                <a
                  href="#"
                  className="mt-[30px] hover:opacity-75 transition-opacity max-md:mt-2 max-md:text-sm"
                >
                  FAQ
                </a>
              </div>
            </div>
            <div className="w-[26%] ml-5 max-md:w-full max-md:ml-0">
              <div className="flex flex-col text-xl text-black font-normal whitespace-nowrap max-md:mt-2 max-md:text-base">
                <h3 className="text-2xl max-md:text-lg">Ikuti Kami</h3>
                <a
                  href="#"
                  className="self-stretch mt-[50px] max-md:mt-2 hover:opacity-75 transition-opacity max-md:text-sm"
                >
                  Instagram
                </a>
                <a
                  href="#"
                  className="mt-[31px] hover:opacity-75 transition-opacity max-md:mt-2 max-md:text-sm"
                >
                  TikTok
                </a>
                <a
                  href="#"
                  className="mt-[34px] hover:opacity-75 transition-opacity max-md:mt-2 max-md:text-sm"
                >
                  X
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col text-xl text-black font-normal max-md:mt-2 max-md:text-base">
          <h3 className="text-2xl max-md:text-lg">Join Our Newsletter</h3>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email" className="mt-[37px] block max-md:mt-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent w-full outline-none border-b border-black pb-2 focus:border-opacity-50 transition-colors max-md:w-[200px]"
              required
            />
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-black text-white text-base hover:bg-opacity-80 transition-colors max-md:mt-2 max-md:px-2 max-md:py-1 max-md:text-sm"
            >
              Subscribe
            </button>
          </form>
          <div className="mt-[107px] max-md:mt-5 max-md:text-sm">
            Copyright @2025
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;