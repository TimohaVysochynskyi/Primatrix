import { useEffect, useRef, useState, useCallback } from "react";
import NewsCard from "../NewsCard/NewsCard";
import css from "./News.module.css";

export default function News() {
  const listRef = useRef<HTMLUListElement | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [cardWidth, setCardWidth] = useState<number>(0);

  const update = useCallback(() => {
    const el = listRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanPrev(scrollLeft > 5);
    setCanNext(scrollLeft + clientWidth < scrollWidth - 5);
    // Визначаємо ширину одного слайду (li)
    const first = el.querySelector("li");
    if (first) {
      const rect = (first as HTMLElement).getBoundingClientRect();
      setCardWidth(rect.width + 20); // + gap
    }
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  const scrollBy = (dir: 1 | -1) => {
    const el = listRef.current;
    if (!el) return;
    const delta = cardWidth || el.clientWidth * 0.6;
    el.scrollBy({ left: delta * dir, behavior: "smooth" });
  };

  const handlePrev = () => scrollBy(-1);
  const handleNext = () => scrollBy(1);

  return (
    <section className={css.container} id="news">
      <h2 className={css.title}>
        Новости <span>о проекте</span>
      </h2>
      <div className={css.sliderWrapper}>
        {canPrev && <div className={css.gradientLeft}></div>}
        {canNext && <div className={css.gradientRight}></div>}
        <ul className={css.slides} ref={listRef} onScroll={update}>
          {Array.from({ length: 8 }).map((_, i) => (
            <li className={css.slide} key={i}>
              <NewsCard />
            </li>
          ))}
        </ul>
        <button
          className={`${css.arrowButton} ${css.arrowLeft}`}
          onClick={handlePrev}
          disabled={!canPrev}
          aria-label="Попередні новини"
        >
          <img
            src="/icons/slider-arrow-icon.png"
            alt="Left arrow"
            className={css.arrowIcon}
          />
        </button>
        <button
          className={`${css.arrowButton} ${css.arrowRight}`}
          onClick={handleNext}
          disabled={!canNext}
          aria-label="Наступні новини"
        >
          <img
            src="/icons/slider-arrow-icon.png"
            alt="Right arrow"
            className={css.arrowIcon}
          />
        </button>
      </div>
    </section>
  );
}
