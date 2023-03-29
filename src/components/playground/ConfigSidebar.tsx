import { useOpenAI } from "@/context/OpenAIProvider";
import React from "react";
import Dropdown from "../input/Dropdown";
import Slider from "../input/Slider";
import { OpenAIConfig } from "@/utils/OpenAI";

type Props = {};

export default function ConfigSidebar({  }: Props) {
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
    <div className="hidden md:flex flex-col min-w-[240px] p-4 items-stretch gap-y-4">
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
        range={[ 0, 1 ]}
        step={0.01}
        value={config.temperature as number}
        onChange={(value: OpenAIConfig["temperature"]) =>
          handleUpdateConfig("temperature", value)}
      />
      <Slider
        label="maximum length"
        range={[ 0, 8192 ]}
        step={1}
        value={config.max_tokens as number}
        onChange={(value: OpenAIConfig["max_tokens"]) =>
          handleUpdateConfig("max_tokens", value)}
      />
      <Slider
        label="top p"
        range={[ 0, 1 ]}
        step={0.01}
        value={config.top_p as number}
        onChange={(value: OpenAIConfig["top_p"]) =>
          handleUpdateConfig("top_p", value)}
      />
      <Slider
        label="frequency penalty"
        range={[ 0, 1 ]}
        step={0.01}
        value={config.frequency_penalty as number}
        onChange={(value: OpenAIConfig["frequency_penalty"]) =>
          handleUpdateConfig("frequency_penalty", value)}
      />
      <Slider
        label="presence penalty"
        range={[0, 1]}
        step={0.01}
        value={config.presence_penalty as number}
        onChange={(value: OpenAIConfig["presence_penalty"]) =>
          handleUpdateConfig("presence_penalty", value)
        }
      />
    </div>
  );
}
