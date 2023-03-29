import Link from "next/link";
import React from "react";
import { BsGithub } from "react-icons/bs";

type Props = {};

export default function Github({}: Props) {
  return (
    <Link
      className="flex flex-col items-center border-white/10 text-primary/80 py-2 hover:text-primary transition-colors"
      href="https://github.com/Nashex/gpt4-playground"
    >
      <BsGithub className="text-3xl" />
    </Link>
  );
}
