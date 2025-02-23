"use client";
import { useEffect, useState, useRef } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState([]);

  let cache = useRef(new Map());

  const fetchProduct = async (url) => {
    try {
      const query = url.split("=")[1];
      // console.log(cache);
      if (cache.current.has(query)) {
        // console.log("CACHE: ", query);
        setData(JSON.parse(cache.current.get(query)));
      } else {
        const res = await fetch(url);
        const json = await res.json();
        // console.log("API: ", query);
        cache.current.set(query, JSON.stringify(json));
        setData(json);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProduct(url);
  }, [url]);

  return [data];
};

const Typeahead = () => {
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [data] = useFetch(`https://dummyjson.com/recipes/search?q=${input}`);

  const searchHandler = (e) => {
    setInput(e.target.value);
  };

  const debounce = (fn, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  const highlightText = (text, query) => {
    if (!query) return text;

    const escapeRegex = (string) => {
      return string.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    };

    const escapedQuery = escapeRegex(query);
    const textParts = text.split(new RegExp(`(${escapedQuery})`, "gi"));
    return textParts.map((part, index) =>
      query.toLowerCase() === part.toLowerCase() ? (
        <span style={{ fontWeight: "bold" }} key={index}>
          {part}
        </span>
      ) : (
        <span key={index}>{part}</span>
      )
    );
  };

  const debouncedInput = debounce(searchHandler, 400);

  return (
    <>
      <div className="container">
        <div className="input__container">
          <input
            type="text"
            name="search"
            id="search"
            onChange={(e) => {
              debouncedInput(e);
            }}
            onFocus={() => {
              setShowSuggestions(true);
            }}
            onBlur={() => {
              setShowSuggestions(false);
            }}
            autoComplete="off"
            placeholder="Search a receipe"
          />
          {showSuggestions && (
            <div className="suggestions__container">
              {data?.recipes?.map((item) => (
                <div className="suggestions" key={item?.id}>
                  {highlightText(item?.name, input)}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Typeahead;
