// Question -:
// I have to display all images in UI that could filter based on tags (which are again dynamic in nature ).
// And on click on any image model should display image title and image and date in MM/DD/YY format.
// //Api
// allImagesApi - [
// {link : imageURl1, id:1, title: image1 tags:[nature, bird]},
// {link : imageURl2, id:2, title: image12, tags:[nature], }],
// ]
// ImageByIdAPI = {id:1, title: image1,toTake: "Date format" content: blabla, }

"use client";
import React, { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState();

  const fetchData = async (url) => {
    try {
      const res = await fetch(url);
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData(url);
  }, []);

  return [data];
};

const ProductModal = ({ setOpen, seletectedProduct }) => {
  const id = parseInt(seletectedProduct);
  const [data] = useFetch(`https://dummyjson.com/products/${id}`);
  return (
    <div
      className="modal__overlay"
      onClick={() => {
        setOpen((prev) => !prev);
      }}
    >
      <div className="modal__container" onClick={(e) => e.stopPropagation()}>
        <div className="modal__content">
          <button
            className="cross"
            type="button"
            onClick={() => {
              setOpen((prev) => !prev);
            }}
          >
            &times;
          </button>
          <img src={data?.images} alt={data?.title} className="product-img" />
          <p style={{ textAlign: "center" }}>{data?.title}</p>
          <p style={{ textAlign: "center" }}>Date : {"YY/MM/DD"}</p>
        </div>
      </div>
    </div>
  );
};

const ProductCard = ({ imgUrl, title, id }) => {
  return (
    <div className="product-item">
      <img src={imgUrl} alt={title} className="product-img" id={id} />
      <p>{title}</p>
    </div>
  );
};

const ProductWidget = () => {
  const [data] = useFetch("https://dummyjson.com/products?limit=30");
  const [open, setOpen] = useState(false);

  const [tagedItem, setTagedItem] = useState([]);
  const [seletectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = (items) => {
    const res = items.filter((item) => tagedItem.includes(item));
    if (tagedItem.length === 0 || res?.length !== 0) return 1;
    return 0;
  };

  const filteredData = data?.products?.filter((item) =>
    filteredProducts(item?.tags)
  );

  const handleCheckbox = (e) => {
    if (e.target.name === undefined) return;
    let tagItem = e.target.name;
    setTagedItem((prev) => {
      if (prev.includes(tagItem)) {
        prev = prev.filter((item) => item !== tagItem);
      } else {
        prev = [...prev, tagItem];
      }
      return prev;
    });
  };

  const handleProductClick = (e) => {
    setSelectedProduct(e.target.id);
    setOpen((prev) => !prev);
  };

  return (
    <>
      <p style={{ textAlign: "center", padding: "30px 0" }}>
        Total Products : {filteredData?.length}
      </p>
      <div
        className="checkbox__container"
        onClick={(e) => {
          handleCheckbox(e);
        }}
      >
        <div>
          <input type="checkbox" name="fruits" id="fruits" />
          <label htmlFor="fruits">Fruits</label>
        </div>
        <div>
          <input type="checkbox" name="vegetables" id="vegetables" />
          <label htmlFor="vegetables">Vegetables</label>
        </div>
        <div>
          <input type="checkbox" name="seafood" id="seafood" />
          <label htmlFor="seafood">Seafood</label>
        </div>
      </div>
      <div className="products-container" onClick={handleProductClick}>
        {filteredData?.map((item) => {
          return (
            <ProductCard
              key={item?.id}
              imgUrl={item?.images[0]}
              title={item?.title}
              id={item?.id}
            />
          );
        })}
      </div>
      {open && (
        <ProductModal setOpen={setOpen} seletectedProduct={seletectedProduct} />
      )}
    </>
  );
};

export default ProductWidget;
