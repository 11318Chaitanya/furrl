import React, { useEffect, useState } from "react";
import axios from "axios";
import Product from "./Product";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

const Products = ({ filter, setProductCount }) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = async (page, resetData = false) => {
    const url = "https://api.furrl.in/api/v2/listing/getListingProducts";
    const payload = {
      input: {
        page: page,
        pageSize: 10,
        filters: filter,
        id: "#HomeHunts",
        entity: "vibe",
      },
    };

    try {
      const response = await axios.post(url, payload);
      const { page: currentPage, totalProducts, totalPages, products } = response.data.data.getListingProducts;

      if (currentPage === 1) {
        setProductCount(totalProducts);
      }

      setData((prevData) => (resetData ? products : [...prevData, ...products]));
      setHasMore(page < totalPages);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if(page>1){
      fetchData(page);
    }
  }, [page]);

  useEffect(() => {
    setPage(1);
    fetchData(1, true);
  }, [filter]);

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <section>
      <InfiniteScroll
        dataLength={data.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<Spinner />}
      >
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
        </div>
      </InfiniteScroll>
    </section>
  );
};

export default Products;
