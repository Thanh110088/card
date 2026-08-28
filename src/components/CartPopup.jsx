import { Link } from "react-router-dom";
import styles from "./CartPopup.module.css";
import { useCart } from "@/contexts/cart/CartContext";

export default function CartPopup() {
  const { state, removeFromCart, updateQuantity, totalPrice } = useCart();

  return (
    <div className={styles.popup}>
      <div className={styles.header}>Giỏ hàng ({state.items.length})</div>

      <div className={styles.body}>
        {state.items.map((item) => (
          <div key={item.id} className={styles.item}>
            <img
              src={item.thumbnail}
              alt={item.title}
              className={styles.thumb}
            />
            <div className={styles.info}>
              <h4 className={styles.title}>{item.title}</h4>
              <p className={styles.price}>
                {(item.price * item.quantity).toLocaleString()}₫
              </p>
              <div className={styles.quantity}>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  −
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
            <button
              className={styles.remove}
              onClick={() => removeFromCart(item.id)}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <div className={styles.total}>
          <span>Tổng tiền:</span>
          <strong>{totalPrice.toLocaleString()}₫</strong>
        </div>
        <Link to="/cart" className={styles.viewCart}>
          Xem giỏ hàng
        </Link>
      </div>
    </div>
  );
}
