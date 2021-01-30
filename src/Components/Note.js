import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AddNote from "./AddNote";
import { Row, Col } from "antd";
import { Skeleton, Card, Avatar, Input, Drawer } from "antd";
import {
  EditTwoTone,
  EllipsisOutlined,
  SettingOutlined,
  DeleteTwoTone,
  BookTwoTone,
  EditOutlined,
  SaveFilled,
  UpCircleFilled,
} from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import axios from "axios";

import { NotesContext } from "../App";
let api = `http://localhost:5000/notes`;

const { Meta } = Card;
const { TextArea } = Input;

const Note = () => {
  const context = useContext(NotesContext);
  const {
    state: { notes },
    dispatch,
  } = context;

  useEffect(() => {
    const fetchNotes = async () => {
      const res = await axios.get(api);
      if (res.status === 200) {
        const { data } = res;
        dispatch({ type: "GET_NOTES", payload: data });
      }
    };
    fetchNotes();
  }, []);
  const deleteNote = async (id) => {
    let res = await axios.delete(`${api}/${id}`);
    if (res.status == 200) {
      dispatch({ type: "DELETE_NOTE", payload: id });
    }
  };

  return (
    <>
      <AddNote />
      <Row justify="space-around">
        {notes.map((note) => (
          <Col span={8}>
            <Card
              style={{ width: 300, marginTop: 16 }}
              actions={[
                <Link to={note.id}>
                  <EditTwoTone key="edit" />
                </Link>,

                <DeleteTwoTone
                  key="delete"
                  onClick={() => deleteNote(note.id)}
                />,
                <BookTwoTone key="bookmark" twoToneColor="#52c41a" />,
              ]}
            >
              <div className={"header-card"}>
                <UpCircleFilled />
                <p>Label</p>
              </div>
              <div className={"content-note"}>{note.content}</div>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Note;

{
  /* <Skeleton avatar active>
          <Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            title="Card title"
            description="This is the description"
          />
        </Skeleton> */
}
