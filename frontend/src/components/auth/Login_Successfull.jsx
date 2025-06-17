import React from "react";
import { useNavigate } from "react-router-dom";

const Login_Successfull = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/");
  };

  return (
    <main className="flex flex-col items-stretch bg-[#FCEDDA] min-h-screen">
      <div className="flex flex-1">
        {/* Container with fixed max-width and 50-50 split */}
        <div className="flex w-full max-w-[1440px] mx-auto">
          {/* Left side - Image - 50% */}
          <div className="w-1/2 flex items-center justify-center p-8 max-md:hidden">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/cc19c8fb85a142d1a49f6d5b2b38adc8/bfbd4cb16b365e1694925c5aa26bac5b583b306f?placeholderIfAbsent=true"
              alt="Success Illustration"
              className="w-full h-auto max-w-[650px] rounded-[15px]"
            />
          </div>

          {/* Right side - Success Message - 50% */}
          <div className="w-1/2 flex items-center justify-center p-8 max-md:w-full">
            <div className="w-[521px] max-w-full">
              <div className="flex w-full flex-col items-center text-black text-center">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/cc19c8fb85a142d1a49f6d5b2b38adc8/1d233a1ca8a30219e2833e46c826e8125b1a5d88?placeholderIfAbsent=true"
                  alt="Success Icon"
                  className="w-[110px] h-[110px] object-contain"
                />
                <div className="w-full mt-[33px]">
                  <h1 className="text-4xl font-bold">Sign In Successful</h1>
                  <p className="text-lg font-normal leading-7 mt-[15px]">
                    Welcome back! You have successfully signed in.
                  </p>
                </div>
              </div>
              <button
                onClick={handleContinue}
                className="text-[#F7F7F7] mx-auto block rounded min-h-[60px] w-[400px] max-w-full text-2xl font-semibold whitespace-nowrap bg-black mt-[129px] px-2.5 py-3 max-md:mt-10 hover:bg-gray-800 transition-colors"
                aria-label="Continue to dashboard"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login_Successfull;
