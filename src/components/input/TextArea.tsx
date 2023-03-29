import React from "react";

type Props = {
  title: string;
  className?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export default function TextArea({
  title,
  onChange,
  placeholder,
  className = "",
}: Props) {
  return (
    <div
      className={`m-4 flex flex-col rounded border border-gray-300 p-4 ${className}`}
    >
      <label className="text-xs font-medium text-gray-700">
        {title.toUpperCase()}
      </label>
      <textarea
        className="text-md mt-2 flex-1 resize-none text-gray-700 focus:outline-none"
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}
