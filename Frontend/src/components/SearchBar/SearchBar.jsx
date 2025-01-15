import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false); //if cursor on the input box then only display suggestion
  const Navigate = useNavigate();
  //while rerendering it will not create new function each time create only when query changes
  const fetchSuggestions = useCallback(async () => {
    if (query.trim() === "") {
      setSuggestions([]);
      return;
    }
    setIsLoading(true);
    try {
      let response = await axios.get(
        "http://localhost:3000/api/v1/products/search",
        {
          params: { query },
        }
      );
      if (response.data.status === 1) {
        setSuggestions(response.data.suggestions);
      } else {
        console.log(response.data.msg);
      }
    } catch (err) {
      console.log("Error in performing debouncing");
    } finally {
      setIsLoading(false);
    }
  }, [query]);

  //   we are using fetchSuggestion as dependency in useEffect because we want to get updated
  //   fetchSuggestion while we operate on useEffect (search if want clarity)

  //Stale Closure
  // A stale closure in JavaScript (and React) refers to a situation where a function captures old variables from its lexical scope
  // (i.e., the scope in which it was created) rather than the latest values.

  useEffect(() => {
    const debounceFetch = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceFetch);
  }, [query, fetchSuggestions]);

  //while navigating to the products
  const handleSearch = (to_Search) => {
    Navigate(`/products?search=${to_Search}`);
  };

  //if clicked on product on suggestion
  const handleOnProductClick = (name) => {
    setQuery(name);
    handleSearch(name);
  };
  //if enter is clicked
  const handleKeyPress = (e) => {
    if (e.key == "Enter") {
      handleSearch(query);
    }
  };

  return (
    <>
      <div className="relative flex item-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyUp={handleKeyPress}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)} //because suggestion product isn't clicking because in OnBlur we disable the visibility
          placeholder="Search products..."
          className="w-full pr-12 pl-4 py-2 h-10 text-sm rounded-md border-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-colors duration-200"
        />

        <Button
          onClick={() => handleSearch(query)}
          variant="default"
          size="icon"
          className="relative right-8 top-[0.25rem] h-8 w-8 bg-blue-900 hover:bg-[#31315e] rounded-md"
        >
          <Search className="h-4 w-4 text-white" />
        </Button>
        {isLoading ? (
          <div className="absolute right-[1.5rem] top-12 bg-white w-full p-2 border-2 border-[rgba(168,167,167,0.1)] rounded-md text-center">
            <ClipLoader size={15} />
          </div>
        ) : null}
        {!isLoading && suggestions.length > 0 && isFocused ? (
          <div className="absolute right-[1.5rem] top-[2.48rem] bg-white w-[90%] p-2 border-2 border-[rgba(168,167,167,0.1)] rounded-md">
            <ul className="flex flex-col ">
              {suggestions.map((product) => {
                return (
                  <li key={product._id}>
                    <button
                      onClick={() => handleOnProductClick(product.name)}
                      className="flex w-full hover:bg-[#e5ebf4d7] p-2"
                    >
                      <img src={product.images[0]} className="w-8 mr-2" />
                      <span>{product.name}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}
      </div>
    </>
  );
};
export default SearchBar;
