import React, { useEffect, useState } from "react";
import axios from "axios";
import Product from "./Product";
import Spinner from "./Spinner";

const Products = ({ filter , setProductCount }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = async (pageNumber, resetData = false) => {
    console.log('feched',pageNumber);
    const url = "https://api.furrl.in/api/v2/listing/getListingProducts";
    const payload = {
      input: {
        page: pageNumber,
        pageSize: 10,
        filters: filter,
        id: "#HomeHunts",
        entity: "vibe",
      },
    };

    try {
      setLoading(true);
      const response = await axios.post(url, payload);
      const pageNumber = response.data.data.getListingProducts.page;
      if(pageNumber === 1){
        const totalCount = response.data.data.getListingProducts.totalProducts;
        console.log(response.data.data.getListingProducts);
        setProductCount(totalCount);
      } 
      const newProducts = response.data.data.getListingProducts.products;
      setData((prevData) => (resetData ? newProducts : [...prevData, ...newProducts]));
      setHasMore(newProducts.length > 0);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading)
      return;
     setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if(page>1){
      console.log(page);
      fetchData(page);
    }
  }, [page]); 

  useEffect(() => {
    fetchData(1, true);
    setPage(1);
  }, [filter]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section>
      <div>
        <div className="grid grid-cols-2 gap-1">
          {data.map((productData, index) => (
            <div
              key={index}
              id={productData.id}
              className={`${index % 10 === 2 || index % 10 === 7 ? "col-span-2" : ""}`}
            >
              <Product
                position={index}
                id={productData.id}
                productId={productData.shopifyId}
                mrp={productData.MRP}
                brand={productData.brand}
                discountPercent={productData.discountPercent}
                image={productData.images}
                price={productData.price}
                title={productData.title}
              />
            </div>
          ))}
        </div>
        {loading && <Spinner />}
      </div>
    </section>
  );
};


export default Products;
