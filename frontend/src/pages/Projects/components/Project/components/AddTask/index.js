//Library imports
import React, { useState } from "react";

//Component imports
import FormInput from "../../../../../../components/FormInput";

//Style imports
import "./styles.scss";

const AddTask = () => {
  const [task, setTask] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="add-task">
      <FormInput
        type="text"
        name="task"
        value={task}
        handleChange={event => setTask(event.target.value)}
        label="Task"
        required
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTask;
