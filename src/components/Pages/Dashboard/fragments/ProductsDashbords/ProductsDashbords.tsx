import { useProductService } from '@/api/products';
import { IProduct } from '@/interfaces/IProduct';
import { Button } from '@chakra-ui/react';
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';

const ProductsDashbords = () => {
    const { useGetProducts, deleteProduct } = useProductService();
    const { data, isLoading } = useGetProducts();

    const [products, setProducts] = useState<IProduct[] | undefined>([])

    const handleRemoveProduct = (idProduct: number) => {
        deleteProduct.mutate(idProduct);
        setProducts(prevState => prevState?.filter(product => product.id !== idProduct))
    }

    useEffect(() => {
        setProducts(data)
    }, [data])

    if (isLoading) {
        return <h1>Carregando...</h1>
    }

    return (
        <Fragment>
            {products?.map((product: IProduct) => (
                <Fragment key={product.id}>
                    <div className="flex flex-col sm:flex-row justify-between items-center border-b border-gray-200 w-4/5 mx-auto py-2" key={product.id}>
                        <p className="text-sm sm:text-lg">{product.name}</p>
                        <div className="flex items-center gap-2">
                            <Link
                                href={`/product/${product.id}`}
                                className="flex justify-center items-center border-2 border-gray-300 rounded-md px-4 py-2 h-[36px] hover:bg-gray-300 dark:hover:text-black duration-200 text-xs sm:text-sm"
                            >
                                Ver
                            </Link>
                            <Link
                                href={`/product/edit/${product.id}`}
                                className="flex justify-center items-center  border-2 border-gray-300 rounded-md px-4 py-2 h-[36px] hover:bg-gray-300 dark:hover:text-black duration-200 text-xs sm:text-sm"
                            >
                                Editar
                            </Link>
                            <Button
                                onClick={() => {
                                    console.log(product.id)
                                    handleRemoveProduct(Number(product.id))
                                }}
                                className="flex justify-center items-center bg-red-500 text-white border-2 border-red-500 rounded-md px-4 py-2 hover:bg-red-600 hover:border-red-600 duration-200 text-xs sm:text-sm h-[36px]"
                            >
                                Excluir
                            </Button>
                        </div>
                    </div>

                    {/* {showDeleteProductModal && (
                        <ConfirmDialog
                            open={showDeleteProductModal}
                            setOpen={setShowDeleteProductModal}
                            onConfirm={() => {
                                handleRemoveProduct(Number(product.id))
                                setShowDeleteProductModal(false)
                            }}
                            onCancel={() => setShowDeleteProductModal((prevState) => !prevState)}
                            title={"Excluir produto"}
                            description={"Tem certeza que deseja excluir este produto?"}
                        />
                    )} */}
                </Fragment>
            ))}

            {products?.length === 0 && (
                <div className={`mt-4 flex flex-col gap-2 items-center rounded-lg p-4 w-4/5 mx-auto`}>
                    <p className="text-sm sm:text-lg">Você não possui nenhum produto criado</p>
                    <Link href="/product/create" className="bg-[#009FE3] selection:text-white text-center cursor-pointer rounded-lg font-bold border-0 p-3 text-sm sm:text-base text-white">
                        Criar produto
                    </Link>
                </div>
            )}
        </Fragment>
    )
}

export default ProductsDashbords