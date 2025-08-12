import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import css from "./Header.module.css";
import LanguageSwitch from "../LanguageSwitch/LanguageSwitch";

export default function Header() {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((o) => !o);
  const close = () => setOpen(false);

  // prevent body scroll when burger open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  return (
    <header className={css.header}>
      <button
        aria-label={open ? "Закрити меню" : "Відкрити меню"}
        className={`${css.burger} ${open ? css.active : ""}`}
        onClick={toggle}
      >
        <span />
        <span />
        <span />
      </button>
      <nav className={css.nav} aria-label="Основна навігація між сторінками">
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
      {open && (
        <>
          <div className={css.mobileMenu}>
            <ul className={css.mobileMenuList}>
              <li>
                <NavLink to="/" className={css.mobileLink} onClick={close}>
                  Главная
                </NavLink>
              </li>
              <li>
                <NavLink to="/forum" className={css.mobileLink} onClick={close}>
                  Форум
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className={css.mobileLink} onClick={close}>
                  О нас
                </NavLink>
              </li>
            </ul>
          </div>
          <div className={css.backdrop} onClick={close} />
        </>
      )}
    </header>
  );
}
