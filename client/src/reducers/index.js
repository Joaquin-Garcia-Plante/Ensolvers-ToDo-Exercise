const initialState = {
  folders: [],
  tasks: [],
  detailFolder: {},
  detailTask: {},
  task: {},
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_FOLDERS":
      return {
        ...state,
        folders: action.payload,
      };
    case "POST_FOLDER":
      return {
        ...state,
      };
    case "REMOVE_FOLDER":
      let filteredFolders = state.folders.filter((f) => f.id !== action.payload);
      return {
        ...state,
        folders: filteredFolders,
      };
    case "GET_TASKS":
      return {
        ...state,
        tasks: action.payload,
      };
    case "ADD_TASK":
      return {
        ...state,
      };
    case "GET_FOLDER_DETAIL":
      return {
        ...state,
        detailFolder: action.payload,
      };
    case "DELETE_TASK":
      let filteredTasks = state.tasks.filter((t) => t.id !== action.payload);
      return {
        ...state,
        tasks: filteredTasks,
      };
    case "GET_DETAIL_TASK":
      return {
        ...state,
        detailTask: action.payload,
      };
    case "EDIT_TASK":
      return {
        ...state,
      };
    case "CHANGE_COMPLETED_TASK":
      return {
        ...state,
      };
    default:
      return state;
  }
}

export default rootReducer;
