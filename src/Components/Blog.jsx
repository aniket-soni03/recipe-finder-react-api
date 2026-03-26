import React from "react";
import "./styles/Blog.css";

// Importing local images 
import indian from "../assets/blog-images/indian-dishes.jpg";
import breakfast from "../assets/blog-images/healthy-breakfast.jpg";
import paneer from "../assets/blog-images/paneer-dishes.jpg";
import drinks from "../assets/blog-images/summer-drinks.jpg";

const Blog = () => {
  const blogs = [
    {
      title: "Top 10 Indian Dishes You Must Try",
      desc: "From butter chicken to masala dosa — explore the most loved dishes of India that define its diverse flavors.",
      img: indian,
    },
    {
      title: "5 Healthy Breakfast Ideas",
      desc: "Start your morning with energy — check out these quick, nutritious breakfast recipes loved by foodies.",
      img: breakfast,
    },
    {
      title: "Secrets of Perfect Paneer Dishes",
      desc: "Make restaurant-style paneer butter masala at home with simple tips for texture and flavor.",
      img: paneer,
    },
    {
      title: "Refreshing Summer Drinks",
      desc: "Beat the heat with these easy homemade drinks — from mango lassi to iced mint lemonade.",
      img: drinks,
    },
  ];

  return (
    <section className="blog-section">
      <h2 className="blog-title">📰 Latest Food Tips & Articles</h2>

      <div className="blog-grid">
        {blogs.map((b, i) => (
          <div key={i} className="blog-card" data-aos="fade-up">
            <div className="blog-img-wrap">
              <img src={b.img} alt={b.title} className="blog-img" />
            </div>
            <div className="blog-content">
              <h3>{b.title}</h3>
              <p>{b.desc}</p>
              <button className="read-more-btn">Read More</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Blog;
