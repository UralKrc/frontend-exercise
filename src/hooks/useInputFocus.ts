import { useState, useCallback, useEffect, useRef } from "react";

export function useInputFocus<T extends HTMLInputElement>() {
  const inputRef = useRef<T>(null);
  const [shouldMaintainFocus, setShouldMaintainFocus] = useState(false);
  const [cursorPosition, setCursorPosition] = useState<number | null>(null);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<T>, onChange: (value: string) => void) => {
      setShouldMaintainFocus(true);
      setCursorPosition(e.target.selectionStart);
      onChange(e.target.value);
    },
    []
  );

  const handleInputFocus = useCallback(() => {
    setShouldMaintainFocus(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setTimeout(() => setShouldMaintainFocus(false), 100);
  }, []);

  const restoreFocus = useCallback(() => {
    setShouldMaintainFocus(true);
    setCursorPosition(0);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (
      shouldMaintainFocus &&
      inputRef.current &&
      document.activeElement !== inputRef.current
    ) {
      inputRef.current.focus();
      if (cursorPosition !== null) {
        inputRef.current.setSelectionRange(cursorPosition, cursorPosition);
      }
    }
  }, [shouldMaintainFocus, cursorPosition]);

  return {
    inputRef,
    handleInputChange,
    handleInputFocus,
    handleInputBlur,
    restoreFocus,
  };
}
