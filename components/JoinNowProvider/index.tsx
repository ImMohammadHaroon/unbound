"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import JoinNowModal from "@/components/JoinNowModal";

type JoinNowContextValue = {
  openJoinModal: () => void;
  closeJoinModal: () => void;
};

const JoinNowContext = createContext<JoinNowContextValue | null>(null);

export function useJoinNow() {
  const context = useContext(JoinNowContext);
  if (!context) {
    throw new Error("useJoinNow must be used within JoinNowProvider");
  }
  return context;
}

const AUTO_OPEN_DELAY_MS = 10000;

export default function JoinNowProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const hasOpenedRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openJoinModal = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    hasOpenedRef.current = true;
    setIsOpen(true);
  }, []);

  const closeJoinModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      if (!hasOpenedRef.current) {
        hasOpenedRef.current = true;
        setIsOpen(true);
      }
    }, AUTO_OPEN_DELAY_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <JoinNowContext.Provider value={{ openJoinModal, closeJoinModal }}>
      {children}
      <JoinNowModal isOpen={isOpen} onClose={closeJoinModal} />
    </JoinNowContext.Provider>
  );
}
