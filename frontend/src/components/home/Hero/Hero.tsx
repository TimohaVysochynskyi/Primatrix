import css from "./Hero.module.css";
import { useScrollToSection } from "../../../hooks/useScrollToSection";
import { useUI } from "../../../context/UIContext";

export default function Hero() {
  const scrollToSection = useScrollToSection(150);
  const { mobileHeroMenuOpen, closeMobileHeroMenu } = useUI();

  return (
    <>
      <div className={css.hero}>
        <nav className={`${css.nav} ${mobileHeroMenuOpen ? css.open : ""}`}>
          <ul className={css.list}>
            <li>
              <button
                className={css.link}
                onClick={() => scrollToSection("news")}
              >
                Новости
              </button>
            </li>
            <li>
              <button
                className={css.link}
                onClick={() => scrollToSection("gallery")}
              >
                Галерея
              </button>
            </li>
            <li>
              <button
                className={css.link}
                onClick={() => scrollToSection("subscribe")}
              >
                Подписка на новости
              </button>
            </li>
            <li>
              <button
                className={css.link}
                onClick={() => scrollToSection("ideas")}
              >
                Сбор идей
              </button>
            </li>
            <li>
              <button
                className={css.link}
                onClick={() => scrollToSection("contacts")}
              >
                Контакты
              </button>
            </li>
          </ul>
        </nav>
        {mobileHeroMenuOpen && (
          <div
            onClick={closeMobileHeroMenu}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.4)",
              zIndex: 150,
            }}
          />
        )}
        <div className={css.content}>
          <div className={css.titleWrapper}>
            <h2 className={css.title}>
              Добро пожаловать в будущее, где искра — <span>начало всего.</span>
            </h2>
            <p className={css.description}>
              PRIMATRIX: Rise of Sparkborn — новая оригинальная sci-fi-сага о
              трансформирующихся цивилизациях, древних конфликтах и великой
              тайне Искры.
            </p>
          </div>
          <div className={css.actions}>
            <div className={css.windows}>
              <img
                src="/icons/windows-icon.png"
                alt="Windows"
                className={css.windowsIcon}
              />
              <span className={css.windowsText}>Доступно для Windows</span>
            </div>
            <button className={css.downloadButton}>
              <svg
                viewBox="0 0 263 67"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={css.downloadButtonBg}
              >
                <path
                  d="M258 38.042L234.042 62H0V24.041L0.0419922 24.083L24.083 0.0419922L24.041 0H258V38.042Z"
                  fill="#FE6807"
                />
                <path
                  d="M262.5 5.5V42.835L238.835 66.5H5.5V29.332L29.332 5.5H262.5Z"
                  stroke="#FE6807"
                />
              </svg>

              <span className={css.downloadButtonText}>Скачать игру</span>
            </button>
            <button className={css.infoButton}>
              <svg
                viewBox="0 0 258 63"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={css.infoButtonBg}
              >
                <path
                  d="M256.5 2V37.9209L233.421 61H1.5V25.2461L24.7461 2H256.5Z"
                  stroke="#410FD3"
                  strokeWidth="3"
                />
              </svg>

              <span className={css.infoButtonText}>Узнать больше</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
