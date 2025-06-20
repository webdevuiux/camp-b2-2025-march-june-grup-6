import React from "react";

const Featured = () => {
  return (
    <>
      <h2 className="text-black text-3xl sm:text-[64px] font-bold self-center mt-[80px] sm:mt-[140px] max-md:text-[40px] max-md:mt-10">
        FEATURED
      </h2>
      <div className="self-center w-full max-w-[1309px] mt-8 sm:mt-14 max-md:max-w-full max-md:mt-10">
        <div className="gap-3 sm:gap-5 flex flex-col sm:flex-row max-md:items-stretch">
          <div className="w-full sm:w-[43%] max-md:ml-0">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/cc19c8fb85a142d1a49f6d5b2b38adc8/2195b5434112927808897076c6f3cc900026b65a?placeholderIfAbsent=true"
              alt="Featured Workshop"
              className="aspect-[0.6] object-contain w-full max-md:max-w-full max-md:mt-10"
            />
          </div>
          <div className="w-full sm:w-[57%] sm:ml-5 max-md:ml-0">
            <div className="w-full mt-2 sm:mt-[5px] max-md:max-w-full max-md:mt-10">
              <div className="max-md:max-w-full">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/cc19c8fb85a142d1a49f6d5b2b38adc8/98f053937aa82bca391265414c939cba5c059dfa?placeholderIfAbsent=true"
                  alt="Candle Making"
                  className="aspect-[1.5] object-contain w-full sm:w-[697px] max-w-full"
                />
                <div className="w-full mt-3 sm:mt-5 max-md:max-w-full">
                  <h3 className="text-black text-2xl sm:text-4xl font-bold max-md:max-w-full">
                    Scented Candle Making
                  </h3>
                  <div className="flex w-full gap-[10px] sm:gap-[15px_0px] text-sm sm:text-base text-black font-normal flex-wrap mt-2 sm:mt-[15px] max-md:max-w-full">
                    <div className="flex items-center gap-[3px] sm:gap-[5px]">
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets/cc19c8fb85a142d1a49f6d5b2b38adc8/ad906b7426026d77b9ac5561c0d2b2adc950a4fc?placeholderIfAbsent=true"
                        alt="Calendar"
                        className="aspect-[1] object-contain w-[15px] sm:w-[18px] self-stretch shrink-0 my-auto"
                      />
                      <div className="self-stretch w-[90px] sm:w-[114px] my-auto">
                        May 2, 2025
                      </div>
                    </div>
                    <div className="flex items-center gap-[3px] sm:gap-[5px]">
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets/cc19c8fb85a142d1a49f6d5b2b38adc8/89b3350fdaef83f807349ed3e65e3ad6a6d8689a?placeholderIfAbsent=true"
                        alt="Location"
                        className="aspect-[1] object-contain w-[15px] sm:w-[18px] self-stretch shrink-0 my-auto"
                      />
                      <div className="self-stretch w-[100px] sm:w-[133px] my-auto">
                        Jakarta, Indonesia
                      </div>
                    </div>
                    <div className="text-black text-base sm:text-lg leading-loose grow shrink w-full sm:w-[670px] max-md:max-w-full">
                      Craft your own natural soy candles with custom scents and
                      decorations
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 sm:gap-5 justify-between flex-wrap mt-5 sm:mt-[51px] max-md:max-w-full max-md:mt-10">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/cc19c8fb85a142d1a49f6d5b2b38adc8/6ebac2d41c64a31078d35901f5fd708edccdfd84?placeholderIfAbsent=true"
                  alt="Macramé"
                  className="aspect-[1] object-contain w-[300px] sm:w-[338px] min-w-60"
                />
                <div className="min-w-60 w-[300px] sm:w-[339px]">
                  <h3 className="text-black text-2xl sm:text-4xl font-bold">
                    Macramé Wall Hanging
                  </h3>
                  <div className="flex w-full max-w-[300px] sm:max-w-[339px] gap-[10px] sm:gap-[15px_0px] text-sm sm:text-base text-black font-normal flex-wrap mt-2 sm:mt-5">
                    <div className="flex min-w-60 w-[250px] sm:w-[271px] gap-[10px] sm:gap-[15px_0px] flex-wrap grow shrink">
                      <div className="flex items-center gap-[3px] sm:gap-[5px]">
                        <img
                          src="https://cdn.builder.io/api/v1/image/assets/cc19c8fb85a142d1a49f6d5b2b38adc8/1d588b283236cf7915c4242f0f32ff8ae972c759?placeholderIfAbsent=true"
                          alt="Calendar"
                          className="aspect-[1] object-contain w-[15px] sm:w-[18px] self-stretch shrink-0 my-auto"
                        />
                        <div className="self-stretch w-[90px] sm:w-[114px] my-auto">
                          June 15, 2025
                        </div>
                      </div>
                      <div className="flex items-center gap-[3px] sm:gap-[5px]">
                        <img
                          src="https://cdn.builder.io/api/v1/image/assets/cc19c8fb85a142d1a49f6d5b2b38adc8/0898970ccc6ff7b6bbfb07df09d66ede40e0ef3a?placeholderIfAbsent=true"
                          alt="Location"
                          className="aspect-[1] object-contain w-[15px] sm:w-[18px] self-stretch shrink-0 my-auto"
                        />
                        <div className="self-stretch w-[100px] sm:w-[133px] my-auto">
                          Bali, Indonesia
                        </div>
                      </div>
                      <div className="text-black self-stretch w-[280px] sm:w-[312px] min-w-60 gap-2.5 text-base sm:text-lg leading-6 sm:leading-7 grow shrink">
                        Learn the knots and patterns to craft your own macramé
                        art—boho vibes guaranteed
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Featured;