import { useEffect, useState, useCallback } from "react";
import css from "./GalleryLightbox.module.css";
import PopupOverlay from "../../shared/PopupOverlay/PopupOverlay";

export interface LightboxImage {
  src: string;
  alt: string;
}

interface Props {
  images: LightboxImage[];
  index: number;
  onClose: () => void;
  onChange: (next: number) => void;
}

export default function GalleryLightbox({
  images,
  index,
  onClose,
  onChange,
}: Props) {
  const [closing, setClosing] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setOpen(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const requestClose = useCallback(() => {
    setClosing(true);
  }, []);

  const handleTransitionEnd = (e: React.TransitionEvent) => {
    if (e.target === e.currentTarget && closing) onClose();
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") requestClose();
      if (e.key === "ArrowRight") onChange((index + 1) % images.length);
      if (e.key === "ArrowLeft")
        onChange((index - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [images.length, index, onChange, requestClose]);

  const wrapperCls = [css.wrapper];
  if (open && !closing) wrapperCls.push(css.open);
  if (closing) wrapperCls.push(css.closing);

  return (
    <PopupOverlay onClose={requestClose}>
      <div
        className={wrapperCls.join(" ")}
        onTransitionEnd={handleTransitionEnd}
        role="dialog"
        aria-modal="true"
      >
        <div className={css.modal} onClick={(e) => e.stopPropagation()}>
          <button
            className={css.closeBtn}
            aria-label="Close"
            onClick={requestClose}
          >
            <img
              src="/icons/close-icon.png"
              alt="Close"
              className={css.closeIcon}
            />
          </button>
          <button
            className={`${css.navButton} ${css.prev}`}
            aria-label="Previous image"
            onClick={() =>
              onChange((index - 1 + images.length) % images.length)
            }
          >
            <img
              src="/icons/slider-arrow-icon.png"
              alt="Prev"
              className={css.arrowIcon}
            />
          </button>
          <div className={css.imageFrame}>
            <div className={css.cornersWrapper}>
              <svg
                viewBox="0 0 208 115"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={css.corner}
              >
                <path d="M2 114.5V2H208" stroke="#5315FC" strokeWidth="4" />
              </svg>
              <svg
                viewBox="0 0 208 115"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={css.corner}
              >
                <path d="M2 114.5V2H208" stroke="#5315FC" strokeWidth="4" />
              </svg>
              <svg
                viewBox="0 0 208 115"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={css.corner}
              >
                <path d="M2 114.5V2H208" stroke="#5315FC" strokeWidth="4" />
              </svg>
              <svg
                viewBox="0 0 208 115"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={css.corner}
              >
                <path d="M2 114.5V2H208" stroke="#5315FC" strokeWidth="4" />
              </svg>
            </div>

            <img
              className={css.image}
              src={images[index].src}
              alt={images[index].alt}
            />
          </div>
          <button
            className={`${css.navButton} ${css.next}`}
            aria-label="Next image"
            onClick={() => onChange((index + 1) % images.length)}
          >
            <img
              src="/icons/slider-arrow-icon.png"
              alt="Next"
              className={css.arrowIcon}
            />
          </button>
          <div className={css.counter}>
            {index + 1} - {images.length}
          </div>
        </div>
      </div>
    </PopupOverlay>
  );
}
