import { useEffect } from "react";
import css from "./PopupOverlay.module.css";

interface Props {
  children: React.ReactNode;
  onClose: () => void;
  className?: string; // optional extra classes for overlay root
}

export default function PopupOverlay({ children, onClose, className }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  return (
    <div
      className={`${css.overlay} ${className || ""}`.trim()}
      onClick={onClose}
    >
      <div className={css.center}>{children}</div>
    </div>
  );
}
