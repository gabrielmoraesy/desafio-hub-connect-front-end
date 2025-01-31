import Link from 'next/link'
import React from 'react'

const NotFoundProducts = () => {
    return (
        <div className="flex flex-col items-center">
            <h1 className="mx-8 my-4">Não existem produtos em exibição, seja o primeiro a criar um produto!</h1>
            <Link href="/product/create" className="bg-[#009FE3] selection:text-white text-center cursor-pointer rounded-lg font-bold border-0 p-3 text-sm sm:text-base text-white">
                Criar produto
            </Link>
        </div>
    )
}

export default NotFoundProducts