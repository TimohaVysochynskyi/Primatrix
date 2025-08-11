import css from "./NewsCard.module.css";

export default function NewsCard() {
  return (
    <>
      <div className={css.card}>
        <div className={css.image}></div>
        <div className={css.content}>
          <div className={css.textWrapper}>
            <h3 className={css.title}>Lorem ipsum</h3>
            <p className={css.description}>
              Figma ipsum component variant main layer. Layout distribute scale
              style vector edit pencil slice slice.Figmagghh
            </p>
          </div>
          <div className={css.row}>
            <span className={css.date}>08.08.2025</span>
            <button className={css.button}>Подробнее</button>
          </div>
        </div>
      </div>
    </>
  );
}
