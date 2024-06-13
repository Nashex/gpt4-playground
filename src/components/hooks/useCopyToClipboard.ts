import { useState, useEffect } from "react";

type UseCopyToClipboardOutput = [boolean, () => void];

const useCopyToClipboard = (textToCopy: string): UseCopyToClipboardOutput => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = (): void => {
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
  };

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [copied]);

  return [copied, handleCopy];
};

export default useCopyToClipboard;

