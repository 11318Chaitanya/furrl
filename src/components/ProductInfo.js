import React from "react";

const ProductTitle = ({ title, position }) => {
  const maxLength = position % 10 === 2 || position % 10 === 7 ? 48 : 22;
  const displayTitle =
    title.length > maxLength ? `${title.slice(0, maxLength)}...` : title;

  return <p className="text-[#001718]">{displayTitle}</p>;
};

const ProductPrice = ({ price, mrp, discountPercent }) => {
  console.log(discountPercent);
  return (
    <div className="flex gap-1">
      <span className="font-bold">Rs. {price.value}</span>
      {mrp && mrp.value && mrp.value !== price.value && (
        <>
          <span className="text-[#64748BB3] line-through">Rs. {mrp.value}</span>
          <span className="text-[#7e59e7]">{discountPercent}%</span>
        </>
      )}
    </div>
  );
};

const ProductInfo = ({
  brand,
  title,
  position,
  price,
  mrp,
  discountPercent,
  url,
}) => {
  return (
    <a href={url} className="flex flex-col text-[12px] px-2 py-2">
      <div>
        <p className="text-[#64748b]">{brand[0].name}</p>
      </div>
      <div>
        <ProductTitle title={title} position={position} />
        <ProductPrice
          price={price}
          mrp={mrp}
          discountPercent={discountPercent}
        />
      </div>
    </a>
  );
};

export default ProductInfo;
