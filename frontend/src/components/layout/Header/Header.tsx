import { NavLink } from "react-router-dom";
import css from "./Header.module.css";
import LanguageSwitch from "../LanguageSwitch/LanguageSwitch";
import { useUI } from "../../../context/UIContext";

export default function Header() {
  const { mobileHeroMenuOpen, toggleMobileHeroMenu } = useUI();
  return (
    <header className={css.header}>
      <button
        aria-label={mobileHeroMenuOpen ? "Закрити меню" : "Відкрити меню"}
        className={`${css.burger} ${mobileHeroMenuOpen ? css.active : ""}`}
        onClick={toggleMobileHeroMenu}
      >
        <span />
        <span />
        <span />
      </button>
      <nav className={css.nav}>
        {/* <Link to="/">
          <img src="/logo.png" alt="Logo" className={css.logo} />
        </Link> */}
        <ul className={css.menu}>
          <li className={css.item}>
            <NavLink to="/" className={css.link}>
              Главная
            </NavLink>
          </li>
          <li className={css.item}>
            <NavLink to="/forum" className={css.link}>
              Форум
            </NavLink>
          </li>
          <li className={css.item}>
            <NavLink to="/about" className={css.link}>
              О нас
            </NavLink>
          </li>
        </ul>
      </nav>
      <h1 className={css.title}>
        PRIMATRIX: <span>Rise of Sparkborn</span>
      </h1>
      <div className={css.actions}>
        <LanguageSwitch />
        <div className={css.buttonWrapper}>
          <button className={css.button}>Вход</button>
        </div>
      </div>
    </header>
  );
}
