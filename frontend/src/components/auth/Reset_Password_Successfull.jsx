import React from "react";
import { useNavigate } from "react-router-dom";

const Reset_Password_Successfull = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/login");
  };

  return (
    <main className="flex flex-col items-stretch bg-[#FCEDDA] min-h-screen">
      <div className="flex flex-1">
        <div className="flex w-full max-w-[1440px] mx-auto">
          {/* Left side - Image - 50% */}
          <div className="w-1/2 flex items-center justify-center p-8 max-md:hidden">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/cc19c8fb85a142d1a49f6d5b2b38adc8/e3eba738bee301607c6d12179c1ad9cc03bfe6a4?placeholderIfAbsent=true"
              alt="Reset Password Success Illustration"
              className="w-full h-auto max-w-[650px] rounded-[15px]"
            />
          </div>

          {/* Right side - Success Message - 50% */}
          <div className="w-1/2 flex items-center justify-center p-8 max-md:w-full">
            <div className="w-[600px] max-w-full text-center">
              <div className="flex flex-col items-center">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/cc19c8fb85a142d1a49f6d5b2b38adc8/8edf38f00b51ad73cad7df4a6fdb73e0fe7286fe?placeholderIfAbsent=true"
                  alt="Success Icon"
                  className="w-[110px] h-[110px] object-contain"
                />

                <div className="mt-7">
                  <h1 className="text-black text-5xl font-bold leading-none max-md:text-[40px]">
                    Reset Password Requested
                  </h1>

                  <p className="text-black text-base font-normal leading-7 mt-6 max-w-[479px] mx-auto">
                    We have sent instructions to reset your password to your
                    email. Please check your inbox and follow the steps
                    provided.
                  </p>
                </div>

                <button
                  onClick={handleSignIn}
                  className="text-[#F7F7F7] rounded min-h-[60px] w-[400px] max-w-full gap-2.5 text-2xl font-semibold bg-black mt-[95px] px-2.5 py-3 max-md:mt-10 hover:bg-gray-800 transition-colors"
                  aria-label="Sign In"
                >
                  SIGN IN
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Reset_Password_Successfull;
