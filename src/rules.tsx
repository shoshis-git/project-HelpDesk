import { useContext, type FC, type ReactNode } from "react";
import { AuthContext } from "./context/AuthContext";
import { Navigate } from "react-router-dom";



interface RulesProps {
  children: ReactNode;
  rules?: string[];
}



const Rules: FC<RulesProps> = ({ children, rules }) => {
  const { state } = useContext(AuthContext);

  // ⏳ מחכים ש-auth יסתיים
  if (state.loading) {
    return <p>טוען משתמש...</p>;
  }

  // ❌ לא מחובר
  if (!state.isAuthenticated || !state.user) {
    return <Navigate to="/login" replace />;
  }

  // 🚫 role לא מורשה
  if (rules && !rules.includes(state.user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  // ✅ מורשה
  return <>{children}</>;
};

export default Rules;