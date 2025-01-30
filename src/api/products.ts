// src/services/productService.ts

import { IProduct } from "@/interfaces/IProduct";
import { api } from "@/services/api";
import { useQuery, useMutation, useQueryClient, UseQueryOptions } from "@tanstack/react-query";
import { toaster } from "@/components/ui/toaster";

interface IProductResponse {
    dados: IProduct[]
    mensagem: string
    status: boolean
}

interface IProductResponseById {
    dados: IProduct
    mensagem: string
    status: boolean
}

export const useProductService = () => {
    const queryClient = useQueryClient();

    const useGetProducts = () =>
        useQuery<IProduct[], Error>({
            queryKey: ["product"],
            queryFn: async () => {
                const { data } = await api.get<IProductResponse>(`/product`);
                return data.dados;
            },
            onError: (error: Error) => {
                toaster.create({
                    title: `Erro ao buscar produtos`,
                    description: error.message,
                    type: "error",
                });
            }
        } as UseQueryOptions<IProduct[], Error>);

    const useGetProductById = (id: string) =>
        useQuery<IProduct, Error>({
            queryKey: ["product", id],
            queryFn: async () => {
                const { data } = await api.get<IProductResponseById>(`/product/${id}`);

                console.log("produto:", data.dados)
                return data.dados;
            },
            onError: (error: Error) => {
                toaster.create({
                    title: `Erro ao buscar produto com ID ${id}`,
                    description: error.message,
                    type: "error",
                });
            }
        } as UseQueryOptions<IProduct, Error>);


    const createProduct = useMutation<IProduct, Error, IProduct>({
        mutationFn: async (newProduct: IProduct) => {
            const { data } = await api.post<IProduct>("/product", newProduct);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            toaster.create({
                title: "Produto criado com sucesso",
                description: "O produto foi adicionado com sucesso.",
                type: "success",
            });
        },
        onError: (error: Error) => {
            toaster.create({
                title: "Erro ao criar produto",
                description: error.message,
                type: "error",
            });
        },
    });

    const updateProduct = useMutation<IProduct, Error, { id: string; updatedProduct: IProduct }>({
        mutationFn: async ({ id, updatedProduct }) => {
            const { data } = await api.put<IProduct>(`/product/${id}`, updatedProduct);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            toaster.create({
                title: "Produto atualizado com sucesso",
                description: "O produto foi atualizado com sucesso.",
                type: "success",
            });
        },
        onError: (error: Error) => {
            toaster.create({
                title: "Erro ao atualizar produto",
                description: error.message,
                type: "error",
            });
        },
    });

    const deleteProduct = useMutation<void, Error, number>({
        mutationFn: async (idProduct: number) => {
            await api.delete(`/product/${idProduct}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            toaster.create({
                title: "Produto deletado com sucesso",
                description: "O produto foi deletado.",
                type: "success",
            });
        },
        onError: (error: Error) => {
            toaster.create({
                title: "Erro ao deletar produto",
                description: error.message,
                type: "error",
            });
        },
    });

    return {
        useGetProducts,
        useGetProductById,
        createProduct,
        updateProduct,
        deleteProduct,
    };
};
