//Library imports
import React from "react";
import { useSelector } from "react-redux";

//Style imports
import "./styles.scss";

const Alert = () => {
  const alerts = useSelector(state => state.alert);
  return (
    <>
      {alerts.map(alert => (
        <div key={alert.id} className={alert.alertType}>
          {alert.msg}
        </div>
      ))}
    </>
  );
};

export default Alert;
