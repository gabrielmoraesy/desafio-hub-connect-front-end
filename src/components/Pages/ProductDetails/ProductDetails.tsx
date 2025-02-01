import { useProductService } from "@/api/products";
import { useParams } from "next/navigation";
import InformartionProductDetails from "./fragments/InformartionProductDetails/InformartionProductDetails";
import ReviewsProductDetails from "./fragments/ReviewsProductDetails/ReviewsProductDetails";

const ProductDetailsComponent = () => {
  const { id } = useParams();

  const { useGetProductById } = useProductService();
  const { data, isLoading } = useGetProductById(id as string);

  return (
    <div className="min-h-screen max-w-7xl mx-auto p-4 sm:p-8">
      <InformartionProductDetails product={data} isLoading={isLoading} />
      <ReviewsProductDetails />
    </div>
  );
};

export default ProductDetailsComponent;
