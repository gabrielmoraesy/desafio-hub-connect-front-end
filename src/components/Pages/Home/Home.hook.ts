import { useProductService } from "@/api/products";
import { useCart } from "@/contexts/CartContext/CartContext";
import { useToast } from "@/contexts/ToastContext";
import { IProduct } from "@/interfaces/IProduct";
import { useEffect, useState } from "react";

const UseHome = () => {
    const { addItem } = useCart();
    const { showToast } = useToast()

    const { useGetProducts } = useProductService();
    const { data: products, isLoading } = useGetProducts();

    const [searchTitle, setSearchTitle] = useState("");
    const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);

    useEffect(() => {
        if (searchTitle.length > 3) {
            const productsFiltered = products?.filter(product =>
                product.name.toLowerCase().includes(searchTitle.toLowerCase())
            );
            setFilteredProducts(productsFiltered || []);
        } else {
            setFilteredProducts(products || []);
        }
    }, [searchTitle, products]);

    const handleAddToCart = (productId: number) => {
        const productAddToCart: IProduct | undefined = filteredProducts.find(
            product => product.id === productId
        );

        if (productAddToCart) {
            addItem({
                id: String(productAddToCart.id!),
                name: productAddToCart.name,
                price: productAddToCart.price,
                quantity: 1,
            });

            showToast("success", {
                title: "Produto adicionado no carrinho",
            });
        }
    };

    return {
        filteredProducts,
        isLoading,
        searchTitle,
        setSearchTitle,
        handleAddToCart
    };
}

export default UseHome;
