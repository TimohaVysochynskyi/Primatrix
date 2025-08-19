import { Link } from "react-router-dom";
import css from "./Footer.module.css";

export default function Footer() {
  return (
    <>
      <footer className={css.footer}>
        <div className={css.col}>
          <nav className={css.nav}>
            <ul className={css.list}>
              <li>
                <Link to="/" className={css.link}>
                  Главная
                </Link>
              </li>
              <li>
                <Link to="/forum" className={css.link}>
                  Форум
                </Link>
              </li>
              <li>
                <Link to="/about" className={css.link}>
                  О нас
                </Link>
              </li>
            </ul>
          </nav>
          <div className={css.socials}>
            <a href="#" className={css.social}>
              <img
                src="/icons/white-telegram-icon.png"
                alt="Telegram"
                className={css.socialIcon}
              />
            </a>
            <a href="#" className={css.social}>
              <img
                src="/icons/white-youtube-icon.png"
                alt="YouTube"
                className={css.socialIcon}
              />
            </a>
            <a href="#" className={css.social}>
              <img
                src="/icons/white-discord-icon.png"
                alt="Discord"
                className={css.socialIcon}
              />
            </a>
            <a href="#" className={css.social}>
              <img
                src="/icons/white-email-icon.png"
                alt="Email"
                className={css.socialIcon}
              />
            </a>
          </div>
        </div>
        <div className={css.title}>
          PRIMATRIX: <span>Rise of Sparkborn</span>
        </div>
        <div className={css.col}>
          <span className={css.copyright}>© PRIMATRIX</span>
          <span className={css.copyright}>Все права защищены</span>
        </div>
      </footer>
    </>
  );
}
