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
    <div className="flex flex-col rounded relative">
      <label className="text-xs font-medium text-gray-700">
        {label.toUpperCase()}
      </label>
      <button
        className="mt-2 flex flex-row justify-between items-center text-md p-2 text-gray-700 focus:outline-none border border-gray-300 rounded"
        onClick={() => setShow(!show)}
      >
        {value}

        <MdExpandMore />
      </button>

      {show && (
        <div className="absolute z-10 border flex flex-col items-stretch min-w-full border-gray-300 py-2 bg-white rounded shadow bottom-0 right-0 translate-y-[calc(100%+10px)]">
          <span className="text-sm font-medium text-gray-700 py-2 px-4">
            {label.toUpperCase()}
          </span>
          {options.map((option, i) => (
            <button
              key={i}
              className={`text-left py-2 px-4 text-gray-700 ${
                value === option.value
                  ? "bg-blue-500 text-white cursor-auto"
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
