import Link from 'next/link';
import { ColorModeButton } from '../ui/color-mode';
import { useState } from 'react';
import { List } from 'phosphor-react';
import { MenuMobile } from '../MenuMobile';
import { ShoppingCartIcon } from 'lucide-react';
import { useCart } from '@/contexts/CartContext/CartContext';
import CartDrawer from '../Drawers/CartDrawer/CartDrawer';

const Navbar = () => {
  const [isOpenMenuMobile, setIsOpenMenuMobile] = useState(false);
  const [isOpenCartDrawer, setIsOpenCartDrawer] = useState(false);
  const { totalQuantity } = useCart();

  return (
    <div className="w-full shadow-[0_-2px_10px_0_rgba(0,0,0,0.15)]">
      <div className="flex justify-between items-center max-w-[1270px] mx-auto p-6">
        <Link href="/" className="text-xl sm:text-2xl max-[768px]:ml-2 font-bold">
          Moraes<span className="text-[#009FE3] font-extrabold"> Store</span>
        </Link>

        <div className="flex items-center space-x-8">
          <div className='gap-4 hidden max-[1023px]:flex flex-row'>
            <div className='flex justify-center items-center gap-1 cursor-pointer' onClick={() => setIsOpenCartDrawer(true)}>
              <ShoppingCartIcon size={22} />
              <p>{totalQuantity}</p>
            </div>

            <List
              size={26}
              onClick={() => setIsOpenMenuMobile(true)}
              className="cursor-pointer"
            />
          </div>


          <ul className="hidden lg:flex items-center list-none space-x-4">
            <li>
              <Link
                href="/"
              >
                Produtos
              </Link>
            </li>

            <li>
              <Link href="/dashboard">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/product/create">
                Criar produto
              </Link>
            </li>
            <li>
              <Link href="/about">
                Saiba mais
              </Link>
            </li>

            <li className='flex justify-center items-center gap-1' onClick={() => setIsOpenCartDrawer(true)}>
              <ShoppingCartIcon />
              <p>{totalQuantity}</p>
            </li>

            <ColorModeButton />
          </ul>
        </div>
      </div>

      <CartDrawer
        isOpenCartDrawer={isOpenCartDrawer}
        setIsOpenCartDrawer={setIsOpenCartDrawer}
      />

      <MenuMobile
        isOpenMenuMobile={isOpenMenuMobile}
        setIsOpenMenuMobile={setIsOpenMenuMobile}
      />
    </div >
  );
};

export default Navbar