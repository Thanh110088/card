import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useCart } from "@/contexts/cart/CartContext";
import CartPopup from "./CartPopup";
import styles from "./CartIcon.module.css";

export default function CartIcon() {
  const { totalItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.wrapper}>
      {/* Icon + số lượng */}
      <Link
        to="/cart"
        className={styles.iconLink}
        onMouseEnter={() => setIsOpen(true)}
      >
        <ShoppingCart size={24} className={styles.cartIcon} />
        {totalItems > 0 && (
          <span className={styles.badge}>
            {totalItems > 99 ? "99+" : totalItems}
          </span>
        )}
      </Link>

      {/* Popup khi hover */}
      {isOpen && totalItems > 0 && (
        <div
          className={styles.popupWrapper}
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <CartPopup />
        </div>
      )}
    </div>
  );
}
