import { useColorMode } from "@/components/ui/color-mode";
import { useCart } from "@/contexts/CartContext/CartContext";
import { useToast } from "@/contexts/ToastContext";
import { IProduct } from "@/interfaces/IProduct";
import { Button } from "@chakra-ui/react";
import Image from "next/image";
import { ArrowBendUpLeft } from "phosphor-react";
import { Fragment } from "react/jsx-runtime";
import SkeletonProductDetails from "../SkeletonProductDetails/SkeletonProductDetails";
import { Rating } from "@/components/ui/rating";

interface InformartionProductDetailsProps {
    product?: IProduct;
    isLoading: boolean;
}

const InformartionProductDetails = ({ product, isLoading }: InformartionProductDetailsProps) => {
    const env = process.env.NEXT_PUBLIC_BACKEND_URL;
    const { colorMode } = useColorMode();
    const { addItem } = useCart();
    const { showToast } = useToast()

    if (isLoading) {
        return <SkeletonProductDetails />
    }

    const handleAddToCart = () => {
        if (product) {
            addItem({
                id: String(product.id!),
                name: product.name,
                price: product.price,
                quantity: 1,
            });

            showToast("success", {
                title: "Produto adicionado no carrinho",
            });
        }
    };

    return (
        <Fragment>
            <div className="flex justify-between items-center border-b-2 border-gray-300 pb-2 mb-6">
                <h1 className="text-xl sm:text-2xl font-bold">{product?.name}</h1>
                <Button
                    className="bg-[#009FE3] text-white hover:bg-[#0077b3] transition-all duration-300 rounded-lg"
                    onClick={() => window.history.back()}
                >
                    <ArrowBendUpLeft size={32} />
                </Button>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-8 mx-auto max-w-screen-xl">
                {product?.imagePath &&
                    <div className="flex-1">
                        <Image
                            src={`${env}/${product!.imagePath}`}
                            alt={`Imagem do produto ${product?.name}`}
                            width={600}
                            height={600}
                            quality={100}
                            loading="lazy"
                            className="rounded-lg shadow-xl max-w-full object-contain lg:object-cover"
                        />
                    </div>
                }

                <div className="flex-1">
                    <h3 className={`text-lg sm:text-xl font-semibold my-4 ${colorMode === "dark" ? "text-white" : "text-gray-700"}`}>{product?.description}</h3>
                    <p className="text-xl sm:text-2xl font-bold text-[#009FE3] mb-4">
                        <span>R$ </span> {product?.price}
                    </p>
                    <p className={`text-lg mb-4 ${colorMode === "dark" ? "text-white" : "text-gray-500"}`}>{product?.category}</p>

                    <Rating readOnly defaultValue={4} size="md" className="mb-4 block" />


                    <Button
                        onClick={handleAddToCart}
                        className="w-full sm:w-auto bg-[#009FE3] text-white hover:bg-[#0077b3] transition-all duration-300 rounded-lg p-2"
                    >
                        Adicionar ao Carrinho
                    </Button>
                </div>
            </div>
        </Fragment>
    );
};

export default InformartionProductDetails;
