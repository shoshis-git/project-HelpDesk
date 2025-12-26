import { useContext, useEffect, type FunctionComponent } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";
import { TicketsContext } from "../context/TicketsContext";
import { addTicket, getPriorities } from "../pages/ticketsApi";
import { useNavigate } from "react-router-dom";




interface NewTicketProps {

}


// type Option = {
//   value: number;
//   label: string;
// };


const NewTickets: FunctionComponent<NewTicketProps> = () => {

  const { handleSubmit, register, reset ,formState: { errors } } = useForm();
  const { state, dispatch } = useContext(TicketsContext);
  const { state: auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const onSubmit = async (data: any) => {

    if (!auth.token) {
      return;
    }

    dispatch({ type: "LOAD_START" });
    try {

      const response = await addTicket(data, auth.token);



      dispatch({ type: "UPDATE_TICKET", payload: response });
      reset();
          alert("הפנייה נשלחה בהצלחה ✅");

    // ✅ מעבר לרשימת הטיקטים
    navigate("/tickets/ticketList");

    } catch (err: any) {
      dispatch({ type: "LOAD_FAILURE", payload: err.response?.data?.message || "Added Failed" });

    }



  }

  useEffect(() => {


    const loaderPriority = async () => {

      if (!auth.token) {

        return;

      }
      dispatch({ type: "LOAD_START" });
      try {
        const priority = await getPriorities(auth.token);
        dispatch({ type: "LOAD_PRIORITY", payload: priority })
      }
      catch (err: any) {
        console.log("Load priorities failed", err);
        dispatch({ type: "LOAD_FAILURE", payload: err.response?.data?.message || "Load Failed" })

      }
    }
    loaderPriority();

  }, [auth.token])


  return (<div className="form-page-container">
    <div className="new-ticket-card">
      <header className="form-header">
        <div className="icon-badge">✉️</div>
        <h2>פתיחת פנייה חדשה</h2>
        <p>מלא את הפרטים ונחזור אליך בהקדם האפשרי</p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="modern-form">
        <div className="input-group">
          <label>נושא הפנייה</label>
          <input
            className={errors.subject ? "error" : ""}
            placeholder="כתוב כותרת קצרה לנושא..."
            {...register("subject")}
          />
          
        </div>

        <div className="input-group">
          <label>תיאור מפורט</label>
          <textarea
            className={errors.description ? "error" : ""}
            placeholder="פרט כאן את הבעיה או הבקשה שלך..."
            rows={5}
            {...register("description", { required: "תיאור הוא שדה חובה" })}
          />
          {errors.description && <span className="error-message" role="alert">"שדה חובה"</span>}
        </div>

        <div className="input-group">
          <label>רמת דחיפות</label>
          <select
            className={errors.priority ? "error" : ""}
            {...register("priority", { required: "יש לבחור עדיפות" })}
          >
            <option value="">בחר עדיפות...</option>
            {state.priorities.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
          {errors.priority && <span className="error-message" role="alert">"שדה חובה"</span>}
        </div>

        <input type="submit" className="btn-submit-ticket"/>
          שלח פנייה למערכת
        
      </form>
    </div>
  </div>)
}
export default NewTickets;


