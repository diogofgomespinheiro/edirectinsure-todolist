//Library imports
import React, { useState } from "react";

//Component imports
import FormInput from "../../../../../../components/FormInput";

const EditTask = ({ toggleModal, onEditTask, task }) => {
  const [description, setDescription] = useState(task.description);
  const [finsish_date, setFinishDate] = useState(
    task.finsish_date ? task.finsish_date : ""
  );

  const handleSubmit = event => {
    event.preventDefault();
    if (finsish_date?.trim() !== "") {
      onEditTask(task._id, false, description, finsish_date);
    } else {
      onEditTask(task._id, false, description);
    }
    toggleModal(false);
  };

  return (
    <div className="edit-project">
      <h2>Edit Task</h2>
      <form onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="description"
          value={description}
          handleChange={event => setDescription(event.target.value)}
          label="Description"
          required
        />
        <FormInput
          type="date"
          name="finish_date"
          value={finsish_date}
          handleChange={event => setFinishDate(event.target.value)}
          label="Finish Date"
        />
        <div className="buttons">
          <button type="button" onClick={() => toggleModal(false)}>
            Cancel
          </button>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
};

export default EditTask;
