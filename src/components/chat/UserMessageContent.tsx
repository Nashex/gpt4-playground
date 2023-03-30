import React from "react";

type Props = {
  content: string;
};

export default function UserMessageContent({ content }: Props) {
  return <div className="whitespace-pre-line">{content}</div>;
}
