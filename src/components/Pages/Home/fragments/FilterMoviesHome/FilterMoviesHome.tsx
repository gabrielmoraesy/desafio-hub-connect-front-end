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
        <Stack direction={{ base: "column", md: "row" }} gap={{ base: 2, md: 5 }} mx={8} my={2}>
            <h1 className="flex gap-1 items-center text-sm">
                <SlidersHorizontal size={20} /> Filtros
            </h1>

            <SelectRoot
                variant="outline"
                collection={categories}
                w={{ base: "100%", md: "250px" }}
                value={categorySelected}
                onValueChange={(details) => {
                    const selectedCategory = details.items[0]?.value;
                    if (selectedCategory) {
                        setCategorySelected([selectedCategory]);
                    }
                }}
            >
                <SelectTrigger
                    borderWidth={1}
                    borderColor="gray.300"
                    borderRadius="xl"
                    px={3}
                    _hover={{ shadow: "md" }}
                    _focus={{ ring: 2, ringColor: "blue.500" }}
                >
                    <SelectValueText placeholder="Escolha uma categoria" fontSize={14} />
                    <ChevronDown className="ml-auto text-gray-500" size={18} />
                </SelectTrigger>
                <SelectContent
                    maxHeight="48"
                    overflowY="auto"
                    borderRadius="xl"
                    boxShadow="lg"
                    bg={colorMode === "dark" ? "gray.900" : "white"}
                    style={{
                        position: "absolute",
                        zIndex: 999,
                        backgroundColor: `${colorMode === "dark" ? "bg-gray-900" : "bg-white"}`,
                        width: "250px",
                    }}
                >
                    {uniqueCategories.map((category) => (
                        <SelectItem
                            item={category}
                            key={category.value}
                            py={2}
                            px={4}
                            _hover={{ bg: "gray.100", color: "black" }}
                            fontSize="sm"
                        >
                            {category.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </SelectRoot>

            {categorySelected.length > 0 && (
                <div
                    className="border-2 border-red-600 text-red-600 rounded-lg p-2 text-sm flex items-center"
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
