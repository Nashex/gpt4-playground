import { useOpenAI } from "@/context/OpenAIProvider";
import React from "react";
import { MdExpandMore } from "react-icons/md";

type Props = {
  label: string;
  options: { label: string; value: string }[];
  value: string;
  onSelect: (option: string) => void;
};

export default function Dropdown({ label, options, value, onSelect }: Props) {
  const [show, setShow] = React.useState(false);

  const handleSelect = (option: string) => {
    onSelect(option);
    setShow(false);
  };

  return (
    <div className="relative flex flex-col rounded">
      <label className="text-xs font-medium text-gray-700">
        {label.toUpperCase()}
      </label>
      <button
        className="text-md mt-2 flex flex-row items-center justify-between rounded border border-gray-300 p-2 text-gray-700 focus:outline-none"
        onClick={() => setShow(!show)}
      >
        {value}

        <MdExpandMore />
      </button>

      {show && (
        <div className="absolute bottom-0 right-0 z-10 flex min-w-full translate-y-[calc(100%+10px)] flex-col items-stretch rounded border border-gray-300 bg-white py-2 shadow">
          <span className="px-4 py-2 text-sm font-medium text-gray-700">
            {label.toUpperCase()}
          </span>
          {options.map((option, i) => (
            <button
              key={i}
              className={`px-4 py-2 text-left text-gray-700 ${
                value === option.value
                  ? "cursor-auto bg-blue-500 text-white"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
