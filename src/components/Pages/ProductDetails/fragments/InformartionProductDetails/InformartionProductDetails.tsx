import { IProduct } from "@/interfaces/IProduct"
import { Button, FormatNumber } from "@chakra-ui/react"
import { ArrowBendUpLeft } from "phosphor-react"
import { Fragment } from "react/jsx-runtime"

interface InformartionProductDetailsProps {
    product?: IProduct
    isLoading: boolean
}

const InformartionProductDetails = ({ product, isLoading }: InformartionProductDetailsProps) => {
    if (isLoading) {
        return <p>Carregando...</p>
    }

    return (
        <Fragment>
            <div className="flex justify-between items-center border-b-2 border-gray-300 pb-1">
                <h1 className="text-lg sm:text-2xl font-bold">{product?.name}</h1>
                <Button>
                    <ArrowBendUpLeft size={32} />
                </Button >
            </div>
            <div className="flex flex-col items-center mt-2 gap-2.5 sm:gap-2">
                <h3>
                    {product?.description}
                </h3>
                <p><FormatNumber value={product!.price} style="currency" currency="BRL" /></p>
                <p>{product?.category}</p>
            </div>
        </Fragment >
    )
}

export default InformartionProductDetails