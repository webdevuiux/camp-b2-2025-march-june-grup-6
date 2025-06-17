import React from "react";
import { useNavigate } from "react-router-dom";

const Register_Organizer_Successfull = () => {
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
              src="https://cdn.builder.io/api/v1/image/assets/cc19c8fb85a142d1a49f6d5b2b38adc8/c7af865501e44b2bd9c276d0ccb65225b617ad6c?placeholderIfAbsent=true"
              alt="Success Illustration"
              className="w-full h-auto max-w-[650px] rounded-[15px]"
            />
          </div>

          {/* Right side - Success Message - 50% */}
          <div className="w-1/2 flex items-center justify-center p-8 max-md:w-full">
            <div className="w-[483px] max-w-full text-black text-center">
              <div className="flex flex-col items-center">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/cc19c8fb85a142d1a49f6d5b2b38adc8/b3c4679a7d74dab617bc15acfff24fd08c8961d7?placeholderIfAbsent=true"
                  alt="Success Icon"
                  className="w-[110px] h-[110px] object-contain"
                />

                <div className="mt-[35px]">
                  <h1 className="text-5xl font-bold leading-none max-md:text-[40px]">
                    Sign Up Successful
                  </h1>
                  <p className="text-lg font-normal leading-7 mt-[21px]">
                    Your account has been created successfully! Please sign in
                    to get started.
                  </p>
                </div>

                <button
                  onClick={handleSignIn}
                  className="text-[#F7F7F7] rounded min-h-[60px] w-[400px] max-w-full gap-2.5 text-2xl font-semibold bg-black mt-[93px] px-2.5 py-3 max-md:mt-10 hover:bg-gray-800 transition-colors"
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

export default Register_Organizer_Successfull;
