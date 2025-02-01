"use client";

import { useColorMode } from "@/components/ui/color-mode";
import { IProduct } from "@/interfaces/IProduct";
import {
    createListCollection,
    SelectContent,
    SelectItem,
    SelectRoot,
    SelectTrigger,
    SelectValueText,
    Stack
} from "@chakra-ui/react";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";

interface ISearchValues {
    value: string;
    label: string;
}

interface FilterProductsHomeProps {
    products: IProduct[] | undefined;
    categorySelected: string[];
    setCategorySelected: React.Dispatch<React.SetStateAction<string[]>>;
}

const FilterProductsHome = ({
    products,
    categorySelected,
    setCategorySelected,
}: FilterProductsHomeProps) => {
    const { colorMode } = useColorMode();

    // Obter categorias únicas
    const uniqueCategories: ISearchValues[] = products!.reduce((acc, product) => {
        if (product.category && !acc.some((cat) => cat.value === product.category)) {
            acc.push({ label: product.category, value: product.category });
        }
        return acc;
    }, [] as ISearchValues[]);

    const categories = createListCollection({
        items: uniqueCategories,
    });

    return (
        <Stack gap="5" mx={8} my={2} flexDirection={"row"}>
            <h1 className="flex gap-1 items-center text-sm">
                <SlidersHorizontal size={20} /> Filtros
            </h1>

            <SelectRoot
                variant="outline"
                collection={categories}
                w={"300px"}
                value={categorySelected}
                onValueChange={(details) => {
                    const selectedCategory = details.items[0]?.value;
                    if (selectedCategory) {
                        setCategorySelected([selectedCategory]);
                    }
                }}
            >
                <SelectTrigger className="rounded-xl border-gray-300 shadow-sm hover:shadow-md focus:ring-2 focus:ring-blue-500 px-3">
                    <SelectValueText placeholder="Escolha uma categoria" fontSize={14} />
                    <ChevronDown className="ml-auto text-gray-500" size={18} />
                </SelectTrigger>
                <SelectContent
                    className={`max-h-48 overflow-auto rounded-xl shadow-lg ${colorMode === "dark" ? "bg-gray-900" : "bg-white"}`}
                    style={{
                        position: "absolute",
                        zIndex: 999,
                        backgroundColor: `${colorMode === "dark" ? "bg-gray-900" : "bg-white"}`,
                        width: "300px",
                    }}
                >
                    {uniqueCategories.map((category) => (
                        <SelectItem
                            item={category}
                            key={category.value}
                            className="px-4 py-2 hover:bg-gray-100 hover:text-black cursor-pointer text-sm"
                        >
                            {category.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </SelectRoot>

            {categorySelected.length > 0 && (
                <div
                    className="border-2 border-red-600 text-red-600 rounded-lg p-1 text-sm flex items-center"
                    onClick={() => setCategorySelected([])}
                >
                    <X size={16} />
                    Limpar filtros
                </div>
            )
            }
        </Stack >
    );
};

export default FilterProductsHome;
