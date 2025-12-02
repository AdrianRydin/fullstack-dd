import "./valueSection.css";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import SetMealIcon from "@mui/icons-material/SetMeal";
import RiceBowlIcon from "@mui/icons-material/RiceBowl";
import LocalDiningIcon from "@mui/icons-material/LocalDining";

function ValueSection() {
  return (
    <section className="value-section">
      <h1 className="value-heading">Our values</h1>
      <article className="value-container">
        <article className="values">
          <DeliveryDiningIcon
            className="delivery-icon"
            fontSize="medium"
            aria-hidden="true"
            sx={{ color: "#E87461" }}
          />
          <p className="value-text">Fast Take Away</p>
        </article>
        <article className="values">
          <SetMealIcon
            className="fish-icon"
            fontSize="medium"
            aria-hidden="true"
            sx={{ color: "#E87461" }}
          />
          <p className="value-text">Fresh Fish Daily</p>
        </article>
        <article className="values">
          <RiceBowlIcon
            className="bowl-icon"
            fontSize="medium"
            aria-hidden="true"
            sx={{ color: "#E87461" }}
          />
          <p className="value-text">Quality Ingredients</p>
        </article>
        <article className="values">
          {" "}
          <LocalDiningIcon
            className="craft-icon"
            fontSize="medium"
            aria-hidden="true"
            sx={{ color: "#E87461" }}
          />
          <p className="value-text">Modern Craftmanship</p>
        </article>
      </article>
    </section>
  );
}

export default ValueSection;
