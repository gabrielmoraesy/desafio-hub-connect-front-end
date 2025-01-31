import { Skeleton } from "@chakra-ui/react"

const SkeletonDashboard = () => {
    return (
        <div className="mt-4 flex flex-col gap-2">
            {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} className="w-4/5 mx-auto py-2 h-12" />
            ))}
        </div>

    )
}

export default SkeletonDashboard