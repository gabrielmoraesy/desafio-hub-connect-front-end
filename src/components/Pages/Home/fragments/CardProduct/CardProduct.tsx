import { useColorMode } from "@/components/ui/color-mode";
import { Rating } from "@/components/ui/rating";
import { IProduct } from "@/interfaces/IProduct";
import { Button } from "@chakra-ui/react";
import { ShoppingCartIcon } from "lucide-react";
import Image from "next/image"
import { useRouter } from "next13-progressbar";

interface CardProduct {
    product: IProduct
    handleAddToCart: (productId: number) => void
}

const CardProduct = ({ product, handleAddToCart }: CardProduct) => {
    const env = process.env.NEXT_PUBLIC_BACKEND_URL;
    const router = useRouter()
    const { colorMode } = useColorMode();

    return (
        <div
            key={product.id}
            className={`flex flex-col justify-between items-center p-8 rounded-2xl shadow-lg hover:shadow-2xlxl transition-shadow min-h-[250px] ${colorMode === "dark" ? "bg-[#161616]" : ""}`}
        >
            <div className="flex flex-col items-center gap-2">
                <h2 className="text-base sm:text-xl font-bold">{product.name}</h2>
                <p className={`text-sm sm:text-base font-semibold ${colorMode === "dark" ? "text-white" : "text-gray-700"}`}>
                    {product.category}
                    <span> | </span>
                    <span className="font-bold text-[#009FE3]">
                        <span>R$ </span> {product.price}
                    </span>
                </p>

                <Rating readOnly defaultValue={4} size="xs" />
            </div>

            {product?.imagePath &&
                <Image
                    src={`${env}/${product.imagePath}`}
                    alt="Img product"
                    width={250}
                    height={250}
                    quality={100}
                    className="my-3"
                />
            }

            <div className="w-full flex justify-between">
                <Button
                    onClick={() => router.push(`/product/${product.id}`)}
                    className={`text-xs sm:text-sm w-[48%] p-1 rounded-lg font-bold duration-200 hover:opacity-60
                ${colorMode === "dark"
                            ? "border-2 border-[#009FE3] bg-[#009FE3]"
                            : "border-2 border-[#009FE3] text-white bg-[#009FE3]"}`}
                >
                    Ver produto
                </Button>
                <Button
                    onClick={() => handleAddToCart(product.id!)}
                    className={`text-xs sm:text-sm w-[48%] p-1 rounded-lg font-bold duration-200 hover:opacity-60
                ${colorMode === "dark"
                            ? "border-2 border-[#009FE3] bg-[#009FE3]"
                            : "border-2 border-[#009FE3] text-white bg-[#009FE3]"}`}
                >
                    Adicionar <ShoppingCartIcon />
                </Button>
            </div>
        </div>
    )
}

export default CardProduct