import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import apiClient from "../../../api/apiClient";
import toast from "react-hot-toast";
import css from "./Ideas.module.css";

export default function Ideas() {
  // Validation schema (messages in Russian)
  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .min(2, "Имя слишком короткое")
      .max(50, "Имя слишком длинное")
      .required("Укажите ваше имя"),
    telegram: Yup.string()
      .trim()
      .matches(/^@\w{4,}$/u, "Укажите Telegram в формате @username")
      .required("Укажите ваш Telegram"),
    idea: Yup.string()
      .trim()
      .min(10, "Опишите идею подробнее (мин. 10 символов)")
      .max(2000, "Слишком длинный текст")
      .required("Опишите вашу идею"),
  });

  const initialValues = { name: "", telegram: "", idea: "" };

  return (
    <>
      <section className={css.container}>
        <div className={css.box}>
          <div className={css.top}>
            <div className={css.imageWrapper}>
              <div className={css.imageFilter}></div>
            </div>
            <div className={css.topContent}>
              <h2 className={css.title}>Сбор идей</h2>
              <span className={css.slogan}>Предлагай, делись, играй</span>
              <div className={css.joinTitleWrapper}>
                <h3 className={css.joinTitle}>
                  Присоединяйся к нашему сообществу
                </h3>
              </div>
            </div>
          </div>
          <div className={css.bottom}>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                try {
                  await apiClient.post("/ideas", values);
                  resetForm();
                  toast.success("Идея успешно отправлена!");
                } catch (error) {
                  console.error(error);
                  toast.error("Ошибка при отправке. Попробуйте позже.");
                } finally {
                  setSubmitting(false);
                }
              }}
              validateOnBlur
              validateOnChange
            >
              {({ values }) => {
                const count = [
                  values.name,
                  values.telegram,
                  values.idea,
                ].filter((v) => (v || "").toString().trim().length > 0).length;
                const stage = Math.max(1, Math.min(3, count));
                const barWidth = `${(stage / 3) * 100}%`;
                const step1Active = stage >= 1;
                const step2Active = stage >= 2;
                const step3Active = stage >= 3;
                const canSubmit = count === 3;

                return (
                  <Form className={css.formWrapper} noValidate>
                    <div className={css.form}>
                      <div className={css.inputWrapper}>
                        <Field
                          name="name"
                          className={css.input}
                          placeholder="Имя"
                          autoComplete="off"
                        />
                        <ErrorMessage
                          className={css.error}
                          name="name"
                          component="span"
                        />
                      </div>
                      <div className={css.inputWrapper}>
                        <Field
                          name="telegram"
                          className={css.input}
                          placeholder="@ТЕЛЕГРАМ"
                          autoComplete="off"
                        />
                        <ErrorMessage
                          className={css.error}
                          name="telegram"
                          component="span"
                        />
                      </div>
                      <div className={css.inputWrapper}>
                        <Field
                          as="textarea"
                          name="idea"
                          placeholder="ТВОЯ ИДЕЯ"
                          className={css.textarea}
                          rows={6}
                        />
                        <ErrorMessage
                          className={css.error}
                          name="idea"
                          component="span"
                        />
                      </div>
                    </div>
                    <div className={css.socials}>
                      <a href="#" className={css.social}>
                        <svg
                          viewBox="0 0 440 47"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className={css.socialBg}
                        >
                          <path
                            d="M438.5 45.5V16.236L423.764 1.5H1.5v28.98L16.52 45.5z"
                            fill="#280887"
                            stroke="url(#a)"
                            strokeWidth="3"
                          />
                          <defs>
                            <linearGradient
                              id="a"
                              x1="107.318"
                              y1="44"
                              x2="332.682"
                              y2="3"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#410FD3" />
                              <stop offset=".5" stopColor="#875FFE" />
                              <stop offset="1" stopColor="#410FD3" />
                            </linearGradient>
                          </defs>
                          <path
                            d="M90 0H0v26.858L14 41h76z"
                            fill="url(#b)"
                            transform="translate(3 3)"
                          />
                          <defs>
                            <linearGradient
                              id="b"
                              x1="116.5"
                              y1="20.5"
                              x2="0"
                              y2="20.5"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#875FFE" />
                              <stop offset=".5" stopColor="#5315FC" />
                              <stop offset="1" stopColor="#280887" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className={css.socialContent}>
                          <div className={css.socialIconWrapper}>
                            <img
                              src="/icons/white-telegram-icon.png"
                              alt="Telegram icon"
                              className={css.socialIcon}
                            />
                          </div>
                          <span className={css.socialText}>
                            Следи за новостями
                          </span>
                        </div>
                      </a>
                      <a href="#" className={css.social}>
                        <svg
                          viewBox="0 0 440 47"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className={css.socialBg}
                        >
                          <path
                            d="M438.5 45.5V16.236L423.764 1.5H1.5v28.98L16.52 45.5z"
                            fill="#280887"
                            stroke="url(#a)"
                            strokeWidth="3"
                          />
                          <defs>
                            <linearGradient
                              id="a"
                              x1="107.318"
                              y1="44"
                              x2="332.682"
                              y2="3"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#410FD3" />
                              <stop offset=".5" stopColor="#875FFE" />
                              <stop offset="1" stopColor="#410FD3" />
                            </linearGradient>
                          </defs>
                          <path
                            d="M90 0H0v26.858L14 41h76z"
                            fill="url(#b)"
                            transform="translate(3 3)"
                          />
                          <defs>
                            <linearGradient
                              id="b"
                              x1="116.5"
                              y1="20.5"
                              x2="0"
                              y2="20.5"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#875FFE" />
                              <stop offset=".5" stopColor="#5315FC" />
                              <stop offset="1" stopColor="#280887" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className={css.socialContent}>
                          <div className={css.socialIconWrapper}>
                            <img
                              src="/icons/white-youtube-icon.png"
                              alt="Youtube icon"
                              className={css.socialIcon}
                            />
                          </div>
                          <span className={css.socialText}>
                            Не пропускай новые видео
                          </span>
                        </div>
                      </a>
                      <a href="#" className={css.social}>
                        <svg
                          viewBox="0 0 440 47"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className={css.socialBg}
                        >
                          <path
                            d="M438.5 45.5V16.236L423.764 1.5H1.5v28.98L16.52 45.5z"
                            fill="#280887"
                            stroke="url(#a)"
                            strokeWidth="3"
                          />
                          <defs>
                            <linearGradient
                              id="a"
                              x1="107.318"
                              y1="44"
                              x2="332.682"
                              y2="3"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#410FD3" />
                              <stop offset=".5" stopColor="#875FFE" />
                              <stop offset="1" stopColor="#410FD3" />
                            </linearGradient>
                          </defs>
                          <path
                            d="M90 0H0v26.858L14 41h76z"
                            fill="url(#b)"
                            transform="translate(3 3)"
                          />
                          <defs>
                            <linearGradient
                              id="b"
                              x1="116.5"
                              y1="20.5"
                              x2="0"
                              y2="20.5"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#875FFE" />
                              <stop offset=".5" stopColor="#5315FC" />
                              <stop offset="1" stopColor="#280887" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className={css.socialContent}>
                          <div className={css.socialIconWrapper}>
                            <img
                              src="/icons/white-discord-icon.png"
                              alt="Discrod icon"
                              className={css.socialIcon}
                            />
                          </div>
                          <span className={css.socialText}>
                            Общайся с игроками вживую
                          </span>
                        </div>
                      </a>
                    </div>
                    <div className={css.progressWrapper}>
                      <div
                        className={css.progressBar}
                        style={{ width: barWidth }}
                      ></div>
                      <div className={css.progressGrid}>
                        <div
                          className={`${css.progressItem} ${
                            step1Active ? "" : css.progressInactive
                          }`}
                        >
                          <span className={css.numberCircle}>1</span>
                        </div>
                        <div
                          className={`${css.progressItem} ${
                            step2Active ? "" : css.progressInactive
                          }`}
                        >
                          <span className={css.numberCircle}>2</span>
                        </div>
                        <button
                          type="submit"
                          disabled={!canSubmit}
                          className={`${css.button} ${
                            step3Active ? css.buttonActive : ""
                          }`}
                        >
                          <span className={css.numberCircle}>3</span> Отправить
                        </button>
                      </div>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </section>
    </>
  );
}
