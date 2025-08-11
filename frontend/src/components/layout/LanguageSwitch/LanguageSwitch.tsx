import css from "./LanguageSwitch.module.css";

export default function LanguageSwitch() {
  return (
    <>
      <div className={css.wrapper}>
        <img src="/icons/globe-icon.png" alt="Globe" className={css.icon} />
        <span className={css.label}>Русский</span>
      </div>
    </>
  );
}
