import { useProductService } from "@/api/products";
import { useParams } from "next/navigation";
import InformartionProductDetails from "./fragments/InformartionProductDetails/InformartionProductDetails";

const ProductDetailsComponent = () => {
  const { id } = useParams();

  const { useGetProductById } = useProductService();
  const { data, isLoading } = useGetProductById(id as string);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto p-4 sm:p-8">
        <InformartionProductDetails product={data} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default ProductDetailsComponent;
