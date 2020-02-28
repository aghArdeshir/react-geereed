import { useState, useCallback } from 'react';

export function useGeereedEditor(): [
  number | null,
  (index: number | null) => void
] {
  const [editingIndex, setEditingIndex] = useState(null as number | null);

  const _setCurrentEditingIndex = useCallback((index?: number | null) => {
    if (index || index === 0) {
      setEditingIndex(index);
    } else {
      setEditingIndex(null);
    }
  }, []);

  return [editingIndex, _setCurrentEditingIndex];
}
