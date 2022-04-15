import React from "react";
import { useDispatch } from "react-redux";
import { changeCompletedTask, removeTask } from "../actions";
import { Link } from "react-router-dom";
function Tasks({ id, title, handleRender, idFolder, completed, getTasks }) {
  const dispatch = useDispatch();
  function handleRemove(e) {
    e.preventDefault();
    dispatch(removeTask(id));
    handleRender();
  }
  function handleChange() {
    dispatch(changeCompletedTask(id));
    dispatch(getTasks(idFolder));
    handleRender();
  }
  return (
    <div className="flex mb-4 items-center" key={id}>
      <input checked={completed} onChange={() => handleChange()} type="checkbox"></input>
      <p className="m-5 w-full text-grey-darkest">{title}</p>
      <Link to={`/editTask/${idFolder}/${id}`}>
        <button className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-orange-400 hover:border-orange-400">Edit</button>
      </Link>

      <button onClick={(e) => handleRemove(e)} id={id} className="flex-no-shrink p-2 ml-2 border-2 rounded hover:text-orange-400 hover:border-orange-400">
        Remove
      </button>
    </div>
  );
}

export default Tasks;
