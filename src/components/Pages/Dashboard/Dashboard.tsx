"use client"

import ProductsDashbords from "./fragments/ProductsDashbords/ProductsDashbords";

const DashbordProductsComponent = () => {
  return (
    <div className="pt-4 sm:pt-8 min-h-screen max-w-7xl mx-auto text-center pb-10">
      <h1 className="text-xl sm:text-2xl font-bold">Dashboard</h1>
      <h3 className="text-sm sm:text-lg font-normal">Gerencie todos os seus produtos</h3>
      <div className="flex justify-between font-bold border-b-2 border-gray-300 w-4/5 mx-auto py-2">
        <span className="text-sm sm:text-base">Título</span>
        <span className="text-sm sm:text-base">Ações</span>
      </div>

      <ProductsDashbords />
    </div>
  );
};

export default DashbordProductsComponent
