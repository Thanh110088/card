import { useCart } from "@/contexts/cart/CartContext";
import { useEffect, useState } from "react";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products?limit=12");
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className={styles.loading}>Đang tải sản phẩm...</div>;
  }

  if (products.length === 0) {
    return <div className={styles.empty}>Không có sản phẩm nào</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Top sản phẩm hot</h1>

      <div className={styles.productGrid}>
        {products.map((product) => (
          <div key={product.id} className={styles.productCard}>
            <img
              src={product.thumbnail}
              alt={product.title}
              className={styles.thumbnail}
              loading="lazy"
            />

            <div className={styles.info}>
              <h2 className={styles.productTitle}>{product.title}</h2>
              <p className={styles.price}>${product.price}</p>

              <button
                className={styles.addButton}
                onClick={() => addToCart(product)}
              >
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
