import { useProductService } from "@/api/products";
import { Button, Input } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toaster } from "@/components/ui/toaster";
import { useColorMode } from "@/components/ui/color-mode";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { IProduct } from "@/interfaces/IProduct";
import { createListCollection } from "@chakra-ui/react";
import {
    SelectContent,
    SelectItem,
    SelectLabel,
    SelectRoot,
    SelectTrigger,
    SelectValueText,
} from "@/components/ui/select";

// Definindo o tipo de item da categoria para o TypeScript
type Category = {
    label: string;
    value: string;
};

const productCategoryCollection = createListCollection({
    items: [
        { label: "Eletrônico", value: "eletronico" },
        { label: "Roupas", value: "roupas" },
        { label: "Alimentos", value: "alimentos" },
        { label: "Livros", value: "livros" },
        { label: "Lazer", value: "lazer" },
        { label: "Eletrodomésticos", value: "eletrodomesticos" },
        { label: "Outros", value: "outros" },
    ] as Category[],  // Especificando o tipo dos itens
});

const createOrEditProductSchema = z.object({
    name: z
        .string()
        .nonempty("Nome é obrigatório")
        .min(3, "Nome precisa ter no mínimo 3 caracteres")
        .max(200, "Nome não pode ter mais de 200 caracteres"),
    description: z
        .string()
        .max(500, "Descrição não pode ter mais de 500 caracteres")
        .optional(),
    price: z
        .string()
        .nonempty("Preço é obrigatório")
        .min(0, "Preço não pode ser negativo")
        .max(10000000, "Preço não pode ser maior que 10.000.000"),
    category: z.string().nonempty("Categoria é obrigatória"),
    image_url: z
        .string()
        .optional()
        .refine(
            (val) =>
                val === undefined ||
                val.trim() === "" ||
                /^https?:\/\/[^\s$.?#].[^\s]*$/.test(val),
            {
                message: "URL inválida",
            }
        ),
});

type CreateOrEditProductFormInputs = z.infer<typeof createOrEditProductSchema>;

interface CreateOrEditProductFormProps {
    variant: "create" | "edit";
}

const CreateOrEditProductForm = ({ variant }: CreateOrEditProductFormProps) => {
    const { colorMode } = useColorMode();
    const { id }: { id: string | undefined } = useParams();
    const [productSelectedForEdit, setProductSelectedForEdit] = useState<IProduct | null>(null);

    const { createProduct, updateProduct } = useProductService();
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<CreateOrEditProductFormInputs>({
        resolver: zodResolver(createOrEditProductSchema),
    });

    const { useGetProductById } = useProductService();
    const { data } = useGetProductById(id as string);

    const handleCreateProduct = async (data: CreateOrEditProductFormInputs) => {
        await createProduct.mutateAsync({
            name: data.name,
            description: data.description || undefined,
            price: parseFloat(data.price.toString()),
            category: data.category,
            image: data.image_url || undefined,
        });

        setValue("name", "");
        setValue("description", "");
        setValue("price", "");
        setValue("category", "");
        setValue("image_url", "");

        toaster.create({
            title: "Produto criado com sucesso!",
            description: `O produto "${data.name}" foi criado com sucesso.`,
            type: "success",
        });
    };

    const handleEditProduct = async (data: CreateOrEditProductFormInputs) => {
        if (productSelectedForEdit && id) {
            await updateProduct.mutateAsync({
                id,
                updatedProduct: {
                    name: data.name,
                    description: data.description || undefined,
                    price: parseFloat(data.price.toString()),
                    category: data.category,
                    image: data.image_url || undefined,
                },
            });
        }
    };

    useEffect(() => {
        if (variant === "edit" && data) {
            setProductSelectedForEdit(data);
        }
    }, [data, variant]);

    useEffect(() => {
        if (variant === "edit" && productSelectedForEdit) {
            setValue("name", productSelectedForEdit.name);
            setValue("description", productSelectedForEdit.description);
            setValue("price", String(productSelectedForEdit.price));
            setValue("category", productSelectedForEdit.category);
            setValue("image_url", productSelectedForEdit.image);
        }
    }, [productSelectedForEdit, variant, setValue]);

    return (
        <form
            onSubmit={handleSubmit(variant === "create" ? handleCreateProduct : handleEditProduct)}
            className="flex flex-col items-center gap-4"
        >
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
                    <SelectRoot collection={productCategoryCollection} size="sm" width="320px">
                        <SelectLabel>Categoria</SelectLabel>
                        <SelectTrigger>
                            <SelectValueText placeholder="Selecione a categoria..." />
                        </SelectTrigger>
                        <SelectContent>
                            {productCategoryCollection.items.map((category: Category) => (
                                <SelectItem key={category.value} item={category}>
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
                className={`w-full p-2 rounded-lg font-bold duration-200 ${colorMode === "dark" ? "border-2 border-[#009FE3] bg-[#009FE3] hover:bg-white hover:text-[#009FE3]"
                    : "border-2 border-[#009FE3] text-white bg-[#009FE3] hover:bg-white hover:text-[#009FE3]"}
  `}
            >
                <span>{variant === "create" ? "Criar produto" : "Editar produto"}</span>
            </Button>

        </form>
    );
};

export default CreateOrEditProductForm;
