import { useProductService } from "@/api/products";
import { useColorMode } from "@/components/ui/color-mode";
import { SelectContent, SelectItem, SelectRoot, SelectTrigger, SelectValueText } from "@/components/ui/select";
import { IProduct } from "@/interfaces/IProduct";
import { Button, createListCollection, Input } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useRouter } from "next13-progressbar";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CreateOrEditProductFormInputs, createOrEditProductSchema } from "../productSchema";

type Category = {
    label: string;
    value: string;
};

type ValueChangeDetails<T> = {
    value: string[];
    items: T[];
};

const productCategoryCollection = createListCollection({
    items: [
        { label: "Eletrônico", value: "Eletrônico" },
        { label: "Roupas", value: "Roupas" },
        { label: "Alimentos", value: "Alimentos" },
        { label: "Livros", value: "Livros" },
        { label: "Outros", value: "Outros" },
    ] as Category[],
});

const EditProductForm = () => {
    const env = process.env.NEXT_PUBLIC_BACKEND_URL
    const router = useRouter();
    const { colorMode } = useColorMode();
    const { id }: { id: string | undefined } = useParams();
    const [productSelectedForEdit, setProductSelectedForEdit] = useState<IProduct | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>("");

    const { updateProduct, useGetProductById } = useProductService();
    const { data } = useGetProductById(id as string);

    console.log(productSelectedForEdit)

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<CreateOrEditProductFormInputs>({
        resolver: zodResolver(createOrEditProductSchema),
    });

    useEffect(() => {
        if (data) {
            setProductSelectedForEdit(data);
        }
    }, [data]);

    useEffect(() => {
        if (productSelectedForEdit) {
            setValue("name", productSelectedForEdit.name);
            setValue("description", productSelectedForEdit.description);
            setValue("price", String(productSelectedForEdit.price));
            setSelectedCategory(productSelectedForEdit.category);
        }
    }, [productSelectedForEdit, setValue]);

    const handleCategoryChange = (details: ValueChangeDetails<Category>) => {
        setSelectedCategory(details.value[0]);
    };

    const handleEditProduct = async (data: CreateOrEditProductFormInputs) => {
        if (productSelectedForEdit && id) {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("description", data.description || "");
            formData.append("price", data.price.toString());
            formData.append("category", selectedCategory);

            if (data.image && data.image.length > 0) {
                const file = data.image[0];
                formData.append("Image", file);
            } else if (productSelectedForEdit.imagePath) {
                formData.append("Image", productSelectedForEdit.imagePath);
            }

            try {
                if (formData) {
                    await updateProduct.mutateAsync({
                        id,
                        updateProduct: formData
                    });
                }

                router.push("/dashboard");

                reset({
                    name: "",
                    description: "",
                    price: "",
                    category: ""
                });
            } catch (e) {
                console.log(e);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(handleEditProduct)} className="flex flex-col items-center gap-4">
            <div className="flex flex-col gap-2 w-[100%]">
                <Input
                    {...register("name")}
                    type="text"
                    placeholder="Digite o nome do produto..."
                    className="text-sm sm:text-base p-2 border border-gray-300 rounded w-full"
                />
                {errors.name && <span className="text-red-500">{errors.name.message}</span>}
            </div>

            <div className="flex flex-col gap-2 w-[100%]">
                <Input
                    {...register("description")}
                    type="text"
                    placeholder="Digite a descrição do produto..."
                    className="text-sm sm:text-base p-2 border border-gray-300 rounded w-full"
                />
                {errors.description && <span className="text-red-500">{errors.description.message}</span>}
            </div>

            <div className="flex flex-col sm:flex-row gap-2 w-full">
                <div className="flex flex-col gap-2 w-full sm:w-[50%]">
                    <Input
                        {...register("price")}
                        type="number"
                        placeholder="Digite o preço..."
                        className="text-sm sm:text-base p-2 border border-gray-300 rounded"
                        min={0}
                        step={0.01}
                    />
                    {errors.price && <span className="text-red-500">{errors.price.message}</span>}
                </div>

                <div className="flex flex-col gap-2 w-full sm:w-[50%]">
                    <SelectRoot
                        collection={productCategoryCollection}
                        size="sm"
                        width="100%"
                        value={selectedCategory ? [selectedCategory] : undefined}
                        onValueChange={handleCategoryChange}
                        className="border border-gray-300 rounded-md px-2 py-0.5"
                        {...register("category")}
                    >
                        <SelectTrigger>
                            <SelectValueText placeholder="Selecione a categoria..." />
                        </SelectTrigger>
                        <SelectContent className="p-2">
                            {productCategoryCollection.items.map((category: Category) => (
                                <SelectItem
                                    key={category.value}
                                    item={category}
                                    className="text-xs sm:text-base"
                                >
                                    {category.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </SelectRoot>

                    {errors.category && <span className="text-red-500">{errors.category.message}</span>}
                </div>
            </div>

            {/* Campo de imagem */}
            <div className="flex flex-col gap-2 w-[100%]">
                {productSelectedForEdit?.imagePath && (
                    <div className="mb-2 mx-auto flex flex-col gap-2">
                        <Image
                            src={`${env}/${productSelectedForEdit.imagePath}`}
                            alt={`Imagem do produto`}
                            width={350}
                            height={350}
                            quality={100}
                            loading="lazy"
                            className="rounded-lg shadow-xl max-w-full object-contain lg:object-cover"
                        />
                        <p className="text-gray-500">Imagem atual</p>
                    </div>
                )}
                <Input
                    {...register("image")}
                    type="file"
                    placeholder="Digite a URL da imagem do produto..."
                    className="text-sm sm:text-base p-1 border border-gray-300 rounded w-full"
                />
                {errors.image && <span>{errors.image.message}</span>}
            </div>

            <Button
                type="submit"
                variant="ghost"
                className={`w-full p-2 rounded-lg font-bold duration-200 ${colorMode === "dark" ? "border-2 border-[#009FE3] bg-[#009FE3] hover:bg-white hover:text-[#009FE3]" : "border-2 border-[#009FE3] text-white bg-[#009FE3] hover:bg-white hover:text-[#009FE3]"}`}
            >
                <span>Editar produto</span>
            </Button>
        </form>
    );
};

export default EditProductForm;
