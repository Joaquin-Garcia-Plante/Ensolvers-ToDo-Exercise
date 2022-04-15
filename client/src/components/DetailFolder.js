import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import __ from "lodash";
import { addTask, getDetailFolder, getTasks } from "../actions";
import Tasks from "./Tasks";
import { Link, useParams } from "react-router-dom";
function DetailFolder() {
  let { id } = useParams();
  const tasks = useSelector((state) => state.tasks);
  const folder = useSelector((state) => state.detailFolder);
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks(id));
    dispatch(getDetailFolder(id));
  }, [dispatch, id]);

  function handleRender() {
    dispatch(getTasks(id));
    dispatch(getDetailFolder(id));
  }
  function handleOnChange(e) {
    e.preventDefault();
    setTitle(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (title.length <= 0) {
      return alert("Debe colocar un título");
    }
    dispatch(addTask(id, title));
    handleRender();
    dispatch(getDetailFolder(id));
    setTitle("");
    dispatch(getTasks(id));
    handleRender();
  }
  function showTasks() {
    if (!__.isEmpty(tasks)) {
      return (
        <div>
          {tasks &&
            tasks.map((f) => {
              return <Tasks getTasks={getTasks} completed={f.completed} idFolder={id} handleRender={handleRender} key={f.id} id={f.id} title={f.title}></Tasks>;
            })}
        </div>
      );
    } else {
      return <div>No hay tareas</div>;
    }
  }
  return (
    <div className="max-h-full w-full flex items-center justify-center bg-teal-lightest font-sans ">
      <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <div className="mb-4">
          <h1 className="text-grey-darkest">
            {"Folders >"} {folder.title}
          </h1>
          <div className="flex mt-4">
            <input onChange={(e) => handleOnChange(e)} value={title} className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" placeholder="Add Task" />
            <button onClick={(e) => handleSubmit(e)} value={title} className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-orange-400 hover:bg-teal hover:border-orange-400">
              Add
            </button>
          </div>
        </div>
        <div>{showTasks()}</div>
        <div className="flex justify-center">
          <Link to={"/"}>
            <button className="bg-transparent hover:bg-orange-400 text-orange-400 font-semibold hover:text-white py-2 px-4 border border-orange-400 hover:border-transparent rounded">Back</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DetailFolder;
