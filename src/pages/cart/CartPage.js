import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/layout/Layout";
import { Trash } from "lucide-react";
import {
  decrimentQuantity,
  deleteFromCart,
  incrementQuantity,
} from "../../redux/cartSlice";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import BuyNowModal from "../../components/byNowModel/ByNowModel";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";

// const products = [
//   {
//     id: 1,
//     name: "Nike Air Force 1 07 LV8",
//     href: "#",
//     price: "₹47,199",
//     originalPrice: "₹48,900",
//     discount: "5% Off",
//     color: "Orange",
//     size: "8 UK",
//     imageSrc:
//       "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/54a510de-a406-41b2-8d62-7f8c587c9a7e/air-force-1-07-lv8-shoes-9KwrSk.png",
//   },
//   {
//     id: 2,
//     name: "Nike Blazer Low 77 SE",
//     href: "#",
//     price: "₹1,549",
//     originalPrice: "₹2,499",
//     discount: "38% off",
//     color: "White",
//     leadTime: "3-4 weeks",
//     size: "8 UK",
//     imageSrc:
//       "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e48d6035-bd8a-4747-9fa1-04ea596bb074/blazer-low-77-se-shoes-0w2HHV.png",
//   },
//   {
//     id: 3,
//     name: "Nike Air Max 90",
//     href: "#",
//     price: "₹2219 ",
//     originalPrice: "₹999",
//     discount: "78% off",
//     color: "Black",
//     imageSrc:
//       "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/fd17b420-b388-4c8a-aaaa-e0a98ddf175f/dunk-high-retro-shoe-DdRmMZ.png",
//   },
// ];

