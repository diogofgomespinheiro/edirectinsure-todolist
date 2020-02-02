//Library imports
import React, { useState } from "react";
import { useDispatch } from "react-redux";

//Component imports
import FormInput from "../../../../components/FormInput";

//Redux
import { addProject } from "../../../../store/modules/projects/actions";

//Style imports
import "./styles.scss";

const CreateProject = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const onAddProject = () => dispatch(addProject(name));

  const handleSubmit = event => {
    event.preventDefault();
    onAddProject();
    setName("");
  };

  return (
    <div className="create-project">
      <h1>Create a new project</h1>
      <form onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="name"
          value={name}
          onChange={event => setName(event.target.value)}
          label="Project Name"
          required
        />
        <input type="submit" className="button" value="Create Project" />
      </form>
    </div>
  );
};

export default CreateProject;
