import Link from 'next/link';
import { ColorModeButton } from '../ui/color-mode';
import { useState } from 'react';
import { List } from 'phosphor-react';
import { MenuMobile } from '../MenuMobile';

export const Navbar = () => {
  const [menuIsVisible, setMenuIsVisible] = useState(false);

  return (
    <div className="w-full shadow-[0_-2px_10px_0_rgba(0,0,0,0.15)]">
      <div className="flex justify-between items-center max-w-[1270px] mx-auto p-6">
        <Link href="/" className="text-lg sm:text-2xl max-[768px]:ml-2 font-bold">
          Moraes<span className="text-[#009FE3] font-extrabold"> Store</span>
        </Link>

        <div className="flex items-center space-x-8">
          <List
            size={26}
            onClick={() => setMenuIsVisible(true)}
            className="cursor-pointer hidden max-[1023px]:block"
          />

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

            <ColorModeButton />
          </ul>
        </div>
      </div >

      {/* {showLogoutModal && (
        <ConfirmModal
          open={showLogoutModal}
          setOpen={setShowLogoutModal}
          onConfirm={handleLogout}
          onCancel={() => setShowLogoutModal((prevState) => !prevState)}
          title={"Sair da conta"}
          descripion={"Tem certeza que deseja sair da sua conta?"}
        />
      )} */}

      <MenuMobile
        menuIsVisible={menuIsVisible}
        setMenuIsVisible={setMenuIsVisible}
      />
    </div >
  );
};
