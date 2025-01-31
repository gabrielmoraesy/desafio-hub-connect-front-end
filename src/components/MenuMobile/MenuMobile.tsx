import Link from "next/link";
import { X } from "phosphor-react";
import { useEffect } from "react";
import { ColorModeButton } from "../ui/color-mode";

interface NavbarProps {
  isOpenMenuMobile: boolean;
  setIsOpenMenuMobile: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MenuMobile = ({
  isOpenMenuMobile,
  setIsOpenMenuMobile,
}: NavbarProps) => {
  useEffect(() => {
    document.body.style.overflowY = isOpenMenuMobile ? "hidden" : "auto";
  }, [isOpenMenuMobile]);

  return (
    <section
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[rgba(17,18,17,0.4)] backdrop-blur-sm transition-all duration-500 ${isOpenMenuMobile ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none translate-y-12"
        }`}
    >
      <X
        size={32}
        onClick={() => setIsOpenMenuMobile(false)}
        className="absolute top-12 right-12 text-white transform transition-transform duration-700 hover:rotate-45 cursor-pointer"
      />
      <nav
        className={`flex flex-col items-center gap-8 transform transition-transform duration-700 ${isOpenMenuMobile ? "scale-100" : "scale-75"
          }`}
      >
        <Link
          href="/"
          className="text-2xl text-white"
          onClick={() => setIsOpenMenuMobile(false)}
        >
          Produtos
        </Link>
        <Link
          href="/dashboard"
          className="text-2xl text-white"
          onClick={() => setIsOpenMenuMobile(false)}
        >
          Dashboard
        </Link>

        <Link
          href="/product/create"
          className="text-2xl text-white"
          onClick={() => { setIsOpenMenuMobile(false) }}
        >
          Criar produto
        </Link>

        <Link
          href="/about"
          className="text-2xl text-white"
          onClick={() => setIsOpenMenuMobile(false)}
        >
          Saiba mais
        </Link>

        <ColorModeButton />
      </nav>
    </section>
  );
};
