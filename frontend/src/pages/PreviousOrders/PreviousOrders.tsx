import { useEffect, useState } from "react";
import PreviousOrderCard from "../../components/PreviousOrdercard/PreviousOrderCard";
import "./previousOrders.css";
import { getMyOrders, type OrderResponse } from "../../api/order";
import { useAuthStore } from "../../features/authentication/store/authStore";
import { useNavigate } from "react-router-dom";

function PreviousOrdersPage() {
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { user, token } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    getMyOrders()
      .then((data) => {
        const sorted = [...data].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
        );
        setOrders(sorted);
      })
      .catch((err) => {
        console.error(err);
        setError("You dont have any saved orders yet.");
      })
      .finally(() => setLoading(false));
  }, [user, token, navigate]);

  if (loading) {
    return (
      <section className="prevorder-page-wrapper">
        <h1 className="prevorder-page-title">Previous Orders</h1>
        <p>Loading orders...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="prevorder-page-wrapper">
        <h1 className="prevorder-page-title">Previous Orders</h1>
        <p>{error}</p>
      </section>
    );
  }

  if (orders.length === 0) {
    return (
      <section className="prevorder-page-wrapper">
        <h1 className="prevorder-page-title">Previous Orders</h1>
        <p>You have no orders yet.</p>
      </section>
    );
  }

  return (
    <section className="prevorder-page-wrapper">
      <h1 className="prevorder-page-title">Previous Orders</h1>
      <section className="prevorder-list-wrapper">
        {orders.map((order) => (
          <PreviousOrderCard key={order._id} order={order} />
        ))}
      </section>
    </section>
  );
}

export default PreviousOrdersPage;