import { createContext, useContext, useState, useEffect } from "react";
import { Map } from "immutable";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [email, setEmail] = useState("");
    const [search, setSearch] = useState("");
    const [cart, setCart] = useState(Map());
    const [fGenre, setFGenre] = useState([]);
    const [purchases, setPurchases] = useState([]);

    const genreList = [
        { "genre": "Action", "id": 28 },
        { "genre": "Adventure", "id": 12 },
        { "genre": "Animation", "id": 16 },
        { "genre": "Crime", "id": 80 },
        { "genre": "Family", "id": 10751 },
        { "genre": "Fantasy", "id": 14 },
        { "genre": "History", "id": 36 },
        { "genre": "Horror", "id": 27 },
        { "genre": "Mystery", "id": 9648 },
        { "genre": "Sci-Fi", "id": 878 },
        { "genre": "War", "id": 10752 },
        { "genre": "Western", "id": 37 }
    ];

    // Listen for Firebase Auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
        });
        return () => unsubscribe();
    }, []);

    // Load from localStorage on mount
    useEffect(() => {
        const cartData = localStorage.getItem("cart");
        if (cartData) setCart(Map(JSON.parse(cartData)));
        const purchaseData = localStorage.getItem("purchases");
        if (purchaseData) setPurchases(JSON.parse(purchaseData));
    }, []);

    // Save cart and purchases to localStorage
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart.toObject()));
    }, [cart]);
    useEffect(() => {
        localStorage.setItem("purchases", JSON.stringify(purchases));
    }, [purchases]);

    return (
        <StoreContext.Provider value={{
            user, setUser, fName, setFName, lName, setLName, email, setEmail,
            cart, setCart, search, setSearch, fGenre, setFGenre, genreList, purchases, setPurchases
        }}>
            {children}
        </StoreContext.Provider>
    );
};

export const useStoreContext = () => useContext(StoreContext);