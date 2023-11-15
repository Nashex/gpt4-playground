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
    value: OpenAIConfig[K] | boolean | undefined
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
        range={[0, OpenAIChatModels[config.model].maxLimit || 8192]}
        step={1}
        value={config.max_tokens as number}
        onChange={(value: OpenAIConfig["max_tokens"]) =>
          handleUpdateConfig("max_tokens", value)
        }
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
      <div className="flex flex-col items-stretch">
        <div className="flex flex-row items-center justify-between py-1">
          <label
            htmlFor="ignore_eos"
            className="flex basis-9/12 select-none text-xs font-medium uppercase text-gray-700"
          >
            Ignore EOS
          </label>
          <input
            name="ignore_eos"
            id="ignore_eos"
            type="checkbox"
            checked={config.ignore_eos}
            onChange={() =>
              handleUpdateConfig("ignore_eos", !config.ignore_eos)
            }
            className="text-md rounded px-1 text-right text-gray-700 focus:outline focus:outline-blue-500"
          />
        </div>
      </div>
      <div className="flex flex-col items-stretch">
        <div className="flex flex-row items-center justify-between py-1">
          <label
            htmlFor="skip_special_tokens"
            className="flex basis-9/12 select-none text-xs font-medium uppercase text-gray-700"
          >
            Skip Special Tokens
          </label>
          <input
            name="skip_special_tokens"
            id="skip_special_tokens"
            type="checkbox"
            checked={config.skip_special_tokens}
            onChange={() =>
              handleUpdateConfig(
                "skip_special_tokens",
                !config.skip_special_tokens
              )
            }
            className="text-md rounded px-1 text-right text-gray-700 focus:outline focus:outline-blue-500"
          />
        </div>
      </div>
      <div className="flex flex-col items-stretch">
        <label
          htmlFor="stop"
          className="flex basis-9/12 select-none text-xs font-medium uppercase text-gray-700"
        >
          Stop
        </label>
        <input
          name="stop"
          id="stop"
          type="text"
          value={config.stop}
          onChange={(e) =>
            handleUpdateConfig(
              "stop",
              e.target.value === "" ? [] : e.target.value.split(",")
            )
          }
          className="mt-1 text-md rounded border-gray-300 border px-1 text-right text-gray-700 focus:outline focus:outline-blue-500"
        />
      </div>
    </div>
  );
}
