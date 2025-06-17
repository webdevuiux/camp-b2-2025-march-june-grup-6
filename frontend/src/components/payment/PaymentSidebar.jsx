import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentSidebar = ({ ticketCount, ticketPrice }) => {
  const navigate = useNavigate();
  const subtotal = ticketCount * ticketPrice;

  const formatRupiah = (num) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(num);

  const handlePayNow = () => {
    navigate('/payment-now');
  };

  return (
    <div className="min-w-[300px] max-w-[300px] bg-[#FFDEB5] shadow-md rounded-lg p-6 sticky top-24 self-start h-fit">
      <h3 className="font-bold mb-4">Summary</h3>

      <div className="text-sm mb-4">
        <div className="flex justify-between">
          <span>{ticketCount}x</span>
          <span>{formatRupiah(ticketPrice)} / ticket</span>
        </div>
        <div className="flex justify-between mt-2">
          <span className="font-medium">Subtotal</span>
          <span>{formatRupiah(subtotal)}</span>
        </div>
        <div className="flex justify-between mt-2">
          <span className="font-medium">Discount</span>
          <span>None</span>
        </div>
        <div className="flex justify-between mt-4 font-bold border-t border-black pt-2">
          <span>TOTAL</span>
          <span>{formatRupiah(subtotal)}</span>
        </div>
      </div>

      <div className="text-sm mb-4">
        <div className="flex items-center justify-between font-medium">
          <p>Payment method</p>
          <span className="text-blue-500 cursor-pointer">Change</span>
        </div>

        <div className="bg-[#FFE9CC] mt-2 p-3 rounded-md border border-black flex gap-2 items-center">
          <img src="/img/icon_card.svg" alt="card" className="w-6 h-6" />
          <div className="flex flex-col ml-auto items-end">
            <p className="text-xs text-gray-600">Card</p>
            <p className="font-medium">**** 5554</p>
          </div>
        </div>
      </div>

      <button
        onClick={handlePayNow}
        className="bg-[#FA5A1E] w-full py-2 text-white rounded hover:bg-[#e14e17] font-semibold"
      >
        Pay Now
      </button>
    </div>
  );
};

export default PaymentSidebar;
