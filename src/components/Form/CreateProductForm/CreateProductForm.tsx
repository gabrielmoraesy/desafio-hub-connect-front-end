import { useProductService } from "@/api/products";
import { useColorMode } from "@/components/ui/color-mode";
import { SelectContent, SelectItem, SelectRoot, SelectTrigger, SelectValueText } from "@/components/ui/select";
import { toaster } from "@/components/ui/toaster";
import { Button, createListCollection, Input } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next13-progressbar";
import { useForm } from "react-hook-form";
import { CreateOrEditProductFormInputs, createOrEditProductSchema } from "../productSchema";

type Category = {
    label: string;
    value: string;
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

const CreateProductForm = () => {
    const router = useRouter()
    const { colorMode } = useColorMode();
    const { createProduct } = useProductService();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CreateOrEditProductFormInputs>({
        resolver: zodResolver(createOrEditProductSchema),
    });

    const handleCreateProduct = async (data: CreateOrEditProductFormInputs) => {
        await createProduct.mutateAsync({
            name: data.name,
            description: data.description || undefined,
            price: parseFloat(data.price.toString()),
            category: data.category,
            image: data.image_url || undefined,
        });

        router.push("/dashboard")

        reset({
            name: "",
            description: "",
            price: "",
            category: "",
            image_url: "",
        });

        toaster.create({
            title: "Produto criado com sucesso!",
            description: `O produto "${data.name}" foi criado com sucesso.`,
            type: "success",
        });
    };

    return (
        <form onSubmit={handleSubmit(handleCreateProduct)} className="flex flex-col items-center gap-4">
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

            <div className="flex flex-col gap-2 w-[100%]">
                <Input
                    {...register("image_url")}
                    type="text"
                    placeholder="Digite a URL da imagem do produto..."
                    className="text-sm sm:text-base p-2 border border-gray-300 rounded w-full"
                />
                {errors.image_url && <span className="text-red-500">{errors.image_url.message}</span>}
            </div>

            <Button
                type="submit"
                variant="ghost"
                className={`w-full p-2 rounded-lg font-bold duration-200 ${colorMode === "dark" ? "border-2 border-[#009FE3] bg-[#009FE3] hover:bg-white hover:text-[#009FE3]" : "border-2 border-[#009FE3] text-white bg-[#009FE3] hover:bg-white hover:text-[#009FE3]"}`}
            >
                <span>Criar produto</span>
            </Button>
        </form>
    );
};

export default CreateProductForm;
