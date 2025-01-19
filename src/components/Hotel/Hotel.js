import React from 'react';

const Hotel = ({ title, description, price, image, openNow, showOpenNowBadge }) => {
  return (
    <div className="basis-1/3 w-full border border-gray-100 dark:border-gray-600 rounded-md pr-0 md:mx-4 mt-6">
      <div className="flex flex-col relative">
        <img
          src={image}
          className="w-full relative z-10 max-h-80"
          alt={title}
        />
        {/* Only display the badge if showOpenNowBadge is true */}
        {showOpenNowBadge && openNow !== undefined && (
          <div
            className={`absolute z-20 px-3 py-1 top-3 right-3 text-white text-sm ${
              openNow ? 'bg-emerald-600' : 'bg-red-600'
            }`}
          >
            {openNow ? "Open Now" : "Closed"}
          </div>
        )}
      </div>
      <div className="flex flex-col px-4">
        <h1 className="text-2xl my-2 md:text-3xl font-bold text-gray-600">
          {title}
        </h1>
        <p className="text-sm mb-3 text-gray-500">{description}</p>
      </div>
      <div className="flex flex-row py-3 px-4 border-t border-gray-100 dark:border-gray-600">
        <div className="w-1/2 flex flex-row dark:text-gray-400">{price}</div>
        <div className="w-1/2 text-yellow-400 text-right font-semibold">
          ★★★☆☆
        </div>
      </div>
    </div>
  );
};

export default Hotel;
