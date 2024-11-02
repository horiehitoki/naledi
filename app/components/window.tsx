"use client";

import { ReactNode, useState } from "react";
import { Rnd } from "react-rnd";
import { Maximize2, Minimize2, X } from "lucide-react";

type Props = {
  children: ReactNode;
  title: string;
  defaultPosition?: { x: number; y: number };
  defaultSize?: { width: number; height: number };
};

export default function Window({
  children,
  title,
  defaultPosition = { x: 500, y: 100 },
  defaultSize = { width: 1200, height: 1200 },
}: Props) {
  const [windowState, setWindowState] = useState({
    width: defaultSize.width,
    height: defaultSize.height,
    x: defaultPosition.x,
    y: defaultPosition.y,
    isVisible: true,
    isMaximized: false,
    previousState: null as {
      width: number;
      height: number;
      x: number;
      y: number;
    } | null,
  });

  if (!windowState.isVisible) {
    return null;
  }

  const handleMaximize = () => {
    setWindowState((prev) => {
      if (prev.isMaximized) {
        return {
          ...prev,
          isMaximized: false,
          ...(prev.previousState || {}),
        };
      } else {
        return {
          ...prev,
          isMaximized: true,
          previousState: {
            width: prev.width,
            height: prev.height,
            x: prev.x,
            y: prev.y,
          },
          width: window.innerWidth,
          height: window.innerHeight,
          x: 0,
          y: 0,
        };
      }
    });
  };

  return (
    <Rnd
      size={{
        width: windowState.width,
        height: windowState.height,
      }}
      position={{
        x: windowState.x,
        y: windowState.y,
      }}
      onDragStop={(e, d) =>
        setWindowState((prev) => ({ ...prev, x: d.x, y: d.y }))
      }
      onResizeStop={(e, direction, ref, delta, position) => {
        setWindowState((prev) => ({
          ...prev,
          width: parseInt(ref.style.width),
          height: parseInt(ref.style.height),
          ...position,
        }));
      }}
      minWidth={300}
      minHeight={400}
      bounds="window"
      dragHandleClassName="drag-handle"
      enableResizing={!windowState.isMaximized}
      disableDragging={windowState.isMaximized}
    >
      <div className="flex flex-col h-full rounded-lg shadow-2xl border border-slate-700 overflow-hidden backdrop-blur-md bg-opacity-95">
        <div className="drag-handle flex items-center justify-between px-3 py-2 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium select-none">{title}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleMaximize}
              className="hover:bg-slate-700 p-1.5 rounded-md transition-colors"
            >
              {windowState.isMaximized ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={() =>
                setWindowState((prev) => ({ ...prev, isVisible: false }))
              }
              className="hover:bg-slate-700 p-1.5 rounded-md transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="w-full overflow-scroll">{children}</div>
      </div>
    </Rnd>
  );
}
