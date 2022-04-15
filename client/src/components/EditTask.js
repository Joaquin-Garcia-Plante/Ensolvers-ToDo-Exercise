import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editTask, getDetailTask } from "../actions";
function EditTask() {
  let { idFolder, idTask } = useParams();
  const task = useSelector((state) => state.detailTask);
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  function handleOnChange(e) {
    e.preventDefault();
    setTitle(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (title.length <= 0) {
      return alert("Debe colocar un título");
    }
    dispatch(editTask(idTask, title));
    alert("Edited assignment");
    dispatch(getDetailTask(idTask));
    setTitle("");
  }
  useEffect(() => {
    dispatch(getDetailTask(idTask));
  }, [dispatch, idTask]);
  return (
    <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans ">
      <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <div className="mb-4">
          <h1 className="text-grey-darkest">Edit Task</h1>
          <div className="flex mt-4">
            <input onChange={(e) => handleOnChange(e)} value={title} className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" placeholder={task.title} />
            <button onClick={(e) => handleSubmit(e)} value={title} className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-orange-400 hover:bg-teal hover:border-orange-400">
              Edit
            </button>
          </div>
        </div>
        <div className="flex justify-center">
          <Link to={`/folder/${idFolder}`}>
            <button className="bg-transparent hover:bg-orange-400 text-orange-400 font-semibold hover:text-white py-2 px-4 border border-orange-400 hover:border-transparent rounded">Back</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EditTask;
