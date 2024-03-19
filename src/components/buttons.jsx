import { useNavigation } from "react-router-dom";

export const Button = ({ children, transparent, submit }) => {
  const { state } = useNavigation();
  const isSubmitting = state === "submitting" || state === "loading";

  return (
    <button
      disabled={submit ? isSubmitting : false}
      className={transparent ? "button-transparent" : "button-full"}
    >
      {submit ? (isSubmitting ? "Loading" : children) : children}
    </button>
  );
};
