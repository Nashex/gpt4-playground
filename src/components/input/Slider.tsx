import React from "react";
import { OpenAIConfig } from "@/utils/OpenAI";
import ReactSlider from "react-slider";

type Props = {
  label: string;
  range: [number, number];
  step: number;
  value: number;
  onChange: (value: number) => void;
};

export default function Slider({ label, range, step, value, onChange }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Clamp value to range
    const value = Math.min(
      Math.max(Number(e.target.value), range[0]),
      range[1]
    );

    // If step < 1 then round
    const roundedValue = step < 1 ? Math.round(value) : value;

    if (isNaN(roundedValue)) return;

    onChange(roundedValue);
  };

  return (
    <div className="flex flex-col items-stretch">
      <div className="flex flex-row items-center py-1 justify-between">
        <div className="flex text-xs basis-9/12 font-medium text-gray-700">
          {label.toUpperCase()}
        </div>
        <input
          className="text-md text-right px-1 w-14 text-gray-700 focus:outline focus:outline-blue-500 rounded"
          type="text"
          value={value}
          onChange={handleChange}
        />
      </div>

      <ReactSlider
        className="flex-1 mt-2"
        thumbClassName="bg-white border-2 border-gray-300 text-white h-4 w-4 -translate-y-[calc((1rem-.25rem)/2)] rounded-full"
        trackClassName="bg-gray-300 h-1 rounded"
        min={range[0]}
        max={range[1]}
        step={step}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
