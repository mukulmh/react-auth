import React, { useState, useEffect } from "react";
import useAxios from "../utils/useAxios";

import { Table, Col, Row } from "antd";

const Books = () => {
  let [books, setBooks] = useState([]);

  let api = useAxios();

  useEffect(() => {
    getBooks();
  }, []);

  let getBooks = async () => {
    try{let response = await api.get("/api/books/");
    if (response.status === 200) {
      // console.log(response.data);
      setBooks(response.data);
    }}catch(err){
      console.log(err.response.status)
    }
  };
  const dataSource = books;

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
  ];

  return (
    <div>
      <Row justify="center">
        <Col span={12}>
          <Table dataSource={dataSource} columns={columns} rowKey="id" />
        </Col>
      </Row>
    </div>
  );
};

export default Books;
