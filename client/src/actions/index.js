const axios = require("axios");

export function getFolders() {
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/folders");
      return dispatch({
        type: "GET_FOLDERS",
        payload: json.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function addFolder(title) {
  return async function (dispatch) {
    try {
      let response = await axios.post("http://localhost:3001/folders/create", { title: title });
      return dispatch({
        type: "POST_FOLDER",
        payload: response.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function removeFolder(id) {
  return async function (dispatch) {
    try {
      await axios.delete(`http://localhost:3001/folders/remove/${id}`);
      return dispatch({
        type: "REMOVE_FOLDER",
        payload: id,
      });
    } catch (e) {
      console.log(e);
    }
  };
}
export function getTasks(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`http://localhost:3001/folders/watchtasks/${id}`);
      return dispatch({
        type: "GET_TASKS",
        payload: json.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}
export function getDetailFolder(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`http://localhost:3001/folders/get/${id}`);
      return dispatch({
        type: "GET_FOLDER_DETAIL",
        payload: json.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}
export function addTask(id, title) {
  return async function (dispatch) {
    try {
      await axios.post(`http://localhost:3001/folders/addtask/${id}`, { title: title });
      return dispatch({
        type: "ADD_TASK",
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function removeTask(id) {
  return async function (dispatch) {
    try {
      await axios.delete(`http://localhost:3001/tasks/delete/${id}`);
      return dispatch({
        type: "DELETE_TASK",
        payload: id,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function getDetailTask(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`http://localhost:3001/tasks/detail/${id}`);
      return dispatch({
        type: "GET_DETAIL_TASK",
        payload: json.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function editTask(id, title) {
  return async function (dispatch) {
    try {
      await axios.put(`http://localhost:3001/tasks/edit/${id}`, { title: title });
      return dispatch({
        type: "EDIT_TASK",
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function changeCompletedTask(id) {
  return async function (dispatch) {
    try {
      await axios.put(`http://localhost:3001/tasks/changecompleted/${id}`);
      return dispatch({
        type: "CHANGE_COMPLETED_TASK",
      });
    } catch (e) {
      console.log(e);
    }
  };
}
