"use client";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

type Target = {
  uri: string;
  cid: string;
};

type EmojiPickerContextType = {
  isOpen: boolean;
  target: Target;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  toggleOpen: (target: Target) => void;
};

const EmojiPickerContext = createContext<EmojiPickerContextType>({
  isOpen: false,
  target: { uri: "", cid: "" },
  setIsOpen: () => {},
  toggleOpen: () => {},
});

export function EmojiPickerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [target, setTarget] = useState<Target>({ uri: "", cid: "" });

  const toggleOpen = (target: Target) => {
    if (isOpen) {
      setIsOpen(!isOpen);
      return;
    }

    setTarget(target);
    setIsOpen(!isOpen);
  };

  return (
    <EmojiPickerContext.Provider
      value={{ isOpen, target, setIsOpen, toggleOpen }}
    >
      {children}
    </EmojiPickerContext.Provider>
  );
}

export function useEmojiPicker() {
  const context = useContext(EmojiPickerContext);

  if (context === undefined) {
    throw new Error("useEmojiPicker must be used within a EmojiPickerProvider");
  }
  return context;
}
