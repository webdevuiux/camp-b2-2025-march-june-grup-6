import React from "react";

const PaymentNowSummary = ({ ticketCount = 1, ticketPrice = 350000 }) => {
  const subtotal = ticketCount * ticketPrice;

  const formatRupiah = (num) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(num);

  return (
    <div className="bg-[#FFDEB5] p-6 rounded-lg shadow-md w-full max-w-sm">
      <h3 className="font-bold text-lg mb-4">Summary</h3>
      <div className="text-sm space-y-2">
        <div className="flex justify-between">
          <span>{ticketCount}x</span>
          <span>{formatRupiah(ticketPrice)} / ticket</span>
        </div>
        <div className="border-b border-black my-2"></div>
        <div className="flex justify-between font-medium">
          <span>Subtotal</span>
          <span>{formatRupiah(subtotal)}</span>
        </div>

        <div className="flex justify-between font-medium">
          <span>Discount</span>
          <span>None</span>
        </div>
        <div className="border-t border-black pt-2 mt-2 flex justify-between font-bold">
          <span>TOTAL</span>
          <span>{formatRupiah(subtotal)}</span>
        </div>
      </div>
      <div className="border-b border-black my-2"></div>
    </div>
  );
};

export default PaymentNowSummary;
