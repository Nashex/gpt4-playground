import React from "react";

type Props = {
  title: string;
  className?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export default function TextArea({
  title,
  placeholder,
  className = "",
  value,
  onChange,
}: Props) {
  const [value_, setValue] = React.useState<string>(value || "");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    onChange?.(e);
  };

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
        value={value_}
        onChange={handleChange}
      />
    </div>
  );
}
