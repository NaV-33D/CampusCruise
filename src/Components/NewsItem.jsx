import React from "react";

const NewsItem = ({ title, description, imageUrl, newsUrl, author, date }) => {
  return (
    <div className="relative h-full flex flex-col overflow-hidden rounded-lg bg-black/90 shadow-md max-w-[400px]">
      <img
        src={
          imageUrl
            ? imageUrl
            : "https://via.placeholder.com/400x200.png?text=No+Image"
        }
        className="w-[90%] h-28 object-cover m-2 rounded-lg"
        alt="news"
      />
      <div className="p-4 flex flex-col justify-between flex-grow">
        <h5 className="font-bold text-lg">{title}</h5>
        <p className="text-sm mt-2">{description}</p>
        <p className="text-xs text-gray-500 mt-2">
          by {author ? author : "Unknown"} on {new Date(date).toDateString()}
        </p>
        <a
          href={newsUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-block text-blue-600 hover:underline"
        >
          Read More
        </a>
      </div>
    </div>
  );
};

export default NewsItem;
