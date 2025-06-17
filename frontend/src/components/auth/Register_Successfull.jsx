import React from "react";
import { useNavigate } from "react-router-dom";

const Register_Successfull = () => {
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
              src="https://cdn.builder.io/api/v1/image/assets/cc19c8fb85a142d1a49f6d5b2b38adc8/a234bda996e47dbbe7a5cc288110383e53c6cdc7?placeholderIfAbsent=true"
              alt="Success Illustration"
              className="w-full h-auto max-w-[650px] rounded-[15px]"
            />
          </div>

          {/* Right side - Success Message - 50% */}
          <div className="w-1/2 flex items-center justify-center p-8 max-md:w-full">
            <div className="w-[483px] max-w-full text-center">
              <div className="flex flex-col items-center">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/cc19c8fb85a142d1a49f6d5b2b38adc8/9a629f36429a3c97a153355bb072cd0bd1c1addf?placeholderIfAbsent=true"
                  alt="Success Checkmark"
                  className="w-[110px] h-[110px] object-contain"
                />
                <div className="w-full mt-[35px]">
                  <h1 className="text-black text-4xl font-bold">
                    Sign Up Successful
                  </h1>
                  <p className="text-black text-lg font-normal leading-7 mt-[15px]">
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

export default Register_Successfull;
