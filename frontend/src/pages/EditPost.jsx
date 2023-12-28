import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { ImCross } from "react-icons/im";
import axios from "axios";
import { URL } from "../url";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
const EditPost = () => {
     const postId = useParams().id;
     const { user } = useContext(UserContext);
     const navigate = useNavigate();
     const [title, setTitle] = useState("");
     const [desc, setDesc] = useState("");
     const [file, setFile] = useState(null);
     const [cat, setCat] = useState("");
     const [cats, setCats] = useState([]);

     const fetchPost = async () => {
       try {
         const res = await axios.get(URL + "/api/posts/" + postId);
         setTitle(res.data.title);
         setDesc(res.data.desc);
         setFile(res.data.photo);
         setCats(res.data.categories);
       } catch (err) {
         console.log(err);
       }
     };

     const handleUpdate = async (e) => {
       e.preventDefault();
       const post = {
         title,
         desc,
         username: user.username,
         userId: user._id,
         categories: cats,
       };

       if (file) {
         const data = new FormData();
         const filename = Date.now() + file.name;
         data.append("img", filename);
         data.append("file", file);
         post.photo = filename;
         try {
           const imgUpload = await axios.post(URL + "/api/upload", data);
           console.log(imgUpload.data)
         } catch (err) {
           console.log(err);
         }
       }


       try {
         const res = await axios.put(URL + "/api/posts/" + postId, post, {
           withCredentials: true,
         });
         navigate("/posts/post/" + res.data._id);
         console.log(res.data)
       } catch (err) {
         console.log(err);
       }
     };

     useEffect(() => {
       fetchPost();
     }, [postId]);

     const deleteCategory = (i) => {
       let updatedCats = [...cats];
       updatedCats.splice(i);
       setCats(updatedCats);
     };

     const addCategory = () => {
       let updatedCats = [...cats];
       updatedCats.push(cat);
       setCat("");
       setCats(updatedCats);
     };
  return (
    <div>
      <Navbar />
      <div className="px-6 md:px-[200px] mt-8">
        <h3 className="font-bold md:text-2xl text-xl mt-8 mb-2">
          Update the Post:{" "}
        </h3>
        <form className="w-full flex flex-col space-y-1 md:space-y-4">
          <p className="font-bold md:text-md text-md mt-1">
            Update Post Title:{" "}
          </p>
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            placeholder="Enter Updated Post Title"
            className="px-4 py-2 outline-none"
          />
          <p className="font-bold md:text-md text-md mt-1">
            Update Images/Videos:{" "}
          </p>
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            className="px-1"
          />
          <p className="font-bold md:text-md text-md mt-1">
            Update Post Categories:{" "}
          </p>
          <div className="flex flex-col">
            <div className="flex items-center space-x-4 md:space-x-4">
              <input
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                className="px-4 py-2 outline-none"
                type="text"
                placeholder="Enter Post Category "
              />
              <div
                onClick={addCategory}
                className="bg-black text-white text-sm px-4 py-2 font-semibold cursor-pointer"
              >
                Add Category
              </div>
            </div>
            <div className="flex mt-3">
              {cats?.map((c, i) => (
                <div
                  key={i}
                  className="flex items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md"
                >
                  <p className="text-black">{c}</p>
                  <p
                    onClick={() => {
                      deleteCategory(i);
                    }}
                    className="text-black cursor-pointer p-1 text-sm flex items-center"
                  >
                    <ImCross />
                  </p>
                </div>
              ))}
            </div>
            <p className="font-bold md:text-md text-md mt-1">
              Update Description:{" "}
            </p>
            <textarea
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
              rows={15}
              cols={30}
              className="px-4 py-2 outline-none mt-4"
              placeholder="Enter post description"
            />
            <button
              onClick={handleUpdate}
              className="bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-lg text-lg mt-4"
            >
              Update
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default EditPost;
