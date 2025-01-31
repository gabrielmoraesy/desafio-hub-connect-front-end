import { Skeleton } from "@chakra-ui/react"
import { Fragment } from "react/jsx-runtime"

const SkeletonProductDetails = () => {
    return (
        <Fragment>
            <div className="flex justify-between items-center border-b-2 border-gray-300 pb-1">
                <Skeleton className="w-[40%] h-[32px]" />
                <Skeleton className="w-[48px] h-[40px]" />
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-8 mx-auto max-w-screen-xl">
                <Skeleton className="flex-1 rounded-lg shadow-xl max-w-full object-contain lg:object-cover w-[600px] h-[600px] mt-2" />

                <div className="flex-1">
                    <Skeleton className="my-4 h-10" />
                    <Skeleton className="mb-4 h-10" />
                    <Skeleton className="mb-4 h-10" />

                    <Skeleton className="w-[50%] rounded-lg p-2 h-10" />
                </div>
            </div>
        </Fragment>

    )
}

export default SkeletonProductDetails