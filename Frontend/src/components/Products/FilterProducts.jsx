import { useState, useEffect } from "react";
import { ChevronsLeft, ChevronsRight, Filter } from "lucide-react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import fetchDataFromAPI from "./fetchDataFromAPI";

function FilteredProducts({ products, setProducts }) {
  const [categories, setCategories] = useState([]); //for getting all categories
  const [isBarHidden, setIsBarHidden] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  //fetching the category from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await fetchDataFromAPI(
          "http://localhost:3000/api/v1/category/getCategory"
        );

        console.log(result.category);
        setCategories(result.category);
      } catch (err) {
        console.log("Error in getting categories" + err);
      }
    };
    fetchCategories();
  }, []);

  console.log(selectedCategories);

  const handleCategoryChange = (e, name) => {
    console.log("This" + e);
    const category = name;
    setSelectedCategories((prevSelectedCategories) => {
      //if already in selected remove add otherwise
      return prevSelectedCategories.includes(category)
        ? prevSelectedCategories.filter((c) => c !== category)
        : [...prevSelectedCategories, category];
    });
  };

  return (
    <>
      {!isBarHidden ? (
        <div className=" sticky top-20 flex flex-col h-[5rem] w-[19rem] md:w-[20rem] md:h-[40rem] border-2 border-blue-500">
          <span className="text-center text-xl font-semibold">
            <Filter className="w-8 inline" /> Filtering
          </span>
          <div>
            <h2>Categories:</h2>
            {categories.map((category) => (
              <div key={category._id}>
                <Checkbox
                  checked={selectedCategories.includes(category.name)}
                  onChange={(e) => handleCategoryChange(e, category.name)}
                  name={category.name}
                />
                <label htmlFor={category.name}>{category.name}</label>
              </div>
            ))}
          </div>
          <div>
            <Button>Apply Filter </Button>
          </div>
        </div>
      ) : (
        <div className="w-8"></div>
      )}
      <button
        onClick={() => setIsBarHidden(!isBarHidden)}
        className={`sticky top-20 h-8 inline px-4  border-2 border-blue-600 hover:bg-blue-100 rounded-sm ${
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
}

export default FilteredProducts;
