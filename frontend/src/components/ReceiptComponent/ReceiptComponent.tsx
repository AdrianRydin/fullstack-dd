import "./receiptComponent.css";
import logo from "../../assets/logo-full-transparent.png";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";

interface ReceiptComponentProps {
  orderNumber: number;
  items: { id: number; name: string; price: number; quantity: number }[];
  totalPrice: number;
  deliveryFee: number;
}

function ReceiptComponent({
  orderNumber,
  items,
  totalPrice,
  deliveryFee,
}: ReceiptComponentProps) {
  const navigate = useNavigate();

  return (
    <section className="receipt-component">
      <img src={logo} alt="Umami Logo" className="receipt-logo" />
      <article className="receipt-top">
        <h1 className="receipt-heading">Thank you for your order!</h1>
        <p className="receipt-ordernumber">Ordernumber: #{orderNumber}</p>
        <p className="receipt-date">Date: {new Date().toLocaleString()}</p>
      </article>
      <article className="receipt-bottom">
        <h3 className="receipt-subheading">Your order</h3>
        {items.map((item) => (
          <p key={item.id} className="receipt-text">
              {item.name} × {item.quantity} — {(item.price * item.quantity).toFixed(0)} kr
          </p>
        ))}
        <p className="receipt-text">Delivery Fee: {deliveryFee} kr</p>
        <h2 className="receipt-total">Total: {totalPrice} kr</h2>
      </article>
      <Button text="Follow my order" />
      <Button text="Home" onClick={() => navigate("/")} />
    </section>
  );
}

export default ReceiptComponent;