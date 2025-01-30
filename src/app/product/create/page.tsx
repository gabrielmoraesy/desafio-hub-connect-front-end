"use client"

import CreateProductForm from "@/components/Form/CreateProductForm/CreateProductForm";

const CreateProduct = () => {
    return (
        <div className="flex flex-col items-center">
            <div className="pt-8 max-w-5xl w-full text-center px-4">
                <h1 className="text-xl sm:ext-2xl font-bold">Crie seu produto</h1>
                <p className="text-sm sm:text-lg mb-5">
                    Crie seu produto agora mesmo e exiba ele para o público
                </p>

                <CreateProductForm />
            </div>
        </div>
    );
};

export default CreateProduct

