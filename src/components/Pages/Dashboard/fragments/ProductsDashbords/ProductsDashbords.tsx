"use client";

import ConfirmDialog from "@/components/Modals/ConfirmDialog/ConfirmDialog";
import NotFoundProducts from "@/components/Pages/Home/fragments/NotFoundProducts/NotFoundProducts";
import { IProduct } from "@/interfaces/IProduct";
import { Button } from "@chakra-ui/react";
import Link from "next/link";
import { Fragment } from "react";
import SkeletonDashboard from "../SkeletonDashboard/SkeletonDashboard";
import useProductsDashbords from "./ProductsDashboard.hook";

const ProductsDashbords = () => {
    const {
        isLoading,
        selectedProductId,
        setSelectedProductId,
        showDeleteProductModal,
        setShowDeleteProductModal,
        products,
        handleRemoveProduct,
    } = useProductsDashbords();


    if (isLoading) {
        return <SkeletonDashboard />;
    }

    if (!products) {
        return <NotFoundProducts />;
    }

    return (
        <Fragment>
            {products?.map((product: IProduct) => (
                <Fragment key={product.id}>
                    <div className="flex flex-col sm:flex-row justify-between items-center border-b border-gray-200 w-4/5 mx-auto py-2">
                        <p className="text-sm sm:text-lg truncate">{product.name}</p>
                        <div className="flex items-center gap-2">
                            <Link
                                href={`/product/${product.id}`}
                                className="flex justify-center items-center border-2 border-gray-300 rounded-md px-4 py-2 h-[36px] hover:bg-gray-300 dark:hover:text-black duration-200 text-xs sm:text-sm"
                            >
                                Ver
                            </Link>
                            <Link
                                href={`/product/edit/${product.id}`}
                                className="flex justify-center items-center border-2 border-gray-300 rounded-md px-4 py-2 h-[36px] hover:bg-gray-300 dark:hover:text-black duration-200 text-xs sm:text-sm"
                            >
                                Editar
                            </Link>
                            <Button
                                onClick={() => {
                                    setSelectedProductId(product.id);
                                    setShowDeleteProductModal(true);
                                }}
                                className="flex justify-center items-center bg-red-500 text-white border-2 border-red-500 rounded-md px-4 py-2 hover:bg-red-600 hover:border-red-600 duration-200 text-xs sm:text-sm h-[36px]"
                            >
                                Excluir
                            </Button>
                        </div>
                    </div>

                    {showDeleteProductModal && selectedProductId === product.id && (
                        <ConfirmDialog
                            open={showDeleteProductModal}
                            setOpen={setShowDeleteProductModal}
                            onConfirm={() => {
                                if (selectedProductId !== undefined) {
                                    handleRemoveProduct(selectedProductId);
                                }
                                setShowDeleteProductModal(false);
                                setSelectedProductId(undefined);
                            }}
                            onCancel={() => {
                                setShowDeleteProductModal(false);
                                setSelectedProductId(undefined);
                            }}
                            title={"Excluir produto"}
                            description={"Tem certeza que deseja excluir este produto?"}
                        />
                    )}
                </Fragment>
            ))}
        </Fragment>
    );
};

export default ProductsDashbords;
