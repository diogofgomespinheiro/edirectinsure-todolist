//Library imports
import React, { useState } from "react";
import { useDispatch } from "react-redux";

//Component imports
import FormInput from "../../../../../../components/FormInput";

//Redux
import { addTask } from "../../../../../../store/modules/projects/actions";

//Style imports
import "./styles.scss";

const AddTask = ({ project_id }) => {
  const [task, setTask] = useState("");
  const dispatch = useDispatch();

  const onAddTask = () => dispatch(addTask(project_id, task));

  const handleSubmit = event => {
    event.preventDefault();
    onAddTask();
    setTask("");
  };

  return (
    <div>
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
    </div>
  );
};

export default AddTask;
