import pr from "./products.module.css";
import { useState, useEffect } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch("http://localhost:3000/products");
      const data = await response.json();
      setProducts(data);
    }
    fetchProducts();
  }, []);

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(category)
        ? prevSelected.filter((cat) => cat !== category)
        : [...prevSelected, category]
    );
  };

  const sortProducts = (products) => {
    if (sortOption === "priceAsc") {
      return products.sort((a, b) => a.price - b.price);
    } else if (sortOption === "priceDesc") {
      return products.sort((a, b) => b.price - a.price);
    } else {
      return products;
    }
  };

  const filterProducts = (products) => {
    if (selectedCategories.length === 0) {
      return products;
    }
    return products.filter((product) =>
      selectedCategories.includes(product.category)
    );
  };

  const filteredProducts = filterProducts(products);
  const sortedProducts = sortProducts(filteredProducts);

  return (
    <div className={pr.page}>
      <div className={pr.ProductsContainer}>
        <ul className={pr.cards}>
          {sortedProducts.map((p) => (
            <li className={pr.card} key={p.id}>
              <img src="https://placehold.co/300x300" alt="img" />
              <p className={pr.title}>{p.name}</p>
              <p className={pr.desc}>{p.description}</p>
              <p className={pr.price}>{`$${p.price}`}</p>
              <div className={pr.button}>
                <button>Add to Cart</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <aside className="aside">
        <h2 className="catTitle">Categories</h2>
        <div className="check">
          <input
            type="checkbox"
            value="Electronics"
            id="el"
            onChange={handleCategoryChange}
          />
          <label htmlFor="el">Electronics</label>
        </div>
        <div className="check">
          <input
            type="checkbox"
            value="Home & Kitchen"
            id="hm"
            onChange={handleCategoryChange}
          />
          <label htmlFor="hm">Home & Kitchen</label>
        </div>
        <div className="check">
          <input
            type="checkbox"
            value="Sports & Outdoors"
            id="so"
            onChange={handleCategoryChange}
          />
          <label htmlFor="so">Sports & Outdoors</label>
        </div>
        <div className="check">
          <input
            type="checkbox"
            value="Accessories"
            id="ac"
            onChange={handleCategoryChange}
          />
          <label htmlFor="ac">Accessories</label>
        </div>

        <h2 className="catTitle">SORT BY</h2>
        <div className="priceLev">
          <input
            type="radio"
            name="sortPrice"
            value="priceDesc"
            id="prcUp"
            onChange={handleSortChange}
          />
          <label htmlFor="prcUp">Price - From highest to lowest</label>
        </div>
        <div className="priceLev">
          <input
            type="radio"
            name="sortPrice"
            value="priceAsc"
            id="prcDown"
            onChange={handleSortChange}
          />
          <label htmlFor="prcDown">Price - From lowest to highest</label>
        </div>
      </aside>
    </div>
  );
};

export default Products;
