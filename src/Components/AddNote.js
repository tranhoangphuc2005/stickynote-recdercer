import React, { useContext, useEffect, useState } from "react";
import { Button, Tooltip, Drawer } from "antd";
import {
  PlusOutlined,
  UnorderedListOutlined,
  SmileTwoTone,
} from "@ant-design/icons";
import "./AddNote.css";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import { NotesContext } from "../App";

let api = `http://localhost:5000/colors`;
let apiNotes = `http://localhost:5000/notes`;

const AddNote = () => {
  const context = useContext(NotesContext);
  const {
    state: { colors },
    dispatch,
  } = context;

  useEffect(() => {
    const fetchColors = async () => {
      const res = await axios.get(api);
      if (res.status === 200) {
        const { data } = res;
        dispatch({ type: "GET_COLORS", payload: data });
      }
    };
    fetchColors();
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  const showDrawer = () => {
    setIsOpen(true);
  };

  const addNote = async () => {
    const newNote = {
      id: uuidv4(),
      content: "",
      title: "",
      bookmark: false,
    };
    let res = await axios.post(`${apiNotes}`, newNote);
    if (res.status === 201) {
      dispatch({ type: "ADD_NOTE", payload: newNote });
    }
  };

  return (
    <div className={"header-my-note"}>
      <Drawer
        title="Label"
        placement="right"
        closable={true}
        onClose={onClose}
        visible={isOpen}
      >
        {colors.map((color) => (
          <div className={"label-list"}>
            <SmileTwoTone twoToneColor={color.codeColor} />
            <p>{color.label}</p>
          </div>
        ))}
      </Drawer>
      <Tooltip title="Add note">
        <Button
          type="dashed"
          shape="circle"
          icon={<PlusOutlined />}
          className="btn-custom"
          onClick={addNote}
        />
      </Tooltip>
      <h2>My note</h2>
      <Button
        icon={<UnorderedListOutlined key="list-lable" twoToneColor="#FF7F50" />}
        onClick={showDrawer}
      >
        Lable
      </Button>
    </div>
  );
};

export default AddNote;
