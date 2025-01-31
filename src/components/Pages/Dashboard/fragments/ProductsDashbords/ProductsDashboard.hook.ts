import { useProductService } from "@/api/products";
import { useCart } from "@/contexts/CartContext/CartContext";
import { IProduct } from "@/interfaces/IProduct";
import { useEffect, useState } from "react";

const useProductsDashbords = () => {
    const { useGetProducts, deleteProduct } = useProductService();
    const { data, isLoading } = useGetProducts();
    const { removeItem } = useCart()

    const [showDeleteProductModal, setShowDeleteProductModal] = useState(false)
    const [selectedProductId, setSelectedProductId] = useState<number | undefined>(undefined);

    const [products, setProducts] = useState<IProduct[] | undefined>([])

    const handleRemoveProduct = (idProduct: number) => {
        deleteProduct.mutate(idProduct);
        setProducts(prevState => prevState?.filter(product => product.id !== idProduct))
        removeItem(String(idProduct));
    }

    useEffect(() => {
        setProducts(data)
    }, [data])

    return {
        isLoading,
        selectedProductId,
        setSelectedProductId,
        showDeleteProductModal,
        setShowDeleteProductModal,
        products,
        handleRemoveProduct
    };
}

export default useProductsDashbords;
