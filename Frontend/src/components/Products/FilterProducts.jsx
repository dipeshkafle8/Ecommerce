import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ChevronsLeft, ChevronsRight, Filter } from "lucide-react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Slider } from "../ui/slider";
import { Input } from "../ui/input";
import axios from "axios";
import { CategoryContext } from "../CategoryProvider";
import Products from "./Products";
// eslint-disable-next-line react/prop-types
const FilteredProducts = () => {
  const { categories } = useContext(CategoryContext);
  const [isBarHidden, setIsBarHidden] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [isButtonClicked, setIsButtonClicked] = useState(0); //to perform fetch when button in clicked

  const { category } = useParams();
  console.log("rendering");
  //if came through category page include into the selectedCategories
  useEffect(() => {
    if (category) {
      const categoryObj = categories.find((cat) => cat.name === category);
      if (categoryObj && !selectedCategories.includes(categoryObj._id)) {
        setSelectedCategories((prevSelectedCategories) => [
          ...prevSelectedCategories,
          categoryObj._id,
        ]);
      }
    }
  }, []);

  const handleCategoryChange = (id) => {
    const category = id;

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
    setIsButtonClicked((prev) => prev + 1);
  };

  const handleMinPriceChange = (event) => {
    const newMinPrice = +event.target.value; // '+' converts strings into number "123" to 123
    setPriceRange([newMinPrice, priceRange[1]]);
  };

  const handleMaxPriceChange = (event) => {
    const newMaxPrice = +event.target.value;
    setPriceRange([priceRange[0], newMaxPrice]);
  };
  console.log(selectedCategories);

  return (
    <>
      <div className="mt-28 flex flex-col md:flex-row">
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
        <Products
          filterButton={isButtonClicked}
          filterData={{ categories: selectedCategories, priceRange }}
        />
      </div>
    </>
  );
};

export default FilteredProducts;
