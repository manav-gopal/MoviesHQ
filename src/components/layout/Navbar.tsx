"use client";

import React from "react";
import Link from "next/link";
import "@/styles/components/layout/Navbar.scss";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "@/assets/image/MoviesHQLogo.png";
import SearchBar from "@/components/ui/SearchBar/SearchBar";
const Navbar = () => {
  const router = useRouter();

  function onSubmitAi(searchValue: string) {
    if (!searchValue) return;
    router.push(`/search?q=${searchValue}`);
  }

  return (
    <nav className="navbar">
      <section
        className="title"
        onClick={() => {
          router.push("/home");
        }}
      >
        <Image src={logo} alt="logo Not Found" priority />
      </section>
      <section className="links">
        <Link href="#">Home</Link>
        <Link href="#">Movies</Link>
        <Link href="#">TV Shows</Link>
        <Link href="#">Genres</Link>
        <Link href="#">My List</Link>
      </section>
      <section className="form-container">
        <SearchBar onSubmit={onSubmitAi} />
      </section>
    </nav>
  );
};

export default Navbar;
