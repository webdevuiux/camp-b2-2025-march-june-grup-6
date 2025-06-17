import React from 'react';

const PaymentNow = () => {
  return (
    <div className="min-h-screen bg-[#FFF7ED] px-4 sm:px-6 md:px-10 lg:px-20 py-8 sm:py-10">
      {/* Section: Ticket Detail */}
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h2 className="text-lg font-bold">Ticket (1) total: Rp. 350,000</h2>
        </div>

        {/* Ticket Box */}
        <div className="bg-[#FEE4C4] rounded-sm overflow-hidden flex flex-col md:flex-row">
          {/* Left Side: Ticket Info */}
          <div className="flex-1 w-full">
            <div className="flex items-center gap-2 mt-8 ml-8 mb-8 font-bold text-base">
              <img src="/img/ticket.svg" alt="Ticket Icon" className="w-7 h-7" />
              TICKET 1
            </div>

            <div className="ml-8 md:ml-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-sm pr-4 pb-6">
              <div>
                <p className="text-[#000000]">First Name</p>
                <p className="text-[#000000]">Nabila</p>
              </div>
              <div>
                <p className="text-[#000000]">Last Name</p>
                <p className="text-[#000000]">Sari</p>
              </div>
              <div>
                <p className="text-[#000000]">Email</p>
                <p className="text-[#000000] break-words">nabilasari4@gmail.com</p>
              </div>
              <div>
                <p className="text-[#000000]">Phone Number</p>
                <p className="text-[#000000]">(+62)555-2304-324</p>
              </div>
              <div>
                <p className="text-[#000000]">Code</p>
                <p className="font-bold">MRCE-32945</p>
              </div>
            </div>
          </div>

          {/* Right Side: QR Code */}
          <div className="bg-[#FF570C] flex items-center justify-center px-4 py-10 md:w-1/5">
            <img
              src="/img/qrcode_sementara.svg"
              alt="QR Code"
              className="w-24 h-24"
            />
          </div>
        </div>

        {/* Section: Processing Text */}
        <div className="flex items-center justify-center mt-16">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#FA5A1E] text-center">
            Processing Your Payment...
          </h1>
        </div>
      </div>
    </div>
  );
};

export default PaymentNow;
