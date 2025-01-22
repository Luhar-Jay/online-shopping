import { useState } from "react";

const BuyNowModal = ({ buyNowFunction, setAddressInfo, addressInfo }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className="w-full px-4 py-3 text-center text-gray-100 bg-pink-600 border border-transparent hover:border-pink-500 hover:text-pink-700 hover:bg-pink-100 rounded-xl"
      >
        Buy now
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-pink-50 rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-semibold text-center mb-4">Buy Now</h2>
            <div className="mb-3">
              <input
                type="text"
                name="name"
                value={addressInfo.name}
                onChange={(e) => {
                  setAddressInfo({ ...addressInfo, name: e.target.value });
                }}
                placeholder="Enter your name"
                className="bg-pink-50 border border-pink-200 px-2 py-2 w-full rounded-md outline-none text-pink-600 placeholder-pink-300"
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="address"
                value={addressInfo.address}
                onChange={(e) => {
                  setAddressInfo({ ...addressInfo, address: e.target.value });
                }}
                placeholder="Enter your address"
                className="bg-pink-50 border border-pink-200 px-2 py-2 w-full rounded-md outline-none text-pink-600 placeholder-pink-300"
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                name="pincode"
                value={addressInfo.pinCode}
                onChange={(e) => {
                  setAddressInfo({ ...addressInfo, pinCode: e.target.value });
                }}
                placeholder="Enter your pincode"
                className="bg-pink-50 border border-pink-200 px-2 py-2 w-full rounded-md outline-none text-pink-600 placeholder-pink-300"
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="mobileNumber"
                value={addressInfo.mobileNumber}
                onChange={(e) => {
                  setAddressInfo({
                    ...addressInfo,
                    mobileNumber: e.target.value,
                  });
                }}
                placeholder="Enter your mobile number"
                className="bg-pink-50 border border-pink-200 px-2 py-2 w-full rounded-md outline-none text-pink-600 placeholder-pink-300"
              />
            </div>
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => {
                  handleOpen();
                  buyNowFunction();
                }}
                className="w-full px-4 py-3 text-center text-gray-100 bg-pink-600 border border-transparent hover:border-pink-500 hover:text-pink-700 hover:bg-pink-100 rounded-lg"
              >
                Confirm Purchase
              </button>
            </div>
            <button
              type="button"
              onClick={handleOpen}
              className="mt-4 text-center text-pink-600 hover:underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default BuyNowModal;
