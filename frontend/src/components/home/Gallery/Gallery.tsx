import clsx from "clsx";
import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import css from "./Gallery.module.css";
import GalleryLightbox from "../GalleryLightbox/GalleryLightbox";

interface ImgItem {
  id: number;
  src: string;
  alt: string;
}

const IMAGES: ImgItem[] = Array.from({ length: 18 }, (_, i) => ({
  id: i + 1,
  src: `/images/gallery/${i + 1}.webp`,
  alt: `Gallery image ${i + 1}`,
}));

interface Column {
  id: number;
  top?: ImgItem;
  bottom?: ImgItem;
}

function buildColumns(items: ImgItem[]): Column[] {
  const cols: Column[] = [];
  for (let i = 0; i < items.length; i += 2) {
    cols.push({ id: cols.length + 1, top: items[i], bottom: items[i + 1] });
  }
  return cols;
}

const BREAKPOINTS = { desktop: 1200, tablet: 768 };

function getVisibleColumns(width: number) {
  if (width >= BREAKPOINTS.desktop) return 3; // 6 images
  if (width >= BREAKPOINTS.tablet) return 2; // 4 images
  return 1; // 2 images
}

export default function Gallery() {
  const columns = useMemo(() => buildColumns(IMAGES), []);
  const [visibleCols, setVisibleCols] = useState(() =>
    getVisibleColumns(window.innerWidth)
  );
  const [startCol, setStartCol] = useState(0); // index of first fully visible column
  const trackRef = useRef<HTMLDivElement | null>(null);
  const firstColRef = useRef<HTMLDivElement | null>(null);
  const [colShiftPx, setColShiftPx] = useState(0); // width + gap per column
  const [activeImgIndex, setActiveImgIndex] = useState<number | null>(null);

  // Update visible columns on resize & recalc column width
  useEffect(() => {
    const onResize = () => {
      setVisibleCols((prev) => {
        const next = getVisibleColumns(window.innerWidth);
        if (next !== prev) return next;
        return prev;
      });
      measureColumnWidth();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Clamp startCol when visibleCols changes
  useEffect(() => {
    const max = Math.max(0, columns.length - visibleCols);
    setStartCol((s) => (s > max ? max : s));
  }, [visibleCols, columns.length]);

  const maxStart = Math.max(0, columns.length - visibleCols);
  const canPrev = startCol > 0;
  const canNext = startCol < maxStart;

  const goPrev = useCallback(() => {
    if (canPrev) setStartCol((s) => s - 1);
  }, [canPrev]);
  const goNext = useCallback(() => {
    if (canNext) setStartCol((s) => s + 1);
  }, [canNext]);

  // Measure column width + gap
  const measureColumnWidth = useCallback(() => {
    const colEl = firstColRef.current;
    if (!colEl) return;
    const w = colEl.getBoundingClientRect().width;
    // gap is 12px (see CSS). We add it so translation covers gap space.
    setColShiftPx(w + 12);
  }, []);

  useEffect(() => {
    measureColumnWidth();
  }, [visibleCols, measureColumnWidth]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goPrev, goNext]);

  const translateX = startCol * colShiftPx;

  return (
    <section
      id="gallery"
      className={css.container}
      aria-label="Галерея скролювана"
    >
      <div className={css.sliderWrapper}>
        <button
          className={clsx(css.arrowButton, css.previousButton)}
          aria-label="Попередні зображення"
          onClick={goPrev}
          disabled={!canPrev}
        >
          <img
            src="/icons/slider-arrow-icon.png"
            alt="Left arrow"
            className={css.arrow}
          />
        </button>
        <div className={css.viewport}>
          <div
            className={css.track}
            ref={trackRef}
            style={{ transform: `translateX(-${translateX}px)` }}
            aria-live="polite"
          >
            {columns.map((col, idx) => {
              const isFirst = idx === 0;
              return (
                <div
                  key={col.id}
                  className={css.column}
                  ref={isFirst ? firstColRef : undefined}
                  style={{
                    width: `calc((100% - ${
                      (visibleCols - 1) * 12
                    }px) / ${visibleCols})`,
                  }}
                  aria-hidden={
                    idx < startCol - 1 || idx > startCol + visibleCols
                  }
                >
                  {col.top && (
                    <button
                      className={css.imageWrapper}
                      onClick={() => setActiveImgIndex((col.id - 1) * 2)}
                    >
                      <img
                        src={col.top.src}
                        alt={col.top.alt}
                        loading="lazy"
                        className={css.image}
                      />
                    </button>
                  )}
                  {col.bottom && (
                    <button
                      className={css.imageWrapper}
                      onClick={() => setActiveImgIndex((col.id - 1) * 2 + 1)}
                    >
                      <img
                        src={col.bottom.src}
                        alt={col.bottom.alt}
                        loading="lazy"
                        className={css.image}
                      />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <button
          className={clsx(css.arrowButton, css.nextButton)}
          aria-label="Наступні зображення"
          onClick={goNext}
          disabled={!canNext}
        >
          <img
            src="/icons/slider-arrow-icon.png"
            alt="Right arrow"
            className={css.arrow}
          />
        </button>
      </div>
      <div className={css.descriptionWrapper}>
        <h2 className={css.title}>
          Cмотри,{" "}
          <span>
            как <br /> оживает легенда
          </span>
          <br /> в галереи проекта!
        </h2>
      </div>
      {activeImgIndex !== null && (
        <GalleryLightbox
          images={IMAGES}
          index={activeImgIndex}
          onClose={() => setActiveImgIndex(null)}
          onChange={(next) => setActiveImgIndex(next)}
        />
      )}
    </section>
  );
}
