import "./summaryBox.css";

interface SummaryBoxProps {
  totalPrice: number;
  deliveryFee: number;
  total: number;
}

function SummaryBox({ totalPrice, deliveryFee, total }: SummaryBoxProps) {
  return (
    <section className="summary-box">
      <h3 className="summary-heading">Order Summary</h3>
      <div className="summary-line">
        <span>Subtotal</span> <span>{totalPrice} kr</span>
      </div>
      <div className="summary-line">
        <span>Delivery</span> <span>{deliveryFee} kr</span>
      </div>
      <div className="summary-line total">
        <span>Total</span> <span>{total} kr</span>
      </div>
    </section>
  );
}

export default SummaryBox;
