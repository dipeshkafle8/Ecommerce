import backImg from "./images/background.jpg";
import DisplayFamousProduct from "./DisplayFamousProduct";
function FrontPage() {
  return (
    <>
      <main>
        <div className="relative mt-24">
          <img
            src={backImg}
            alt="background image"
            className="w-[94rem] h-[34rem] m-auto"
          />
          <div className=" absolute flex flex-col justify-center items-center md:w-[94rem] bg-slate-950 inset-0 m-auto bg-opacity-50 hover:bg-opacity-60 text-white">
            <span className="text-7xl font-bold mb-4">Welcome to ShopNow</span>
            <p className="text-xl font-semibold">
              Your one-stop shop for all your needs.
            </p>
            <button className="py-2 px-8 bg-[#e02aaa] mt-4 rounded-md text-lg hover:bg-[#902e73] font-semibold">
              ShopNow
            </button>
          </div>
        </div>
        <DisplayFamousProduct />
      </main>
    </>
  );
}
export default FrontPage;
