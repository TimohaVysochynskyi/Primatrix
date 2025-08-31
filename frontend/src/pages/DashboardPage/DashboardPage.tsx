import { useUser, useIsAuthenticated, useAppDispatch } from "../../redux/hooks";
import { Navigate, useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/slices/authSlice";

export default function DashboardPage() {
  const user = useUser();
  const isAuthenticated = useIsAuthenticated();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/");
  };

  if (!isAuthenticated || !user) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Личный кабинет</h1>

      <div style={{ marginTop: "2rem" }}>
        <h2>Информация о пользователе</h2>

        <div style={{ display: "grid", gap: "1rem", marginTop: "1rem" }}>
          <div>
            <strong>Никнейм:</strong> {user.username}
          </div>

          <div>
            <strong>Email:</strong> {user.email}
          </div>

          {user.name && (
            <div>
              <strong>Имя:</strong> {user.name}
            </div>
          )}

          {user.surname && (
            <div>
              <strong>Фамилия:</strong> {user.surname}
            </div>
          )}

          {user.balance !== undefined && (
            <div>
              <strong>Баланс:</strong> {user.balance} грн
            </div>
          )}

          {user.lastOnline && (
            <div>
              <strong>Последний раз онлайн:</strong>{" "}
              {new Date(user.lastOnline).toLocaleString("ru-RU")}
            </div>
          )}

          <div>
            <strong>Статус:</strong>{" "}
            <span style={{ color: user.isOnline ? "green" : "gray" }}>
              {user.isOnline ? "Онлайн" : "Не в сети"}
            </span>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "3rem" }}>
        <h2>Действия</h2>
        <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
          <button style={{ padding: "0.5rem 1rem" }}>
            Редактировать профиль
          </button>
          <button style={{ padding: "0.5rem 1rem" }}>Настройки</button>
          <button
            onClick={handleLogout}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#e74c3c",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Выйти
          </button>
        </div>
      </div>
    </div>
  );
}
