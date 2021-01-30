import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import { NotesContext } from "../App";
import { Input, Tooltip, Button } from "antd";
import { SaveFilled, FundViewOutlined } from "@ant-design/icons";
import { Row, Col, Card, notification } from "antd";
import marked from "marked";

const { TextArea } = Input;

let api = `http://localhost:5000/notes`;

const Edit = () => {
  let { id } = useParams();

  const [note, setNote] = useState({});

  const context = useContext(NotesContext);
  const {
    state: { notes },
    dispatch,
  } = context;

  useEffect(() => {
    const fetchNotes = async () => {
      const res = await axios.get(`${api}/${id}`);
      if (res.status === 200) {
        const { data } = res;
        dispatch({ type: "GET_NOTES", payload: data });

        setNote(data);
      }
    };
    fetchNotes();
  }, []);

  const editNote = async () => {
    let res = await axios.put(`${api}/${id}`, note);
    if (res.status === 200) {
      notification.success({ message: "Success" });
    }
  };

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={10}>
          <TextArea
            rows={4}
            value={note.content}
            onChange={(e) => {
              setNote({ ...note, content: e.target.value });
            }}
            // dangerouslySetInnerHTML={{ __html: marked(note.content) }}
          />
        </Col>
        <Col span={4}>
          <div className={"btn-save"}>
            <Tooltip title="Save">
              <Button
                shape="circle"
                icon={<SaveFilled />}
                onClick={() => editNote()}
              />
            </Tooltip>
            <Tooltip title="Preview">
              <Button shape="circle" icon={<FundViewOutlined />} />
            </Tooltip>
          </div>
        </Col>
        <Col span={10}>
          <Card>
            <div
              dangerouslySetInnerHTML={{ __html: marked(note.content || "") }}
            ></div>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Edit;
