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

export type CreateOrEditProductFormInputs = z.infer<typeof createOrEditProductSchema>;
