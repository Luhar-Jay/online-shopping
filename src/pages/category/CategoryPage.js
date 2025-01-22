import React, { useContext, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import myContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";

const CategoryPage = () => {
  const { categoryname } = useParams();
  const context = useContext(myContext);
  const { getAllProduct, loading } = context;
  const navigate = useNavigate();

  // Filter Product
  const filterProduct = getAllProduct.filter((obj) =>
    obj.category.includes(categoryname)
  );

  const cartItem = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addCart = (item) => {
    dispatch(addToCart(item));
    toast.success("Add to cart");
  };
  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Delete from cart");
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItem));
  }, [cartItem]);
  return (
    <Layout>
      <div className="">
        <div className="">
          <h1 className="text-center my-5 text-2xl font-semibold first-letter:uppercase">
            {categoryname}
          </h1>
        </div>
        {loading ? (
          <div className="flex justify-center">
            <Loader />
          </div>
        ) : (
          <section className="text-gray-600 body-font">
            <div className="container px-5 py-5 mx-auto">
              <div className="flex flex-wrap -m-4 justify-center">
                {filterProduct.length > 0 ? (
                  <>
                    {filterProduct.map((item, index) => {
                      const { id, title, price, productImageUrl } = item;
                      return (
                        <div key={index} className="p-4 w-full md:w-1/4">
                          <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer">
                            <img
                              onClick={() => navigate(`/productinfo/${id}`)}
                              className="lg:h-80  h-96 w-full"
                              src={productImageUrl}
                              alt="blog"
                            />
                            <div className="p-6">
                              <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                                E-bharat
                              </h2>
                              <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                {title.substring(0, 25)}
                              </h1>
                              <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                ₹{price}
                              </h1>

                              <div className="flex justify-center ">
                                {cartItem.some((p) => p.id === item.id) > 0 ? (
                                  <>
                                    <button
                                      onClick={() => deleteCart(item)}
                                      className=" bg-red-500 hover:bg-red-600 w-full text-white py-[4px] rounded-lg font-bold"
                                    >
                                      Delete To Cart
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <button
                                      onClick={() => addCart(item)}
                                      className=" bg-pink-500 hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold"
                                    >
                                      Add To Cart
                                    </button>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <div className="">
                    <div className="flex justify-center ">
                      <img
                        className=""
                        src="https://cdn-icons-png.flaticon.com/128/2748/2748614.png"
                        alt="img"
                      />
                    </div>
                    <h1 className="text-black text-xl">
                      No {categoryname} product found
                    </h1>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

export default CategoryPage;
