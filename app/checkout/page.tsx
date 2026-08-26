import { CartProvider } from "../cart-context";
import CheckoutPage from "./checkout-page";

export const metadata = {
  title: "Checkout | Ayesha Gul",
};

export const dynamic = "force-dynamic";

export default function Checkout() {
  return (
    <CartProvider>
      <CheckoutPage
        bankTitle={process.env.UBL_ACCOUNT_TITLE || "UBL Bank"}
        bankNumber={process.env.UBL_ACCOUNT_NUMBER || ""}
      />
    </CartProvider>
  );
}
