import axios from "axios";
import React, { useEffect, useState } from "react";

const Menu = ({ category }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/posts/?cat=${category}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        setPosts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [category]);
  // const posts = [
  //   {
  //     id: 1,
  //     title: "Lorem Ipsum",
  //     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  //     img: "https://images.pexels.com/photos/1429567/pexels-photo-1429567.jpeg",
  //   },
  //   {
  //     id: 2,
  //     title: "Lorem Ipsum",
  //     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  //     img: "https://images.pexels.com/photos/956981/milky-way-starry-sky-night-sky-star-956981.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //   },
  //   {
  //     id: 3,
  //     title: "Lorem Ipsum",
  //     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  //     img: "https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //   },
  //   {
  //     id: 4,
  //     title: "Lorem Ipsum",
  //     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  //     img: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //   },
  //   {
  //     id: 5,
  //     title: "Lorem Ipsum",
  //     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  //     img: "https://images.pexels.com/photos/1429567/pexels-photo-1429567.jpeg",
  //   },
  //   {
  //     id: 6,
  //     title: "Lorem Ipsum",
  //     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  //     img: "https://images.pexels.com/photos/1429567/pexels-photo-1429567.jpeg",
  //   },
  //   {
  //     id: 7,
  //     title: "Lorem Ipsum",
  //     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  //     img: "https://images.pexels.com/photos/1429567/pexels-photo-1429567.jpeg",
  //   },
  //   {
  //     id: 8,
  //     title: "Lorem Ipsum",
  //     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  //     img: "https://images.pexels.com/photos/1429567/pexels-photo-1429567.jpeg",
  //   },
  //   {
  //     id: 9,
  //     title: "Lorem Ipsum",
  //     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  //     img: "https://images.pexels.com/photos/1429567/pexels-photo-1429567.jpeg",
  //   },
  //   {
  //     id: 10,
  //     title: "Lorem Ipsum",
  //     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  //     img: "https://images.pexels.com/photos/1429567/pexels-photo-1429567.jpeg",
  //   },
  // ];
  return (
    <div className="menu">
      <h1>Other posts you may like</h1>
      {posts.map((post) => (
        <div className="post" key={post.id}>
          <img src={`../upload/${post.img}`} alt="" />
          <h2>{post.title}</h2>
          <button>Read More</button>
        </div>
      ))}
    </div>
  );
};

export default Menu;
