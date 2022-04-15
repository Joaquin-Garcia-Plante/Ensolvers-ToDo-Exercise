import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import __ from "lodash";
import { addFolder, getFolders } from "../actions";
import Folders from "./Folders";
function Home() {
  const folders = useSelector((state) => state.folders);
  const [title, setTitle] = useState("");
  // const [render, setRender] = useState("");

  function useForceUpdate() {
    const [value, setValue] = useState(0);
    return () => setValue((value) => value + 1);
  }
  const forceUpdate = useForceUpdate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFolders());
  }, [dispatch]);
  function handleRender() {
    dispatch(getFolders());
    forceUpdate();
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
    dispatch(addFolder(title));
    handleRender();
    setTitle("");
    dispatch(getFolders());
    forceUpdate();
  }
  function showFolders() {
    if (!__.isEmpty(folders)) {
      return (
        <div>
          {folders &&
            folders.map((f) => {
              return (
                <Link to={`/folder/${f.id}`} key={f.id}>
                  <Folders handleRender={handleRender} key={f.id} id={f.id} title={f.title}></Folders>
                </Link>
              );
            })}
        </div>
      );
    }
  }
  return (
    <div className="h-full w-full flex items-center justify-center bg-teal-lightest font-sans">
      <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <div className="mb-4">
          <h1 className="text-grey-darkest">My folders</h1>
          <div className="flex mt-4">
            <input onChange={(e) => handleOnChange(e)} value={title} className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" placeholder="Add Folder" />
            <button onClick={(e) => handleSubmit(e)} value={title} className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-orange-400 hover:bg-teal hover:border-orange-400">
              Add
            </button>
          </div>
        </div>
        <div>
          <div>{showFolders()}</div>
        </div>
      </div>
    </div>
  );
}

export default Home;
