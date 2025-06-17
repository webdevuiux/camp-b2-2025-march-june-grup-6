import React from "react";

const PaymentNowForm = ({ fullName, cardNumberLast4, accountNumber }) => {
  return (
    <div className="w-full max-w-lg">
      <div className="space-y-4">
        <div>
          <p className="text-sm">
            User Account: {fullName} <br />{" "}
            {cardNumberLast4 ? `****-****-****${cardNumberLast4}` : ""} 
          </p>
          
          <p className="text-sm text-gray-600 mb-1">
            Please transfer to account:
          </p>
          <p className="text-sm">Bank Account Admin Tiket Karya: {accountNumber}</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentNowForm;
