import { Cursor } from "@types";
import { useState } from "react";

export const useCursor = () => {
  const [cursors, setCursors] = useState<Cursor[]>([]);

  const createCursor = (id: string, defaultValue: string) => {
    setCursors((prev) => {
      // 既に存在する場合は作成しない
      if (prev.some((cursor) => cursor.id === id)) {
        return prev;
      }
      return [...prev, { id, cursor: defaultValue }];
    });
  };

  const readCursor = (id: string): Cursor | undefined => {
    return cursors.find((cursor) => cursor.id === id);
  };

  const updateCursor = (id: string, value: string) => {
    setCursors((prev) =>
      prev.map((cursor) =>
        cursor.id === id ? { ...cursor, cursor: value } : cursor
      )
    );
  };

  const deleteCursor = (id: string) => {
    setCursors((prev) => prev.filter((cursor) => cursor.id !== id));
  };

  return {
    createCursor,
    readCursor,
    updateCursor,
    deleteCursor,
    cursors,
  };
};
