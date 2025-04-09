import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAssetForCategory,
  setColorForCategory,
  setCurrentCategory,
} from "../store/CustomizationStore";

const AssetsBox = () => {
  const dispatch = useDispatch();
  const currentCategory = useSelector(
    (state) => state.customization.currentCategory
  );
  const customization = useSelector(
    (state) => state.customization.customization
  );
  const categories = useSelector((state) => state.customization.categories);

  const handleCategoryChange = (category) => {
    dispatch(setCurrentCategory(category));
  };

  const handleAssetSelect = (asset) => {
    dispatch(setAssetForCategory({ category: currentCategory, asset }));
  };

  return (
    <div className="rounded-t-lg bg-gradient-to-br from-black/30 to-indigo-900/20 drop-shadow-md p-6 gap-6 flex flex-col">
      <div className="flex flex-wrap items-center gap-6 pointer-events-auto px-6 pb-2">
     

        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryChange(category)}
            className={`transition-colors duration-200 font-medium flex-shrink-0 border-b ${
              currentCategory.name === category.name
                ? "text-white shadow-purple-100 border-b-white"
                : "text-gray-200 hover:text-gray-500 border-b-transparent"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
      <div className="flex gap-2 flex-wrap">
      {currentCategory.removable && (
       <button
       onClick={() => handleAssetSelect(null)}
       className={`w-20 h-20 rounded-xl overflow-hidden pointer-events-auto hover:opacity-100 transition-all border-2 duration-300 bg-gradient-to-tr 
         ${
           !customization[currentCategory.name].asset
             ? "border-white  from-white/20 to-white/30"
             : "from-black/70 to-black/20 border-black"
         }`}
     >
       <div className="w-full h-full flex items-center justify-center bg-black/40 text-white">
         <svg
           xmlns="http://www.w3.org/2000/svg"
           fill="none"
           viewBox="0 0 24 24"
           strokeWidth={1.5}
           stroke="currentColor"
           className="size-8"
         >
           <path
             strokeLinecap="round"
             strokeLinejoin="round"
             d="M6 18 18 6M6 6l12 12"
           />
         </svg>
       </div>
     </button>
        )}
        {currentCategory?.assets.map((asset) => (
          <button
            onClick={() => handleAssetSelect(asset)}
            key={asset.thumbnail}
            className={`w-20 h-20 rounded-md overflow-hidden bg-gray-200 pointer-events-auto hover:opacity-100 transition-all border-2 duration-300 bg-gradient-to-tr 
                ${
                  customization[currentCategory.name]?.asset?.id === asset.id
                    ? "border-white  from-white/20 to-white/30"
                    : "  from-black/70 to-black/20 border-black"
                }
                `}
          >
            <img className="object-cover w-full h-full" src={asset.thumbnail} />
          </button>
        ))}
      </div>
    </div>
  );
};

const DownloadButton = () => {
  const setDownloadFun = useSelector((state) => state.customization.download);

  return (
    <button
      onClick={setDownloadFun}
      className="rounded-lg bg-indigo-500 hover:bg-indigo-600 transition-colors duration-300 text-white font-medium px-4 py-3 pointer-events-auto"
    >
      Download
    </button>
  );
};

export const UI = () => {
  const currentCategory = useSelector(
    (state) => state.customization.currentCategory
  );

  return (
    <main className="pointer-events-none fixed z-10 inset-0  select-none">
      <div className="mx-auto h-full max-w-screen-xl w-full flex flex-col justify-between">
        <div className="flex justify-between items-center p-10">
          <a
            className="pointer-events-auto"
            href="https://lessons.wawasensei.dev/courses/react-three-fiber"
          >
            {/* <img className="w-20" src="/images/wawasensei-white.png" /> */}
          </a>
          <DownloadButton />
        </div>
        <div className="px-10 flex flex-col ">
          {currentCategory?.colors && <ColorPicker />}
          <AssetsBox />
        </div>
      </div>
    </main>
  );
};

const ColorPicker = () => {
  const dispatch = useDispatch();
  const currentCategory = useSelector(
    (state) => state.customization.currentCategory
  );
  const handleColorChange = (color) => {
    dispatch(setColorForCategory({ category: currentCategory, color: color }));
  };
  const customization = useSelector(
    (state) => state.customization.customization
  );

  if (!customization[currentCategory.name]?.asset) {
    return null;
  }
  return (
    <div className="noscrollbar pointer-events-auto relative flex gap-2 max-w-full overflow-x-auto backdrop-blur-sm py-2 drop-shadow-md">
      {currentCategory.colors.map((color, index) => (
        <button
          key={`${index}-${color}`}
          className={`w-10 h-10 p-1.5 drop-shadow-md bg-black/20 shrink-0 rounded-lg overflow-hidden transition-all duration-300 border-2
             ${
               customization[currentCategory.name].color === color
                 ? "border-white"
                 : "border-transparent"
             }
          `}
          onClick={() => handleColorChange(color)}
        >
          <div
            className="w-full h-full rounded-md"
            style={{ backgroundColor: color }}
          />
        </button>
      ))}
    </div>
  );
};
