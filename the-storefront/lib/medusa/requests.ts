
import { useState, useEffect} from "react";

export function useProductListQuery() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("/api/products")
            .then((res) => res.json())
            .then((res) => setProducts(res));
    }, []);

    return products;
}
