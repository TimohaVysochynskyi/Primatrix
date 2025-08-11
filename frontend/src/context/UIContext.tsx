import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

interface UIContextValue {
  mobileHeroMenuOpen: boolean;
  toggleMobileHeroMenu: () => void;
  closeMobileHeroMenu: () => void;
}

const UIContext = createContext<UIContextValue | undefined>(undefined);

export const UIProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mobileHeroMenuOpen, setOpen] = useState(false);

  const toggleMobileHeroMenu = useCallback(() => setOpen((o) => !o), []);
  const closeMobileHeroMenu = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (mobileHeroMenuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [mobileHeroMenuOpen]);

  const value: UIContextValue = {
    mobileHeroMenuOpen,
    toggleMobileHeroMenu,
    closeMobileHeroMenu,
  };
  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used within UIProvider");
  return ctx;
}
