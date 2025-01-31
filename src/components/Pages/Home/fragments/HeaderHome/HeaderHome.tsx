import { DynamicPlaceholders } from "@/components/DynamicPlaceholders"
import { useColorMode } from "@/components/ui/color-mode"
import { IProduct } from "@/interfaces/IProduct"
import { AiOutlineClose } from "react-icons/ai"
import { BiSearch } from "react-icons/bi"

interface HeaderHomeProps {
    filteredProducts?: IProduct[]
    searchTitle: string
    setSearchTitle: React.Dispatch<React.SetStateAction<string>>
}

const HeaderHome = ({ filteredProducts, searchTitle, setSearchTitle }: HeaderHomeProps) => {
    const { colorMode } = useColorMode();

    return (
        <div className="relative flex justify-between items-center mx-8 group pt-6">
            <h1 className="text-sm sm:text-lg">Produtos</h1>
            <input
                type="text"
                onChange={(e) => setSearchTitle(e.target.value)}
                value={searchTitle}
                className="relative w-2/3 text-base px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-gray-500 sm:w-2/5 group"
            />

            {searchTitle.length < 1 && (
                <span className={`absolute left-[61%] transform text-base font-medium max-[850px]:hidden group-focus-within:hidden ${colorMode === "dark" && "text-white"}`}>
                    <DynamicPlaceholders products={filteredProducts} />
                </span>
            )}

            {searchTitle.trim() === "" ? (
                <div className="absolute right-[3%] sm:right-[1%]">
                    <BiSearch size={20} color={colorMode === "dark" ? "#fff" : "#000"} />
                </div>
            ) : (
                <button
                    className="absolute right-[1%] cursor-pointer"
                    onClick={() => setSearchTitle("")}
                    aria-label="Limpar"
                >
                    <AiOutlineClose size={20} color={colorMode === "dark" ? "#fff" : "#000"} />
                </button>
            )}
        </div>)
}

export default HeaderHome