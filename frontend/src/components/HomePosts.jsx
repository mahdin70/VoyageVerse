/* eslint-disable react/prop-types */
import { IF } from "../url";

const HomePosts = ({ post }) => {
  return (
    <div className="border-solid border-2 rounded-lg hover:border-blue-800  w-full flex mt-4 space-x-4 p-3">
      {/* left */}
      <div className="w-[35%] h-[200px] flex justify-center items-center">
        <img
          src={IF + (post.photo || "")}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
      {/* right */}
      <div className="flex flex-col w-[65%]">
        <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">
          {post.title}
        </h1>
        <div className="flex mb-2 text-sm font-semibold items-center justify-between md:mb-4">
          <div className="bg-black text-white rounded-full px-3 py-1">
            @{post.username}
          </div>
          <div className="flex space-x-2 text-sm text-black-800">
            <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
            <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
          </div>
        </div>
        <p className="text-md md:text-md">
          {post.desc.slice(0, 200) + " ...Read more"}
        </p>
      </div>
    </div>
  );
};

export default HomePosts;
