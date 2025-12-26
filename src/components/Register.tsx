import { useContext, useEffect, type FunctionComponent } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { login, registerCustomer } from "../pages/loginApi";
import { useForm } from "react-hook-form";







const Register: FunctionComponent = () => {
 

  const { state, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm()



  const onSubmit = async (data: any) => {
   

    dispatch({ type: "LOGIN_START" });
    try {
      const response = await registerCustomer(data);
      
      
      const loginResponse = await login(data.email, data.password);
      const { token, user } = loginResponse.data;
      localStorage.setItem("token", token);
      dispatch({ type: "REGISTER_SUCCESS", payload: { token, user } });
      


    } catch (err: any) {
      
      if (err.response?.status == 409) {
        dispatch({ type: "LOGIN_FAILURE", payload: err?.response?.data?.message || "User already exists" });

      }
      else {
        dispatch({ type: "LOGIN_FAILURE", payload: err.response?.data?.message || "Register Failed" });
      }
    }
  };
  useEffect(() => {
    
    if (state.isAuthenticated) {
      navigate("/dashboard");
     
    }

  }, [state.isAuthenticated]);

  return (<div className="register-page-wrapper">
    <div className="register-card">
      <header className="register-header">
        <div className="brand-icon">📝</div>
        <h2>יצירת חשבון חדש</h2>
        <p>הצטרף למערכת ה-Helpdesk שלנו עוד היום</p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="modern-form">
        <div className="input-group">
          <label>שם מלא</label>
          <input
            placeholder="ישראל ישראלי"
            {...register("name", { required: true })}
            className={errors.name ? "error-input" : ""}
            aria-invalid={errors.name ? "true" : "false"}
          />
          {errors.name && <span className="error-text" role="alert">שם הוא שדה חובה</span>}
        </div>

        <div className="input-group">
          <label>כתובת אימייל</label>
          <input
            placeholder="example@mail.com"
            {...register("email", {
              required: true,
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
            })}
            className={errors.email ? "error-input" : ""}
            aria-invalid={errors.email ? "true" : "false"}
          />
          {errors.email?.type === "required" && <span className="error-text" role="alert">אימייל הוא שדה חובה</span>}
          {errors.email?.type === "pattern" && <span className="error-text" role="alert">כתובת אימייל לא תקינה</span>}
        </div>

        <div className="input-group">
          <label>סיסמה</label>
          <input
            type="password"
            placeholder="לפחות 6 תווים..."
            {...register("password", { required: true, minLength: 6 })}
            className={errors.password ? "error-input" : ""}
            aria-invalid={errors.password ? "true" : "false"}
          />
          {errors.password?.type === "required" && <span className="error-text" role="alert">סיסמה היא שדה חובה</span>}
          {errors.password?.type === "minLength" && <span className="error-text" role="alert">הסיסמה חייבת להכיל לפחות 6 תווים</span>}
        </div>

        <button className="btn-register-submit" disabled={state.loading}>
          {state.loading ? "יוצר חשבון..." : "הרשמה למערכת"}
        </button>

        {state.error && <div className="alert-error">{state.error}</div>}
      </form>

      <footer className="register-footer">
        <p>כבר יש לך חשבון? <button onClick={() => navigate("/login")} className="login-link-btn">התחבר כאן</button></p>
      </footer>
    </div>
  </div>
  );
}
export default Register