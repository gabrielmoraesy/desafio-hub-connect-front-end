"use client"

import { IProduct } from "@/interfaces/IProduct";
import CardProduct from "./fragments/CardProduct/CardProduct";
import HeaderHome from "./fragments/HeaderHome/HeaderHome";
import NotFoundProducts from "./fragments/NotFoundProducts/NotFoundProducts";
import SkeletonHome from "./fragments/SkeletonHome/SkeletonHome";
import UseHome from "./Home.hook";
import FilterProductsHome from "./fragments/FilterMoviesHome/FilterMoviesHome";

const HomeComponent = () => {
  const {
    categorySelected,
    setCategorySelected,
    products,
    filteredProducts,
    isLoading,
    searchTitle,
    setSearchTitle,
    handleAddToCart
  } = UseHome()

  if (isLoading) {
    return <SkeletonHome />
  }

  if (!filteredProducts) {
    return <NotFoundProducts />
  }

  console.log(filteredProducts)

  return (
    <div className="mx-auto max-w-screen-xl text-lg">
      <HeaderHome filteredProducts={filteredProducts} searchTitle={searchTitle} setSearchTitle={setSearchTitle} />

      <FilterProductsHome
        products={products}
        categorySelected={categorySelected}
        setCategorySelected={setCategorySelected}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mx-8 my-8">
        {filteredProducts && filteredProducts?.map((product: IProduct) => (
          <CardProduct product={product} handleAddToCart={handleAddToCart} key={product.id} />
        ))}
      </div>
    </div>
  );
};

export default HomeComponent
