import { Component } from "lucide-react";
import Link from "next/link";
import { FaCloud, FaEnvelope, FaGithub, FaInstagram, FaLinkedin, FaMicrosoft, FaPhone, FaRegFileAlt } from "react-icons/fa";
import { SiDocker, SiDotnet, SiNextdotjs, SiReact, SiTailwindcss, SiTypescript, SiZod } from "react-icons/si";

const AboutComponent = () => {
  return (
    <div className="min-h-screen max-w-4xl mx-auto p-4 sm:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4">
        Sobre o <span className="text-[#009FE3] font-extrabold">Moraes Store</span>
      </h1>
      <p className="text-base sm:text-lg mb-4">
        O Moraes Store é uma aplicação de gerenciamento de produtos, permitindo que os usuários adicionem, editem e excluam seus produtos. O projeto foi desenvolvido com tecnologias modernas:
      </p>
      <ul className="list-disc pl-5 mb-4">
        <li className="flex items-center mb-2">
          <SiTypescript className="text-2xl mr-2" />
          <SiReact className="text-2xl mr-2" />
          <SiNextdotjs className="text-2xl mr-2" />
          <SiTailwindcss className="text-2xl mr-2" />
          <span><strong>Front-end:</strong> TypeScript, React, NextJs e Tailwind CSS.</span>
        </li>
        <li className="flex items-center mb-2">
          <SiDotnet className="text-2xl mr-2" />
          <span><strong>Back-end:</strong> C# .Net 8</span>
        </li>
        <li className="flex items-center mb-2">
          <FaMicrosoft className="text-2xl mr-2" />
          <span><strong>Banco de Dados:</strong> SQL Server</span>
        </li>
        <li className="flex items-center mb-2">
          <Component className="text-2xl mr-2" />
          <span><strong>Componentes:</strong> Chakra ui</span>
        </li>
        <li className="flex items-center mb-2">
          <SiZod className="text-2xl mr-2" />
          <FaRegFileAlt className="text-2xl mr-2" />
          <span><strong>Validações:</strong> Zod e React Hook Form</span>
        </li>
        <li className="flex items-center mb-2">
          <FaCloud className="text-2xl mr-2" />
          <span><strong>Requisições HTTP:</strong> Axios</span>
        </li>
        <li className="flex items-center mb-2">
          <SiDocker className="text-2xl mr-2" />
          <span><strong>Containerização:</strong> Docker</span>
        </li>
      </ul>
      <p className="text-base sm:text-lg mb-4">
        Com uma interface amigável, o Moraes Store facilita a gestão de seus de produtos.
      </p>
      <div className="flex flex-wrap justify-center gap-6 mt-6">
        <Link href="https://github.com/gabrielmoraesy" target="_blank" className="flex items-center">
          <FaGithub className="text-2xl" />
          <span className="ml-2">Github</span>
        </Link>
        <Link href="https://www.linkedin.com/in/gabrielmoraespires/" target="_blank" className="flex items-center">
          <FaLinkedin className="text-2xl" />
          <span className="ml-2">LinkedIn</span>
        </Link>
        <Link href="https://www.instagram.com/moraesdev/" target="_blank" className="flex items-center">
          <FaInstagram className="text-2xl" />
          <span className="ml-2">Instagram</span>
        </Link>
        <Link href="mailto:ygabrielmoraes@gmail.com" className="flex items-center" target="_blank">
          <FaEnvelope className="text-2xl" />
          <span className="ml-2">Email</span>
        </Link>
        <Link href="tel:+5521964277805" className="flex items-center">
          <FaPhone className="text-2xl" />
          <span className="ml-2">Telefone</span>
        </Link>
        <Link href="https://wa.me/5521964277805" className="flex items-center" target="_blank">
          <FaPhone className="text-2xl" />
          <span className="ml-2">WhatsApp</span>
        </Link>
      </div>
    </div>
  );
};

export default AboutComponent;
