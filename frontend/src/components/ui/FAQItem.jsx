import React, { useState } from "react";

const FAQItem = ({ icon, question }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-[rgba(255,255,255,0)] flex min-h-[126px] w-full flex-col items-stretch mx-auto max-md:max-w-full max-md:mt-10">
      <div className="bg-black min-h-0.5 w-full border-black border-solid border-2 max-md:max-w-full" />
      <div className="self-center flex w-[588px] max-w-full items-center gap-[40px_100px] justify-between flex-wrap mt-[19px]">
        <div className="self-stretch flex min-w-60 items-center gap-[5px] my-auto">
          <div className="items-center self-stretch flex min-h-[88px] gap-2.5 w-[88px] h-[88px] bg-[#FFDEB5] my-auto p-[22px] rounded-[20px] max-md:px-5">
            <div className="self-stretch flex w-full flex-col overflow-hidden items-stretch justify-center flex-1 shrink basis-[0%] my-auto py-[3px]">
              <img
                src={icon}
                alt="FAQ Icon"
                className="aspect-[1.13] object-contain w-[43px]"
              />
            </div>
          </div>
          <div className="text-black self-stretch min-w-60 gap-2.5 text-lg font-normal leading-loose my-auto p-2.5">
            {question}
          </div>
        </div>
        <button onClick={() => setIsOpen(!isOpen)}>
          <img
            src={
              isOpen
                ? "https://cdn.builder.io/api/v1/image/assets/cc19c8fb85a142d1a49f6d5b2b38adc8/5b8376673a3bf317d3a79d377497dbb2ae62cd9b?placeholderIfAbsent=true"
                : "https://cdn.builder.io/api/v1/image/assets/cc19c8fb85a142d1a49f6d5b2b38adc8/76b1680560ccb26f7ea8a82a18b7ef5ea75f323c?placeholderIfAbsent=true"
            }
            alt={isOpen ? "Collapse" : "Expand"}
            className="aspect-[0.97] object-contain w-[31px] self-stretch shrink-0 my-auto"
          />
        </button>
      </div>
      {isOpen && (
        <div className="self-center w-[588px] max-w-full text-black text-base font-normal mt-4 mb-4 pl-[93px]">
          <p>
            This is the answer to the FAQ question. It provides more details
            about the topic.
          </p>
        </div>
      )}
      <div className="bg-black min-h-0.5 w-full mt-[19px] border-black border-solid border-2 max-md:max-w-full" />
    </div>
  );
};

export default FAQItem;
