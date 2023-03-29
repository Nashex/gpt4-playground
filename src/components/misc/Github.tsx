import Link from "next/link";
import React from "react";
import { BsGithub } from "react-icons/bs";

type Props = {};

export default function Github({}: Props) {
  return (
    <Link
      className="flex flex-col items-center border-white/10 py-2 text-primary/80 transition-colors hover:text-primary"
      href="https://github.com/Nashex/gpt4-playground"
    >
      <BsGithub className="text-3xl" />
    </Link>
  );
}
