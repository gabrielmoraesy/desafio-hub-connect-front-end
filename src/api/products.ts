/* eslint-disable @typescript-eslint/no-explicit-any */
import { useToast } from "@/contexts/ToastContext";
import { IProduct } from "@/interfaces/IProduct";
import { api } from "@/services/api";
import { useQuery, useMutation, useQueryClient, UseQueryOptions } from "@tanstack/react-query";

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
    const { showToast } = useToast();

    const useGetProducts = () =>
        useQuery<IProduct[], Error>({
            queryKey: ["product"],
            queryFn: async () => {
                const { data } = await api.get<IProductResponse>("/product");
                return data.dados;
            },
            onError: (error: unknown) => {
                const err = error as Error;

                showToast("error", {
                    title: "Erro ao buscar produtos!",
                    description: err.message,
                });
            },
        } as UseQueryOptions<IProduct[], Error>);

    const useGetProductById = (id: string) =>
        useQuery<IProduct, Error>({
            queryKey: ["product", id],
            queryFn: async () => {
                const { data } = await api.get<IProductResponseById>(`/product/${id}`);
                return data.dados;
            },
            onError: (error: unknown) => {
                const err = error as Error;

                showToast("error", {
                    title: `Erro ao buscar produto com ID ${id}`,
                    description: err.message,
                });
            },
        } as UseQueryOptions<IProduct, Error>);

    const createProduct = useMutation<IProduct, Error, FormData>({
        mutationFn: async (newProduct: FormData) => {
            const { data } = await api.post<IProduct>("/product", newProduct, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });

            showToast("success", {
                title: "Produto criado",
            });
        },
        onError: (error: any) => {
            showToast("error", {
                title: "Erro ao criar produtos!",
                description: error.response.data,
            });
        },
    });

    const updateProduct = useMutation<IProduct, Error, { id: string; updateProduct: FormData }>({
        mutationFn: async ({ id, updateProduct }) => {
            const { data } = await api.patch<IProduct>(`/product/${id}`, updateProduct, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });

            showToast("success", {
                title: "Produto editado",
            });
        },
        onError: (error: any) => {
            showToast("error", {
                title: "Erro ao editar produto",
                description: error.response.data,
            });
        },
    });

    const deleteProduct = useMutation<void, Error, number>({
        mutationFn: async (idProduct: number) => {
            await api.delete(`/product/${idProduct}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });

            showToast("success", {
                title: "Produto deletado",
            });
        },
        onError: (error: Error) => {
            showToast("error", {
                title: "Erro ao excluir produto",
                description: error.message,
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
