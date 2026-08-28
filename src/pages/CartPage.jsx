import { Link } from "react-router-dom";
import styles from "./CartPage.module.css";
import { useCart } from "@/contexts/cart/CartContext";

export default function CartPage() {
  const {
    state: { items },
    removeFromCart,
    updateQuantity,
    totalItems,
    totalPrice,
    clearCart,
  } = useCart();

  if (items.length === 0) {
    return (
      <div className={styles.empty}>
        <i className="fa-solid fa-basket-shopping"></i>
        <h2>Giỏ hàng trống</h2>
        <p>Bạn chưa thêm sản phẩm nào</p>
        <Link to="/" className={styles.continueBtn}>
          Tiếp tục mua sắm
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>Giỏ hàng của bạn</div>
      <p className={styles.subtitle}>{totalItems} sản phẩm</p>

      <div className={styles.grid}>
        <div className={styles.itemsCard}>
          {items.map((item) => (
            <div key={item.id} className={styles.itemRow}>
              <img
                src={item.thumbnail}
                alt={item.title}
                className={styles.productImg}
              />
              <div>
                <h3 className={styles.productName}>{item.title}</h3>
                <p className={styles.price}>{item.price.toLocaleString()}₫</p>
              </div>
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
              <div className={styles.totalPrice}>
                {(item.price * item.quantity).toLocaleString()}₫
              </div>
              <button
                className={styles.removeBtn}
                onClick={() => removeFromCart(item.id)}
              >
                Xóa
              </button>
            </div>
          ))}
          <div className={styles.clearAll}>
            <button onClick={clearCart}>Xóa toàn bộ giỏ hàng</button>
          </div>
        </div>

        <div className={styles.summary}>
          <h2 className={styles.summaryTitle}>Tóm tắt đơn hàng</h2>
          <div className={styles.row}>
            <span>Tạm tính ({totalItems} sp)</span>
            <strong>{totalPrice.toLocaleString()}₫</strong>
          </div>
          <div className={styles.row}>
            <span>Phí vận chuyển</span>
            <span className={styles.free}>Miễn phí</span>
          </div>
          <div className={styles.totalRow}>
            <span>Tổng cộng</span>
            <strong className={styles.finalPrice}>
              {totalPrice.toLocaleString()}₫
            </strong>
          </div>
          <Link to="/checkout" className={styles.checkoutBtn}>
            Tiến hành thanh toán
          </Link>
          <Link to="/" className={styles.continueBtn}>
            ← Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    </div>
  );
}
