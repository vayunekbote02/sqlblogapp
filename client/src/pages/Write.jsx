import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

const Write = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.desc || "");
  const [title, setTitle] = useState(state?.title || "");
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState(state?.category || "");

  const navigate = useNavigate();

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post(
        `http://localhost:8080/api/upload`,
        formData
      );
      return res.data;
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();

    try {
      state
        ? await axios.put(
            `http://localhost:8080/api/posts/${state.id}`,
            {
              title,
              desc: value,
              img: file && imgUrl,
              category,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }
          )
        : await axios.post(
            `http://localhost:8080/api/posts/`,
            {
              title,
              desc: value,
              img: file ? imgUrl : "",
              category,
              date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }
          );
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editorContainer">
          <ReactQuill
            theme="snow"
            value={value}
            onChange={setValue}
            style={{ height: "300px" }}
          />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            name=""
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label style={{ marginTop: "5px", cursor: "pointer" }} htmlFor="file">
            Upload Image
          </label>
          <div className="buttons">
            <button>Save as draft</button>
            <button onClick={handleSubmit}>Publish</button>
          </div>
        </div>
        <div className="cat">
          <h1>Category</h1>
          <div>
            <input
              type="radio"
              checked={category === "art"}
              name="cat"
              value="art"
              id="art"
              onChange={(e) => setCategory(e.target.value)}
            />
            <label htmlFor="art">Art</label>
            <br />
            <input
              type="radio"
              checked={category === "science"}
              name="cat"
              value="science"
              id="science"
              onChange={(e) => setCategory(e.target.value)}
            />
            <label htmlFor="science">Science</label>
            <br />
            <input
              type="radio"
              checked={category === "technology"}
              name="cat"
              value="technology"
              id="technology"
              onChange={(e) => setCategory(e.target.value)}
            />
            <label htmlFor="technology">Technology</label>
            <br />
            <input
              type="radio"
              checked={category === "cinema"}
              name="cat"
              value="cinema"
              id="cinema"
              onChange={(e) => setCategory(e.target.value)}
            />
            <label htmlFor="cinema">Cinema</label>
            <br />
            <input
              type="radio"
              checked={category === "design"}
              name="cat"
              value="design"
              id="design"
              onChange={(e) => setCategory(e.target.value)}
            />
            <label htmlFor="design">Design</label>
            <br />
            <input
              type="radio"
              checked={category === "food"}
              name="cat"
              value="food"
              id="food"
              onChange={(e) => setCategory(e.target.value)}
            />
            <label htmlFor="food">Food</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
