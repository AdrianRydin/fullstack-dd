import Button from "../../../../components/Button/Button";
import "./AdminOrderCard.css";

interface AdminOrderCardProps {
  id?: number;
  date: string;
  orderNumber: number;
  name: string;
  quantity: number;
  status: string;
}

export function AdminOrderCard({
  date,
  orderNumber,
  name,
  quantity,
  status,
}: AdminOrderCardProps) {
  return (
    <section className="admin-order-card-container">
      <section className="admin-order-card__info-container">
        <aside className="admin-order-card__info-container-text">
          <p>Date: {date}</p>
          <p>Order number: {orderNumber}</p>
          <p>
            {name}: {quantity}
          </p>
          <p>Status: {status}</p>
        </aside>
      </section>

      <Button text="Lock" type="button" />
    </section>
  );
}
