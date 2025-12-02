import { useCheckoutStore } from "../../features/review/reviewStore";
import "./addressForm.css";

function AddressForm() {
  const { personalInfo, setPersonalField, errors } = useCheckoutStore();

  return (
    <section className="personal-info-section">
      <h3 className="personal-info-title">Personal Information</h3>
      <form
        className="personal-info-group"
        onSubmit={(e) => e.preventDefault()}
      >
        {(["name", "address", "phone"] as const).map((field) => (
          <div className="input-group" key={field}>
            <input
              type="text"
              id={field}
              placeholder={
                field === "name"
                  ? "Your name"
                  : field === "address"
                  ? "Your address"
                  : "Your phone number"
              }
              value={personalInfo[field]}
              onChange={(e) => setPersonalField(field, e.target.value)}
            />
            {errors[field] && <p className="error-text">{errors[field]}</p>}
          </div>
        ))}
      </form>
    </section>
  );
}

export default AddressForm;
