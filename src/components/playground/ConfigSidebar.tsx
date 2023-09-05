import { useOpenAI } from "@/context/OpenAIProvider";
import React from "react";
import Dropdown from "../input/Dropdown";
import Slider from "../input/Slider";
import { OpenAIChatModels, OpenAIConfig } from "@/utils/OpenAI";
import useModels from "../hooks/useModels";

type Props = {};

export default function ConfigSidebar({}: Props) {
  const { config, updateConfig } = useOpenAI();
  const { models, loadingModels } = useModels();

  const handleUpdateConfig = <K extends keyof OpenAIConfig>(
    id: K,
    value: OpenAIConfig[K] | undefined
  ) => {
    updateConfig({
      [id]: value,
    });
  };

  return (
    <div className="hidden min-w-[240px] flex-col items-stretch gap-y-4 p-4 md:flex">
      <Dropdown
        label="Model"
        options={
          loadingModels
            ? []
            : (models.map(({ id }) => ({ label: id, value: id })) as any)
        }
        value={config.model}
        onSelect={(option) => handleUpdateConfig("model", option)}
      />
      <Slider
        label="temperature"
        range={[0, 1]}
        step={0.01}
        value={config.temperature as number}
        onChange={(value: OpenAIConfig["temperature"]) =>
          handleUpdateConfig("temperature", value)
        }
      />
      <Slider
        label="maximum length"
        range={[-1, OpenAIChatModels[config.model].maxLimit || 8192]}
        step={1}
        value={config.max_tokens as number}
        onChange={(value: OpenAIConfig["max_tokens"]) => {
          if (value === -1) {
            handleUpdateConfig("max_tokens", undefined)
          } else {
            handleUpdateConfig("max_tokens", value)
          }
        }}
      />
      <Slider
        label="top p"
        range={[0, 1]}
        step={0.01}
        value={config.top_p as number}
        onChange={(value: OpenAIConfig["top_p"]) =>
          handleUpdateConfig("top_p", value)
        }
      />
      <Slider
        label="frequency penalty"
        range={[0, 1]}
        step={0.01}
        value={config.frequency_penalty as number}
        onChange={(value: OpenAIConfig["frequency_penalty"]) =>
          handleUpdateConfig("frequency_penalty", value)
        }
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
