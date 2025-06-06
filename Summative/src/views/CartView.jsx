import { useStoreContext } from "../Context";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase";
import "./CartView.css";

function CartView() {
    const { cart, setCart, user, purchases, setPurchases } = useStoreContext();
    const navigate = useNavigate();

    const handleCheckout = async () => {
        if (!user) {
            alert("You must be logged in to checkout.");
            return;
        }

        const newPurchases = [...purchases, ...cart.toArray()];
        setPurchases(newPurchases);
        setCart(Map());
        localStorage.removeItem("cart");

        try {
            const userDoc = doc(firestore, "users", user.uid);
            await updateDoc(userDoc, { purchases: newPurchases });
            alert("Thank you for your purchase!");
        } catch (error) {
            console.error("Error updating Firestore:", error);
            alert("Failed to complete checkout.");
        }
    };

    return (
        <div id="cartPage">
            <button className="backbutton" onClick={() => navigate(-1)}>Back</button>
            <h1 id="cTitle">Cart</h1>
            <div className="cartContainer">
                {cart.entrySeq().map(([key, value]) => (
                    <div className="cartItem" key={key}>
                        {value.poster_path && <img src={`https://image.tmdb.org/t/p/w500${value.poster_path}`} alt={value.title} />}
                        <h3>{value.title}</h3>
                        <button
                            className="removeButton"
                            onClick={() => setCart((prevCart) => prevCart.delete(value.id))}
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>
            <button className="checkoutButton" onClick={handleCheckout}>Checkout</button>
        </div>
    );
}

export default CartView;