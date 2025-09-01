import { Link, useNavigate } from "react-router-dom";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAuthLoading } from "../../redux/hooks";
import { registerUser } from "../../redux/slices/authSlice";
import type { RegisterCredentials } from "../../types/auth.types";
import AuthSVG from "../../components/auth/AuthSVG/AuthSVG";
import css from "./AuthPages.module.css";

export default function RegisterPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoading = useAuthLoading();
  const validationSchema = Yup.object({
    nickname: Yup.string()
      .trim()
      .min(3, "Никнейм должен содержать минимум 3 символа")
      .max(16, "Никнейм не должен превышать 16 символов")
      .matches(
        /^[a-zA-Z0-9_]+$/,
        "Никнейм может содержать только английские буквы, цифры и _"
      )
      .required("Никнейм обязателен"),
    email: Yup.string()
      .trim()
      .email("Введите корректный email")
      .required("Email обязателен"),
    password: Yup.string()
      .min(8, "Пароль должен содержать минимум 8 символов")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/,
        "Пароль должен содержать заглавную букву, строчную букву, цифру и спецсимвол"
      )
      .required("Пароль обязателен"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Пароли не совпадают")
      .required("Подтвердите пароль"),
  });

  const initialValues: RegisterCredentials = {
    nickname: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values: RegisterCredentials) => {
    const resultAction = await dispatch(registerUser(values));

    if (registerUser.fulfilled.match(resultAction)) {
      // Registration successful, navigate to dashboard
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
            <AuthSVG className={css.formBg} />
            <div className={css.head}>
              <h2 className={css.title}>Регистрация</h2>
              <img
                src="/icons/white-right-triangle.png"
                alt="Arrow"
                className={css.triangle}
              />
              <Link to="/auth/login" className={css.subtitle}>
                Вход
              </Link>
            </div>
            <div className={css.form}>
              <div className={css.inputWrapper}>
                <Field
                  name="nickname"
                  type="text"
                  className={css.input}
                  placeholder="Придумайте никнейм"
                  autoComplete="off"
                  spellCheck={false}
                />
                <ErrorMessage
                  name="nickname"
                  component="span"
                  className={css.error}
                />
              </div>
              <div className={css.inputWrapper}>
                <Field
                  name="email"
                  type="email"
                  className={css.input}
                  placeholder="Email"
                  autoComplete="new-password"
                  spellCheck={false}
                />
                <ErrorMessage
                  name="email"
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
              <div className={css.inputWrapper}>
                <Field
                  name="confirmPassword"
                  type="password"
                  className={css.input}
                  placeholder="Повторите пароль"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="span"
                  className={css.error}
                />
              </div>
            </div>
            <button type="submit" className={css.button} disabled={isLoading}>
              {isLoading ? "Создание..." : "Создать"}
            </button>
          </Form>
        </Formik>
      </div>
    </>
  );
}