const CartPage = () => {
  const cartItem = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const deleteItem = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Delete cart");
  };

  const handleIncrement = (id) => {
    dispatch(incrementQuantity(id));
  };
  const handleDecrement = (id) => {
    const item = cartItem.find((item) => item.id === id);
    if (item) {
      if (item.quantity > 1) {
        dispatch(decrimentQuantity(id));
      } else {
        dispatch(deleteFromCart(item));
        toast.success("Item removed from cart");
      }
    }
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItem));
  }, [cartItem]);

  // Cart Total

  const cartItemTotal = cartItem
    .map((item) => item.quantity)
    .reduce((preValue, currValue) => preValue + currValue, 0);

  const cartTotapPrice = cartItem
    .map((item) => item.price * item.quantity)
    .reduce((preValue, currValue) => preValue + currValue, 0);

  // user

  const user = JSON.parse(localStorage.getItem("users"));

  // address info state
  const [addressInfo, setAddressInfo] = useState({
    name: "",
    address: "",
    pinCode: "",
    mobileNumber: "",
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  const buyNowFunction = () => {
    if (
      addressInfo.name === "" ||
      addressInfo.address === "" ||
      addressInfo.pinCode === "" ||
      addressInfo.mobileNumber === ""
    ) {
      return toast.error("All fields are required!");
    }

    const orderInfo = {
      cartItem,
      addressInfo,
      email: user.email,
      userid: user.uid,
      status: "confirmed",
      time: Timestamp.now(),
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    };

    try {
      const orderRef = collection(fireDB, "order");

      addDoc(orderRef, orderInfo);

      setAddressInfo({
        name: "",
        address: "",
        pinCode: "",
        mobileNumber: "",
      });
      toast.success("Order placed successfull");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto max-w-7xl px-2 lg:px-0">
        <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Shopping Cart
          </h1>
          <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
            <section
              aria-labelledby="cart-heading"
              className="rounded-lg bg-white lg:col-span-8"
            >
              <h2 id="cart-heading" className="sr-only">
                Items in your shopping cart
              </h2>
              <ul role="list" className="divide-y divide-gray-200">
                {cartItem.length > 0 ? (
                  <>
                    {cartItem.map((item) => {
                      const {
                        id,
                        title,
                        price,
                        productImageUrl,
                        quantity,
                        category,
                      } = item;
                      return (
                        <div key={item.id} className="">
                          <li className="flex py-6 sm:py-6 ">
                            <div className="flex-shrink-0">
                              <img
                                src={productImageUrl}
                                alt={"img"}
                                className="sm:h-38 sm:w-38 h-24 w-24 rounded-md object-contain object-center"
                              />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                              <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                <div>
                                  <div className="flex justify-between">
                                    <h3 className="text-sm">
                                      <h3 className="font-semibold text-black">
                                        {title}
                                      </h3>
                                    </h3>
                                  </div>
                                  <div className="mt-1 flex text-sm">
                                    <p className="text-sm text-gray-500">
                                      {category}
                                    </p>
                                  </div>
                                  <div className="mt-1 flex items-end">
                                    <p className="text-xs font-medium text-gray-500 ">
                                      ₹{price}
                                    </p>
                                    {/* <p className="text-sm font-medium text-gray-900">
                                      &nbsp;&nbsp;₹{price}
                                    </p> */}
                                    {/* &nbsp;&nbsp;
                              <p className="text-sm font-medium text-green-500">
                                {product.discount}
                              </p> */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                          <div className="mb-2 flex">
                            <div className="min-w-24 flex">
                              <button
                                onClick={() => handleDecrement(id)}
                                type="button"
                                className="h-7 w-7"
                              >
                                -
                              </button>
                              <input
                                type="text"
                                className="mx-1 h-7 w-9 rounded-md border text-center"
                                value={quantity}
                              />
                              {/* <p className="mx-1 h-7 w-9 rounded-md border text-center">
                            {quantity}
                          </p> */}
                              <button
                                onClick={() => {
                                  handleIncrement(id);
                                }}
                                type="button"
                                className="flex h-7 w-7 items-center justify-center"
                              >
                                +
                              </button>
                            </div>
                            <div className="ml-6 flex text-sm">
                              <button
                                type="button"
                                className="flex items-center space-x-1 px-2 py-1 pl-0"
                              >
                                <Trash size={12} className="text-red-500" />
                                <span
                                  onClick={() => deleteItem(item)}
                                  className="text-xs font-medium text-red-500"
                                >
                                  Remove
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <>
                    <div>
                      <img
                        className="w-72 h-72 flex justify-center items-center mx-auto"
                        src="https://img.freepik.com/free-vector/woman-with-shopping-cart-vector_1308-129957.jpg?w=740&t=st=1726723431~exp=1726724031~hmac=8043c5c789c857dbddae8308af4a8bbc474fd0c69686e7fad23a534c0404403b"
                        alt=""
                      />
                    </div>

                    <h1 className=" flex justify-center border-none mt-4 font-semibold text-gray-700 text-xl">
                      Your cart is empty
                    </h1>
                    <div className="flex justify-center border-none">
                      <button className="flex justify-center mt-4 px-4 py-2 text-center text-gray-100 bg-pink-600 border border-transparent dark:border-gray-700 hover:border-pink-500 hover:text-pink-700 hover:bg-pink-100 rounded-xl">
                        <Link to={"/"}>Go to home</Link>
                      </button>
                    </div>
                  </>
                )}
              </ul>
            </section>
            {/* Order summary */}
            <section
              aria-labelledby="summary-heading"
              className="mt-16 rounded-md bg-white lg:col-span-4 lg:mt-0 lg:p-0"
            >
              <h2
                id="summary-heading"
                className=" border-b border-gray-200 px-4 py-3 text-lg font-medium text-gray-900 sm:p-4"
              >
                Price Details
              </h2>
              <div>
                <dl className=" space-y-1 px-2 py-4">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-gray-800">
                      Price ({cartItemTotal} item)
                    </dt>
                    <dd className="text-sm font-medium text-gray-900">
                      ₹ {cartTotapPrice}
                    </dd>
                  </div>

                  <div className="flex items-center justify-between py-4">
                    <dt className="flex text-sm text-gray-800">
                      <span>Delivery Charges</span>
                    </dt>
                    <dd className="text-sm font-medium text-green-700">Free</dd>
                  </div>
                  <div className="flex items-center justify-between border-y border-dashed py-4 ">
                    <dt className="text-base font-medium text-gray-900">
                      Total Amount
                    </dt>
                    <dd className="text-base font-medium text-gray-900">
                      ₹ {cartTotapPrice}
                    </dd>
                  </div>
                </dl>
                <div className="px-2 pb-4 font-medium text-green-700">
                  <div className="flex gap-4 mb-6">
                    {user ? (
                      <BuyNowModal
                        addressInfo={addressInfo}
                        setAddressInfo={setAddressInfo}
                        buyNowFunction={buyNowFunction}
                      />
                    ) : (
                      <Navigate to={"/login"} />
                    )}
                  </div>
                </div>
              </div>
            </section>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
