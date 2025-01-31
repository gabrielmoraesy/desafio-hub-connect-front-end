import { z } from "zod";

export const createOrEditProductSchema = z.object({
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
        .min(1, "Preço não pode ser zero ou negativo")
        .max(10000000, "Preço não pode ser maior que 10.000.000"),
    category: z.string().nonempty("Categoria é obrigatória"),
    image: z
        .instanceof(FileList)
        .optional()
        .refine((val) => !val || val.length === 0 || val[0] instanceof File, {
            message: "Imagem inválida",
        }),
});

export type CreateOrEditProductFormInputs = z.infer<typeof createOrEditProductSchema>;
