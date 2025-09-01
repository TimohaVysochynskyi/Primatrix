import { Link, useNavigate } from "react-router-dom";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAuthLoading } from "../../redux/hooks";
import { loginUser } from "../../redux/slices/authSlice";
import type { LoginCredentials } from "../../types/auth.types";
import AuthSVG from "../../components/auth/AuthSVG/AuthSVG";
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
            <AuthSVG className={css.formBg} />
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
