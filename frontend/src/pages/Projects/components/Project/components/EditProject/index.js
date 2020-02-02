//Library imports
import React, { useState } from "react";
import { useDispatch } from "react-redux";

//Component imports
import FormInput from "../../../../../../components/FormInput";

//Redux
import { editProject } from "../../../../../../store/modules/projects/actions";

//Style imports
import "./styles.scss";

const EditProject = ({ toggleModal, project_id }) => {
  const [name, setName] = useState("");

  const dispatch = useDispatch();

  const onEditProject = () => dispatch(editProject(project_id, name));

  const handleSubmit = event => {
    event.preventDefault();
    onEditProject();
    toggleModal(false);
  };

  return (
    <div className="edit-project">
      <h2>Edit Project</h2>
      <form onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="name"
          value={name}
          handleChange={event => setName(event.target.value)}
          label="Name"
          required
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

export default EditProject;
