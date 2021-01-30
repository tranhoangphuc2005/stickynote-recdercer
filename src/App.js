import axios from "axios";
import { useState, useEffect, createContext, useReducer } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Drawer, Button } from "antd";

import Note from "./Components/Note";
import Edit from "./Components/Edit";

export const NotesContext = createContext();

const reducer = (state, action) => {
  // console.log(action);
  if (action.type === "GET_NOTES") {
    return {
      ...state,
      notes: action.payload,
    };
  }
  if (action.type === "GET_COLORS") {
    return {
      ...state,
      colors: action.payload,
    };
  }
  if (action.type === "ADD_NOTE") {
    return {
      ...state,
      notes: [...state.notes, action.payload],
    };
  }
  if (action.type === "DELETE_NOTE") {
    return {
      ...state,
      notes: state.notes.filter((note) => note.id !== action.payload),
    };
  }
  return state;
};

const initialState = {
  notes: [],
  colors: [],
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <NotesContext.Provider value={{ state, dispatch }}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Note />
          </Route>
          <Route exact path="/:id">
            <Edit />
          </Route>
        </Switch>
      </Router>
    </NotesContext.Provider>
  );
}

export default App;
