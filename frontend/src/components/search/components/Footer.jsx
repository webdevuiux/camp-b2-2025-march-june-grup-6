import React, { useState } from "react";

const Footer = ({ className = "" }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email berlangganan:", email);
    setEmail("");
  };

  return (
    <footer className={`w-full ${className}`}>
      <div className="border min-h-px w-full border-black border-solid max-md:max-w-full" />
      <div className="flex w-full gap-[40px_100px] flex-wrap bg-[#FFDEB5] pt-[54px] pb-[95px] px-[61px] max-md:max-w-full max-md:px-5">
        <div className="grow shrink basis-auto mt-[13px] max-md:max-w-full">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
            <div className="w-[26%] max-md:w-full max-md:ml-0">
              <div className="flex grow flex-col items-stretch text-xl text-black font-normal whitespace-nowrap max-md:mt-10">
                <h3 className="text-2xl max-md:mr-[9px]">Jelajahi</h3>
                <a
                  href="#"
                  className="mt-[45px] max-md:mt-10 hover:opacity-75 transition-opacity"
                >
                  Kontak
                </a>
                <a
                  href="#"
                  className="mt-[34px] hover:opacity-75 transition-opacity"
                >
                  Tiket
                </a>
                <a
                  href="#"
                  className="mt-[34px] hover:opacity-75 transition-opacity"
                >
                  Workshop
                </a>
              </div>
            </div>
            <div className="w-[49%] ml-5 max-md:w-full max-md:ml-0">
              <div className="flex grow flex-col text-xl text-black font-normal max-md:mt-10">
                <h3 className="text-2xl">Bantuan</h3>
                <a
                  href="#"
                  className="self-stretch mt-[45px] max-md:mt-10 hover:opacity-75 transition-opacity"
                >
                  Syarat & Ketentuan
                </a>
                <a
                  href="#"
                  className="mt-[34px] hover:opacity-75 transition-opacity"
                >
                  Kebijakan Privasi
                </a>
                <a
                  href="#"
                  className="mt-[30px] hover:opacity-75 transition-opacity"
                >
                  FAQ
                </a>
              </div>
            </div>
            <div className="w-[26%] ml-5 max-md:w-full max-md:ml-0">
              <div className="flex flex-col text-xl text-black font-normal whitespace-nowrap max-md:mt-10">
                <h3 className="text-2xl">Ikuti Kami</h3>
                <a
                  href="#"
                  className="self-stretch mt-[50px] max-md:mt-10 hover:opacity-75 transition-opacity"
                >
                  Instagram
                </a>
                <a
                  href="#"
                  className="mt-[31px] hover:opacity-75 transition-opacity"
                >
                  TikTok
                </a>
                <a
                  href="#"
                  className="mt-[34px] hover:opacity-75 transition-opacity"
                >
                  X
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col text-xl text-black font-normal">
          <h3 className="text-2xl">Join Our Newsletter</h3>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email" className="mt-[37px] block">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent w-full outline-none border-b border-black pb-2 focus:border-opacity-50 transition-colors"
              required
            />
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-black text-white text-base hover:bg-opacity-80 transition-colors"
            >
              Subscribe
            </button>
          </form>
          <div className="mt-[107px] max-md:mt-10">Copyright @2025</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
