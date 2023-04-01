import React, { PropsWithChildren } from "react";

const PlaygroundContext = React.createContext<{
  showConversations: boolean;
  setShowConversations: (show: boolean) => void;
  toggleShowConversations: () => void;
}>({
  showConversations: false,
  setShowConversations: (show: boolean) => {},
  toggleShowConversations: () => {},
});

export default function PlaygroundProvider(props: PropsWithChildren) {
  const [showConversations, setShowConversations] = React.useState(false);

  const toggleShowConversations = () => {
    setShowConversations(!showConversations);
  };

  const value = React.useMemo(
    () => ({
      showConversations,
      setShowConversations,
      toggleShowConversations,
    }),
    [showConversations]
  );

  return <PlaygroundContext.Provider {...props} value={value} />;
}

export const usePlayground = () => React.useContext(PlaygroundContext);
