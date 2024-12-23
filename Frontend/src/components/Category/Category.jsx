import { CategoryContext } from "../CategoryProvider";
import { useContext } from "react";
import { Link } from "react-router-dom";

const Category = () => {
  //custom hook for getting categories from database
  const { categories, isCategoryLoading } = useContext(CategoryContext);
  if (isCategoryLoading) return <div className="mt-20">Loading...</div>;
  return (
    <>
      <div className="mt-24 flex flex-col items-center gap-y-4">
        <div className="text-5xl font-bold">
          <span>Shop By Category</span>
        </div>
        <div>
          <span className="text-xl text-[#999898]">
            Explore our wide range of products across various categories
          </span>
        </div>
        <div className="flex flex-wrap justify-evenly  w-[95%] p-4 gap-y-4 gap-x-2">
          {categories.map((category) => {
            return (
              <Link
                to={`/products/${category.name}`}
                key={category._id}
                className="w-[25rem] h-[8rem] bg-[#4a38eb7f]  flex justify-center items-center rounded-md cursor-pointer hover:text-white hover:bg-[#1715257f]"
              >
                <span className="text-2xl ">{category.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default Category;
