import React from "react";
import ProductImage from "./ProductImage";
import ProductInfo from "./ProductInfo";

const Product = (props) => {

  // const url = `https://web.furrl.in/productDetail?productId=${props.productId}&id=${props.id}&brand=${props.brand[0].name}&name=${props.title}`;
  const url = `https://web.furrl.in/productDetail?id=${props.id}`;

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: props.brand[0].name,
          text: `I found this amazing product from a unique, new-age brand on Furrl - ${props.brand[0].name} ${url}`,
          url: url 
        });
      } else {
        throw new Error("Web Share API not supported");
      }
    } catch (error) {
      console.error("Error sharing:", error.message);
    }
  };

  return (
    <div className="flex flex-col overflow-hidden">
      <ProductImage
        position={props.position}
        image={props.image}
        title={props.title}
        onShare={handleShare}
        url = {url}
      />
      <ProductInfo
        brand={props.brand}
        title={props.title}
        position={props.position}
        price={props.price}
        mrp={props.mrp}
        discountPercent={props.discountPercent}
        url={url}
      />
    </div>
  );
};

export default Product;
