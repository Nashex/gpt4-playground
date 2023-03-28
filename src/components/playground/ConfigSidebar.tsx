import { useOpenAI } from "@/context/OpenAIProvider";
import React from "react";
import Dropdown from "../input/Dropdown";
import Slider from "../input/Slider";
import { OpenAIConfig } from "@/utils/OpenAI";

type Props = {};

export default function ConfigSidebar({}: Props) {
  const { config, updateConfig } = useOpenAI();

  const handleUpdateConfig = <K extends keyof OpenAIConfig>(
    id: K,
    value: OpenAIConfig[K]
  ) => {
    updateConfig({
      [id]: value,
    });
  };

  return (
    <div className="flex flex-col min-w-[280px] p-4 items-stretch gap-y-4">
      <Dropdown
        label="Model"
        options={[
          { label: "gpt-4", value: "gpt-4" },
          { label: "gpt-3.5-turbo", value: "gpt-3.5-turbo" },
        ]}
        value={config.model}
        onSelect={(option) => handleUpdateConfig("model", option)}
      />
      <Slider
        label="temperature"
        range={[0, 1]}
        step={0.1}
        value={config.temperature}
        onChange={(value: OpenAIConfig["temperature"]) =>
          handleUpdateConfig("temperature", value)
        }
      />
    </div>
  );
}
