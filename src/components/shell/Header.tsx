import React from "react";

type Props = {};

export default function Header({  }: Props) {
  return (
    <div className="h-[60px] flex flex-row items-center p-4 border-b border-gray-300">
      <span className="font-bold text-lg">Playground</span>
    </div>
  );
}
