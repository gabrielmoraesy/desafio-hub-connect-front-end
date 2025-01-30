import { Skeleton } from "@chakra-ui/react"
import { Fragment } from "react/jsx-runtime"

const SkeletonHome = () => {
    return (
        <Fragment>
            <div className="w-[1270px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 my-8">
                {Array.from({ length: 6 }).map((_, index) => (
                    <Skeleton key={index} className="min-h-[250px] rounded-2xl" />
                ))}
            </div>


            <div className="w-[1270px] mx-auto flex-col gap-8 my-8">
                <h1 className="text-base font-bold">Produtos recomendados</h1>

                <div className="flex gap-4 my-4">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <Skeleton key={index} className="p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow min-h-[250px] w-full" />
                    ))}
                </div>
            </div>
        </Fragment>

    )
}

export default SkeletonHome