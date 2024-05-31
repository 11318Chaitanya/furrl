import React, { useEffect, useState } from "react";
import axios from "axios";

const Filters = ({ cat, handleCategoryChange, productCount }) => {
  const [data, setData] = useState([]);

  const fetchData = async (setData) => {
    const url = "https://api.furrl.in/api/v2/listing/getListingFilters";
    const payload = { id: "#HomeHunts", entity: "vibe" };

    try {
      const response = await axios.post(url, payload);
      setData(response.data.data.getListingFilters.easyFilters);
      // console.log(response.data.data.getListingFilters.easyFilters);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData(setData);
  }, []);

  return (
    <section>
      <div className="mb-4">
        <p className="text-[#64748b] text-xs italic">{ productCount } Products</p>
      </div>

      <div>
        {data.length > 0 && (
          <div className="flex w-full overflow-x-auto no-scrollbar gap-2">
            <button
              className={`whitespace-nowrap rounded-full px-4 py-1 text-sm ${
                cat === "All"
                  ? "bg-[#7e59e7] text-white"
                  : "border border-1 border-[#cbd5e1]"
              }`}
              onClick={() => handleCategoryChange(null, "All", null)}
            >
              All
            </button>
            {data.map((category, index) => (
              <button
                key={index}
                className={`whitespace-nowrap ${
                  cat === category.name
                    ? "bg-[#7e59e7] text-white"
                    : "border border-1 border-[#cbd5e1]"
                } rounded-full px-4 py-1 text-sm`}
                onClick={() =>
                  handleCategoryChange(
                    category.contentType,
                    category.name,
                    category.uniqueId
                  )
                }
              >
                {category.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Filters;
