"use client"

import { useProductService } from "@/api/products";
import { useColorMode } from "@/components/ui/color-mode";
import { IProduct } from "@/interfaces/IProduct";
import { Button, FormatNumber } from "@chakra-ui/react";
import { useRouter } from "next13-progressbar";
import SkeletonHome from "./fragments/SkeletonHome/SkeletonHome";
import Link from "next/link";
import { useState } from "react";
import HeaderHome from "./fragments/HeaderHome/HeaderHome";

const HomeComponent = () => {
  const { colorMode } = useColorMode();
  const router = useRouter()

  const { useGetProducts } = useProductService();
  const { data: products, isLoading } = useGetProducts();

  const [searchTitle, setSearchTitle] = useState("");

  if (isLoading) {
    return <SkeletonHome />
  }

  return (
    <div className="mx-auto max-w-screen-xl text-lg">
      <HeaderHome filteredProducts={products} searchTitle={searchTitle} setSearchTitle={setSearchTitle} />

      {/* <FilterMoviesHome
        movies={movies}
        genreSelected={genreSelected}
        setGenreSelected={setGenreSelected}
        releaseYearSelected={releaseYearSelected}
        setReleaseYearSelected={setReleaseYearSelected}
        durationSelected={durationSelected}
        setDurationSelected={setDurationSelected}
      /> */}

      {products!.length <= 0 &&
        <div className="flex flex-col items-center">
          <h1 className="mx-8 my-4">Não existem produtos em exibição, seja o primeiro a criar um produto!</h1>
          <Link href="/product/create" className="bg-[#009FE3] selection:text-white text-center cursor-pointer rounded-lg font-bold border-0 p-3 text-sm sm:text-base text-white">
            Criar produto
          </Link>
        </div>
      }

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mx-8 my-8">
        {products?.map((product: IProduct) => (
          <div
            key={product.id}
            className={`flex flex-col justify-between items-center p-8 rounded-2xl shadow-lg hover:shadow-2xlxl transition-shadow min-h-[250px] ${colorMode === "dark" ? "bg-[#161616]" : ""}`}
            onClick={() => router.push(`/product/${product.id}`)}
          >
            <div className="flex flex-col items-center gap-2">
              <h2 className="text-base sm:text-xl font-bold">{product.name}</h2>
              <p className="text-sm sm:text-lg">
                {product.category}
                <span> | </span>
                <FormatNumber value={product.price} style="currency" currency="BRL" />
              </p>
            </div>

            <Button
              onClick={() => router.push(`/product/${product.id}`)}
              className={`text-sm sm:text-base w-[60%] p-1 rounded-lg font-bold duration-200 hover:opacity-60
                ${colorMode === "dark"
                  ? "border-2 border-[#009FE3] bg-[#009FE3]"
                  : "border-2 border-[#009FE3] text-white bg-[#009FE3]"}`}
            >
              Ver produto
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeComponent
