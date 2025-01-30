"use client";

import { useColorMode } from "@/components/ui/color-mode";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next13-progressbar";

export default function Error({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { colorMode } = useColorMode();
  const router = useRouter();

  const handleGoToHome = () => {
    router.push("/");
  };

  return (
    <div className="flex h-[70vh] flex-col items-center justify-center">
      <h1 className="text-base text-pink">Erro ao carregar a página</h1>
      <p className="mb-4 text-3xl text-gray-scale-500">
        Algo de errado aconteceu.
      </p>
      <Button
        type="button"
        onClick={handleGoToHome}
        variant="outline"
        className={`max-w-[300px] border p-2 ${colorMode === "dark" ? "border-[#fff]" : "border-[#000]"}`}
      >
        Voltar para a página inicial
      </Button>
    </div>
  );
}
