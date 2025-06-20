import React from "react";

const Connect = () => {
  return (
    <div className="flex w-full max-w-[1238px] gap-5 sm:gap-[40px_47px] flex-wrap mx-auto mt-[60px] sm:mt-[86px] px-2.5 max-md:max-w-full max-md:mt-10">
      <div className="flex min-w-60 flex-col items-stretch w-full sm:w-[641px] px-2.5 max-md:max-w-full">
        <div className="w-full text-black max-md:max-w-full">
          <h2 className="text-black text-3xl sm:text-[64px] font-bold max-md:text-[40px]">
            Connect & Share
          </h2>
          <div className="w-full sm:w-[557px] max-w-full text-base sm:text-lg font-normal leading-6 sm:leading-7 mt-2 sm:mt-[7px]">
            <p className="text-black max-md:max-w-full">
              Have a question before your workshop? Want to share tips or see
              what others are saying? Our forum is the place to connect with
              fellow creatives. Whether you're a first-timer or a seasoned
              maker, you can join the conversation, get advice, or simply find
              inspiration from the community. From what to bring to
              behind-the-scenes stories, the forum is open for anyone who loves
              to learn, share, and support each other. Dive in and be part of
              the dialogue.
            </p>
            <p className="text-black mt-5 sm:mt-[35px] max-md:max-w-full">
              Join the conversation! Share your thoughts, ask questions, and
              connect with others on our forum today!
            </p>
          </div>
        </div>
        <button className="text-[#FCEDDA] rounded w-[180px] sm:w-[210px] max-w-full gap-2.5 text-lg font-semibold text-center bg-black mt-5 sm:mt-[38px] px-2.5 sm:p-2.5">
          <a href="/forum">Visit Forum</a>
        </button>
      </div>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/cc19c8fb85a142d1a49f6d5b2b38adc8/bad5a3b248d313e2f73c8d5d56a258a365939d7d?placeholderIfAbsent=true"
        alt="Connect Image"
        className="aspect-[1.09] object-contain w-full sm:min-w-60 flex-1 shrink basis-5 max-md:max-w-full"
      />
    </div>
  );
};

export default Connect;