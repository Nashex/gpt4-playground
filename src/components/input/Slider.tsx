import React from "react";
import { OpenAIConfig } from '@/utils/OpenAI';

type Props<K extends keyof OpenAIConfig> = {
  label: K;
  range: [number, number];
  step: number;
  value: OpenAIConfig[K];
  onChange: (value: number) => void;
};

export default function Slider({ label, range, step, value }: Props) {
  return (
    <div className="flex flex-col">
      <label className="text-xs font-medium text-gray-700">
        {label.toUpperCase()}
      </label>
    </div>
  );
}
