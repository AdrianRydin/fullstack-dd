import { create } from "zustand";
import { validateOrder } from "../../utils/validateOrder";

export interface PersonalInfo {
  name: string;
  address: string;
  phone: string;
}

export interface CheckoutErrors {
  name?: string;
  address?: string;
  phone?: string;
  deliveryMethod?: string;
  paymentMethod?: string;
}

interface CheckoutState {
  personalInfo: PersonalInfo;
  deliveryMethod: string;
  paymentMethod: string;
  errors: CheckoutErrors;

  setPersonalField: (field: keyof PersonalInfo, value: string) => void;
  setDeliveryMethod: (value: string) => void;
  setPaymentMethod: (value: string) => void;
  setErrors: (errors: CheckoutErrors) => void;
  resetCheckout: () => void;
}

export const useCheckoutStore = create<CheckoutState>((set) => ({
  personalInfo: {
    name: "",
    address: "",
    phone: "",
  },
  deliveryMethod: "",
  paymentMethod: "",
  errors: {},

  setPersonalField: (field, value) => {
    set((state) => {
      const newPersonalInfo = { ...state.personalInfo, [field]: value };
      const validation = validateOrder({
        personalInfo: newPersonalInfo,
        deliveryMethod: state.deliveryMethod,
        paymentMethod: state.paymentMethod,
      });
      return { personalInfo: newPersonalInfo, errors: validation.errors };
    });
  },

  setDeliveryMethod: (value) => {
    set((state) => {
      let newPaymentMethod = state.paymentMethod;
      if (
        value === "pickup" &&
        !["swish", "card", "cash"].includes(newPaymentMethod)
      ) {
        newPaymentMethod = "cash";
      }
      if (value === "home" && newPaymentMethod === "cash") {
        newPaymentMethod = "swish"; 
      }
      const validation = validateOrder({
        personalInfo: state.personalInfo,
        deliveryMethod: value,
        paymentMethod: state.paymentMethod,
      });
      return { deliveryMethod: value, errors: validation.errors };
    });
  },

  setPaymentMethod: (value) => {
    set((state) => {
      const validation = validateOrder({
        personalInfo: state.personalInfo,
        deliveryMethod: state.deliveryMethod,
        paymentMethod: value,
      });
      return { paymentMethod: value, errors: validation.errors };
    });
  },

  setErrors: (errors) => set({ errors }),

  resetCheckout: () =>
    set({
      personalInfo: { name: "", address: "", phone: "" },
      deliveryMethod: "",
      paymentMethod: "",
      errors: {},
    }),
}));
