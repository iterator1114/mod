"use client";
import React, { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState();

  const fetchdata = async (url) => {
    try {
      const res = await fetch(url);
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchdata(url);
  }, [url]);

  return [data];
};

const ProductCard = ({ imgUrl, title }) => {
  return (
    <div className="product">
      <img src={imgUrl} alt={title} className="product__img" />
      <p className="product__title">{title}</p>
    </div>
  );
};

const Pagination = ({ pages, activePage, setActivePage }) => {
  const incrementPage = () => {
    setActivePage(activePage + 1);
  };
  const decrementPage = () => {
    setActivePage(activePage - 1);
  };

  return (
    <div className="page__container">
      <button
        className="page__number"
        onClick={decrementPage}
        type="button"
        disabled={activePage === 1}
      >
        {"<"}
      </button>
      {Array.from({ length: pages }, (_, i) => i + 1).map((item) => (
        <span
          key={item}
          className="page__number"
          style={
            activePage === item
              ? { backgroundColor: "orange" }
              : { backgroundColor: "#fff" }
          }
          onClick={() => {
            setActivePage(item);
          }}
        >
          {item}
        </span>
      ))}
      <button
        className="page__number"
        onClick={incrementPage}
        type="button"
        disabled={activePage === pages}
      >
        {">"}
      </button>
    </div>
  );
};

const ProductWidget = () => {
  const [activePage, setActivePage] = useState(1);

  const [data] = useFetch("https://dummyjson.com/products");
  const PAGE_LIMIT = 6;
  const TOTAL_PRODUCT = data?.products?.length;
  const PAGES = Math.ceil(TOTAL_PRODUCT / PAGE_LIMIT);
  const start = (activePage - 1) * PAGE_LIMIT;
  const end = activePage * PAGE_LIMIT;
  return (
    <>
      <div className="product__container">
        {data &&
          data?.products &&
          data?.products
            ?.slice(start, end)
            ?.map((product) => (
              <ProductCard
                imgUrl={product?.images?.[0]}
                title={product?.title}
                key={product?.id}
              />
            ))}
      </div>
      <Pagination
        pages={PAGES}
        activePage={activePage}
        setActivePage={setActivePage}
      />
    </>
  );
};

export default ProductWidget;
