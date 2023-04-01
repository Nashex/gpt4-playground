import React from "react";

type Props = {};

export default function ButtonContainer({
  ...props
}: JSX.IntrinsicElements["button"] & Props) {
  return (
    <button
      {...props}
      className="flex items-center gap-3 rounded p-3 transition-colors hover:bg-gray-500/10"
    />
  );
}
