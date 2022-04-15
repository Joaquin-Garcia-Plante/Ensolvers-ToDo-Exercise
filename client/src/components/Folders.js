import React from "react";
import { useDispatch } from "react-redux";
import { removeFolder } from "../actions";
function Folders({ title, id, handleRender }) {
  const dispatch = useDispatch();
  function handleRemove(e) {
    e.preventDefault();
    dispatch(removeFolder(e.target.id));
    handleRender();
  }
  return (
    <div className="flex mb-4 items-center" key={id}>
      <p className="w-full text-grey-darkest">{title}</p>
      <button className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-orange-400 hover:border-orange-400">View</button>
      <button onClick={(e) => handleRemove(e)} id={id} className="flex-no-shrink p-2 ml-2 border-2 rounded hover:text-orange-400 hover:border-orange-400">
        Remove
      </button>
    </div>
  );
}

export default Folders;
