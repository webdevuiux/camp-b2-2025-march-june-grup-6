import React from "react";
import FAQItem from "../ui/FAQItem";

const FAQ = () => {
  return (
    <div className="flex w-full flex-col items-stretch mt-[60px] sm:mt-[122px] px-5 sm:px-[79px] max-md:max-w-full">
      <h2 className="text-black text-3xl sm:text-[64px] font-bold ml-2.5 sm:ml-5 max-md:text-[40px]">
        FAQ
      </h2>
      <div className="mt-5 sm:mt-9 max-md:max-w-full">
        <div className="gap-3 sm:gap-5 flex flex-col sm:flex-row max-md:items-stretch">
          <div className="w-full sm:w-6/12 max-md:ml-0">
            <FAQItem
              icon="https://cdn.builder.io/api/v1/image/assets/cc19c8fb85a142d1a49f6d5b2b38adc8/d5330017ab564a3a4dfcc7328ea9098b83c52113?placeholderIfAbsent=true"
              question="How do I buy tickets for a workshop?"
            />
          </div>
          <div className="w-full sm:w-6/12 sm:ml-5 max-md:ml-0">
            <FAQItem
              icon="https://cdn.builder.io/api/v1/image/assets/cc19c8fb85a142d1a49f6d5b2b38adc8/0c05640cd8968dd1ca67503eced841e69c3aa97c?placeholderIfAbsent=true"
              question="Do I need to bring my own materials?"
            />
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-9 max-md:max-w-full">
        <div className="gap-3 sm:gap-5 flex flex-col sm:flex-row max-md:items-stretch">
          <div className="w-full sm:w-6/12 max-md:ml-0">
            <FAQItem
              icon="https://cdn.builder.io/api/v1/image/assets/cc19c8fb85a142d1a49f6d5b2b38adc8/851843313edf72d010fe9ec5697fb401786cff48?placeholderIfAbsent=true"
              question="Can I join workshops online and in person?"
            />
          </div>
          <div className="w-full sm:w-6/12 sm:ml-5 max-md:ml-0">
            <FAQItem
              icon="https://cdn.builder.io/api/v1/image/assets/cc19c8fb85a142d1a49f6d5b2b38adc8/a7b8be8fac34d61fb7e91afa04b2dcc5b76a9f94?placeholderIfAbsent=true"
              question="How do I join the forum?"
            />
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-9 max-md:max-w-full">
        <div className="gap-3 sm:gap-5 flex flex-col sm:flex-row max-md:items-stretch">
          <div className="w-full sm:w-6/12 max-md:ml-0">
            <FAQItem
              icon="https://cdn.builder.io/api/v1/image/assets/cc19c8fb85a142d1a49f6d5b2b38adc8/47c75ae032e731f4cdaace4850651fe7b8249747?placeholderIfAbsent=true"
              question="Where can I ask questions or talk to other participants?"
            />
          </div>
          <div className="w-full sm:w-6/12 sm:ml-5 max-md:ml-0">
            <FAQItem
              icon="https://cdn.builder.io/api/v1/image/assets/cc19c8fb85a142d1a49f6d5b2b38adc8/a993b21f1ce6049f55954b1fffb00f74fe2aa79c?placeholderIfAbsent=true"
              question="Can I host my own workshop on this platform?"
            />
          </div>
        </div>
      </div>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/cc19c8fb85a142d1a49f6d5b2b38adc8/177a2b4fdc782d307ecaf5b3aa18a794c65ee2c7?placeholderIfAbsent=true"
        alt="Divider"
        className="aspect-[4.12] object-contain w-full mt-10 sm:mt-[91px] max-md:max-w-full max-md:mr-2.5"
      />
    </div>
  );
};

export default FAQ;