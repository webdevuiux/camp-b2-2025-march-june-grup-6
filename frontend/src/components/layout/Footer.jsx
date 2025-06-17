import React, { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Subscribing email:", email);
    setEmail("");
    // You could add a toast notification here
  };

  return (
    <div className="bg-[rgba(255,222,181,1)] flex w-full gap-[40px_100px] flex-wrap mt-[100px] pt-[54px] pb-[95px] px-[61px] max-md:max-w-full max-md:mr-[3px] max-md:mt-10 max-md:px-5">
      <div className="grow shrink basis-auto mt-[13px] max-md:max-w-full">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
          <div className="w-[26%] max-md:w-full max-md:ml-0">
            <div className="flex grow flex-col items-stretch text-xl text-black font-normal whitespace-nowrap max-md:mt-10">
              <h3 className="text-black text-2xl max-md:mr-[9px]">Explore</h3>
              <a href="#" className="text-black mt-[45px] max-md:mt-10">
                Contact
              </a>
              <a href="#" className="text-black mt-[34px]">
                Tickets
              </a>
              <a href="#" className="text-black mt-[34px]">
                Workshops
              </a>
            </div>
          </div>
          <div className="w-[49%] ml-5 max-md:w-full max-md:ml-0">
            <div className="flex grow flex-col text-xl text-black font-normal max-md:mt-10">
              <h3 className="text-black text-2xl">Help</h3>
              <a
                href="#"
                className="text-black self-stretch mt-[45px] max-md:mt-10"
              >
                Terms & Condition
              </a>
              <a href="#" className="text-black mt-[34px]">
                Privacy Policy
              </a>
              <a href="#" className="text-black mt-[30px]">
                FAQ
              </a>
            </div>
          </div>
          <div className="w-[26%] ml-5 max-md:w-full max-md:ml-0">
            <div className="flex flex-col text-xl text-black font-normal whitespace-nowrap max-md:mt-10">
              <h3 className="text-black text-2xl">Follow</h3>
              <a
                href="#"
                className="text-black self-stretch mt-[50px] max-md:mt-10"
              >
                Instagram
              </a>
              <a href="#" className="text-black mt-[31px]">
                TikTok
              </a>
              <a href="#" className="text-black mt-[34px]">
                X
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-stretch text-xl text-black font-normal">
        <h3 className="text-black text-2xl">Join Our Newsletter</h3>
        <form onSubmit={handleSubmit} className="mt-[37px]">
          <div className="flex gap-5 whitespace-nowrap justify-between max-md:mr-[7px]">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-black opacity-70 bg-transparent outline-none w-full"
              required
            />
            <button type="submit">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/cc19c8fb85a142d1a49f6d5b2b38adc8/08f0a69026b932ffc9e25e1114fcbae4ee23f82f?placeholderIfAbsent=true"
                alt="Submit"
                className="aspect-[1] object-contain w-[25px] shrink-0"
              />
            </button>
          </div>
          <div className="border bg-black shrink-0 h-px mt-[11px] border-black border-solid" />
        </form>
        <div className="text-black mt-[107px] max-md:mt-10">
          Copyright @2025
        </div>
      </div>
    </div>
  );
};

export default Footer;
