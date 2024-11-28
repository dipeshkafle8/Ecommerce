import React, { useState, useEffect } from "react";
import { ChevronsLeft, ChevronsRight, Filter } from "lucide-react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Slider } from "../ui/slider";
import { Input } from "../ui/input";
import axios from "axios";
import fetchDataFromAPI from "../fetchDataFromAPI";

// eslint-disable-next-line react/prop-types
const FilteredProducts = React.memo(({ setProducts, setIsLoading }) => {
  const [categories, setCategories] = useState([]); //for getting all categories
  const [isBarHidden, setIsBarHidden] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [isCategoryLoading, setIsCategoryLoading] = useState(true);

  //fetching the category from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await fetchDataFromAPI(
          "http://localhost:3000/api/v1/category/getCategory"
        );
        if (result.status) setCategories(result.responseData.category);
      } catch (err) {
        console.log("Error in getting categories" + err);
      } finally {
        setIsCategoryLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = (name) => {
    const category = name;
    setSelectedCategories((prevSelectedCategories) => {
      //if already in selected remove add otherwise
      return prevSelectedCategories.includes(category)
        ? prevSelectedCategories.filter((c) => c !== category)
        : [...prevSelectedCategories, category];
    });
  };

  const handlePriceChange = (newValue) => {
    setPriceRange(newValue);
  };

  const applyFilters = async () => {
    console.log("Button trigreed");
    setIsLoading(true);
    const data = {
      categories: selectedCategories,
      priceRange,
    };
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/products/filter",
        data
      );
      if (response.data.status) {
        setProducts(response.data.products);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMinPriceChange = (event) => {
    const newMinPrice = +event.target.value; // '+' converts strings into number "123" to 123
    setPriceRange([newMinPrice, priceRange[1]]);
  };

  const handleMaxPriceChange = (event) => {
    const newMaxPrice = +event.target.value;
    setPriceRange([priceRange[0], newMaxPrice]);
  };
  if (isCategoryLoading) {
    return <div>Loading......</div>;
  }

  return (
    <>
      {!isBarHidden ? (
        <div className="p-4 ml-2 sticky top-20 flex flex-col h-[7rem] w-[19rem] border-2 border-[rgba(108,108,108,0.4)] md:w-[20rem] md:h-[32rem] rounded-sm shadow-lg cursor-pointer">
          <span className="text-center text-xl font-semibold">
            <Filter className="w-8 inline" /> Filtering
          </span>
          {/* filter category */}
          <div className="flex flex-col gap-y-2">
            <h2 className="text-xl font-bold">Categories:</h2>
            {categories.map((category) => (
              <div key={category._id}>
                <Checkbox
                  checked={selectedCategories.includes(category._id)}
                  onCheckedChange={() => handleCategoryChange(category._id)}
                  name={category._id}
                />
                <label htmlFor={category.name}>{category.name}</label>
              </div>
            ))}
          </div>
          {/* price filtering */}
          <div>
            <h2 className=" mt-2 text-xl font-bold">Select Price Range</h2>
            <div className="flex m-4">
              <label htmlFor="min-price">Min:</label>
              <Input
                id="min"
                value={priceRange[0]}
                onChange={handleMinPriceChange}
              />

              <label htmlFor="max-price">Max:</label>
              <Input
                id="max"
                value={priceRange[1]}
                onChange={handleMaxPriceChange}
              />
            </div>
            <Slider
              value={priceRange}
              onValueChange={handlePriceChange}
              min={0}
              max={50000}
              step={100}
              range={true}
              className="horizontal-slider"
            />
          </div>
          <div className="text-center m-4">
            <Button onClick={applyFilters}>Apply Filter </Button>
          </div>
        </div>
      ) : null}
      <button
        onClick={() => setIsBarHidden(!isBarHidden)}
        className={`sticky top-20 h-8 inline px-4 border-2 border-[rgba(108,108,108,0.4)] hover:bg-blue-100 rounded-sm ${
          isBarHidden ? "left-0" : "left-[20rem]"
        }`}
      >
        {isBarHidden ? (
          <ChevronsRight className="w-4" />
        ) : (
          <ChevronsLeft className="w-4" />
        )}
      </button>
    </>
  );
});

export default FilteredProducts;
