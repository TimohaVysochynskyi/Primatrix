import { Link, useNavigate } from "react-router-dom";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAuthLoading } from "../../redux/hooks";
import { loginUser } from "../../redux/slices/authSlice";
import type { LoginCredentials } from "../../types/auth.types";
import css from "./AuthPages.module.css";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoading = useAuthLoading();

  const validationSchema = Yup.object({
    emailOrNickname: Yup.string().trim().required("Введите никнейм или email"),
    password: Yup.string()
      .min(8, "Пароль должен содержать минимум 8 символов")
      .required("Пароль обязателен"),
  });

  const initialValues: LoginCredentials = {
    emailOrNickname: "",
    password: "",
  };

  const handleSubmit = async (values: LoginCredentials) => {
    const resultAction = await dispatch(loginUser(values));

    if (loginUser.fulfilled.match(resultAction)) {
      // Login successful, navigate to dashboard
      navigate("/dashboard");
    }
    // Error handling is done automatically in the slice with toast
  };

  return (
    <>
      <div className={css.container}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnBlur
          validateOnChange
        >
          <Form className={css.formWrapper} autoComplete="off">
            <svg
              viewBox="0 0 735 466"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={css.formBg}
            >
              <path
                d="M733 465.004L730.996 465L56.4961 463.633L55.668 463.631L55.084 463.045L2.58398 410.389L2 409.803V49.2637L2.4375 48.7168L39.1426 2.75195L39.7432 2H278.962L279.562 2.75195L315.668 47.9648H660.378L660.963 48.5498L732.414 119.995L733 120.581V465.004Z"
                fill="url(#paint0_linear_250_9)"
                stroke="#410FD3"
                strokeWidth="4"
              />
              <g transform="translate(672,47)">
                <path
                  d="M61 2V58.1719L4.82812 2L61 2Z"
                  fill="#12043F"
                  stroke="#410FD3"
                  strokeWidth="4"
                />
              </g>
              <defs>
                <linearGradient
                  id="paint0_linear_250_9"
                  x1="277.312"
                  y1="4"
                  x2="277.312"
                  y2="785"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#141220" />
                  <stop offset="1" stopColor="#280887" />
                </linearGradient>
              </defs>
            </svg>
            <div className={css.head}>
              <h2 className={css.title}>Вход</h2>
              <img
                src="/icons/white-right-triangle.png"
                alt="Arrow"
                className={css.triangle}
              />
              <Link to="/auth/register" className={css.subtitle}>
                Регистрация
              </Link>
            </div>
            <div className={css.form}>
              <div className={css.inputWrapper}>
                <Field
                  name="emailOrNickname"
                  type="text"
                  className={css.input}
                  placeholder="Никнейм или Email"
                  autoComplete="off"
                  spellCheck={false}
                />
                <ErrorMessage
                  name="emailOrNickname"
                  component="span"
                  className={css.error}
                />
              </div>
              <div className={css.inputWrapper}>
                <Field
                  name="password"
                  type="password"
                  className={css.input}
                  placeholder="Пароль"
                />
                <ErrorMessage
                  name="password"
                  component="span"
                  className={css.error}
                />
              </div>
            </div>
            <button type="submit" className={css.button} disabled={isLoading}>
              {isLoading ? "Вход..." : "Войти"}
            </button>
          </Form>
        </Formik>
      </div>
    </>
  );
}
