import { useContext, type FunctionComponent } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login } from "../pages/loginApi";
import Swal from "sweetalert2";






const Login: FunctionComponent = () => {

  const { dispatch, state } = useContext(AuthContext);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = async (data: any) => {

    dispatch({ type: "LOGIN_START" });
    try {
      localStorage.clear();
      const response = await login(data.email, data.password);
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      dispatch({ type: "LOGIN_SUCCESS", payload: { token, user } });
      Swal.fire({
      title: `שלום ל${user.name}`,
      text: 'התחברת בהצלחה',
      icon: 'success',
      confirmButtonText: 'מעולה',
      confirmButtonColor: '#28a745', // צבע ירוק להצלחה
      timer: 2500, // ההודעה תיסגר אוטומטית אחרי 2.5 שניות
      timerProgressBar: true
    });
      navigate("/dashboard");
    } catch (err: any) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response?.data?.message || "Login Failed" });
      Swal.fire({
      title: 'אופס...',
      text: 'חלה שגיאה בהתחברות. כדאי לנסות שוב.',
      icon: 'error',
      confirmButtonText: 'הבנתי'
    });

    }

  }

  if(state.loading)
  {
    return <p>טוען משתמש...</p>;
  }
{state.error && <div className="alert-error">{state.error}</div>}

  return (
    <div className="login-page-wrapper">
      <div className="login-card">
        <header className="login-header">
          <div className="brand-icon">🔐</div>
          <h2>כניסה למערכת</h2>
          <p>הזן את פרטיך כדי להתחבר ל-Helpdesk</p>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="modern-form">
          <div className="input-group">
            <label htmlFor="email">כתובת אימייל</label>
            <input
              type="text"
              id="email"
              placeholder="name@example.com"
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
              className={errors.email ? "error-input" : ""}
            />
            {errors.email?.type === "required" && <span className="error-text">כתובת אימייל היא שדה חובה</span>}
            {errors.email?.type === "pattern" && <span className="error-text">כתובת אימייל לא תקינה</span>}
          </div>

          <div className="input-group">
            <label htmlFor="password">סיסמה</label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              {...register('password', { required: true, minLength: 6 })}
              className={errors.password ? "error-input" : ""}
            />
            {errors.password?.type === "required" && <span className="error-text">סיסמה היא שדה חובה</span>}
            {errors.password?.type === "minLength" && <span className="error-text">הסיסמה חייבת להכיל לפחות 6 תווים</span>}
          </div>

          <button className="btn-login-submit" disabled={state.loading}>
            {state.loading ? (
              <span className="loader-text">מתחבר...</span>
            ) : (
              "התחברות"
            )}
          </button>

          {state.error && <div className="alert-error">{state.error}</div>}
        </form>

        <footer className="login-footer">
          <p>אין לך חשבון? <Link to="/register" className="register-link">להרשמה למערכת</Link></p>
        </footer>
      </div>
    </div>
  )
}
export default Login;