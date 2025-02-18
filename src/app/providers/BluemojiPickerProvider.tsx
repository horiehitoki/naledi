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

type Position = {
  top: number;
  left: number;
};

type EmojiPickerContextType = {
  isOpen: boolean;
  position: Position;
  target: Target;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  toggleOpen: (element: HTMLButtonElement, target: Target) => void;
};

const EmojiPickerContext = createContext<EmojiPickerContextType>({
  isOpen: false,
  position: { top: 0, left: 0 },
  target: { uri: "", cid: "" },
  setIsOpen: () => {},
  toggleOpen: () => {},
});

const calculatePickerPosition = (element: HTMLButtonElement) => {
  const rect = element.getBoundingClientRect();
  const scrollY = window.scrollY || document.documentElement.scrollTop;
  const scrollX = window.scrollX || document.documentElement.scrollLeft;

  return {
    top: rect.bottom + scrollY,
    left: rect.left + scrollX,
  };
};

export function EmojiPickerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [target, setTarget] = useState<Target>({ uri: "", cid: "" });
  const [position, setPosition] = useState<Position>({ top: 0, left: 0 });

  const toggleOpen = (element: HTMLButtonElement, target: Target) => {
    if (isOpen) {
      setIsOpen(!isOpen);
      return;
    }

    const { top, left } = calculatePickerPosition(element);

    setPosition({ top, left });
    setTarget(target);
    setIsOpen(!isOpen);
  };

  return (
    <EmojiPickerContext.Provider
      value={{ isOpen, position, target, setIsOpen, toggleOpen }}
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
