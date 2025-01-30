import { IProduct } from "@/interfaces/IProduct";
import { TypeAnimation } from "react-type-animation";

interface IDynamicPlaceholders {
  products?: IProduct[];
}

export const DynamicPlaceholders = ({ products = [] }: IDynamicPlaceholders) => {
  const arrayTitleProducts = products.map((product: IProduct) => product.name);

  const sequence = arrayTitleProducts.flatMap((title) => [title, 1500]);

  const finalSequence = sequence.length > 0 ? sequence : ["Pesquise pelo nome do produto...", 1500];

  return (
    <TypeAnimation
      sequence={finalSequence}
      wrapper="span"
      speed={1}
      style={{ fontSize: "16px", display: "inline-block" }}
      repeat={Infinity}
    />
  );
};
