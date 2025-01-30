"use client";

import { Button } from "@chakra-ui/react";
import { useRouter } from "next13-progressbar";

export default function NotFound() {
  const router = useRouter();

  const handleGoToHome = () => {
    router.push("/");
  };

  return (
    <div
      className="flex flex-col items-center justify-center py-12 px-5"
    >
      <h1 className="text-9xl lg:text-[243px] font-medium text-pink">404</h1>
      <p
        className="mb-10 text-[14px] text-center font-normal text-gray-scale-500"
      >
        Página não encontrada. O que você está procurando está temporariamente
        indisponível ou foi removida.
      </p>
      <Button
        type="button"
        onClick={handleGoToHome}
        asChild
        variant="outline"
        className="max-w-[300px] bg-white text-black hover:bg-pink hover:text-white"
      >
        Voltar para a página inicial
      </Button>
    </div>
  );
}
