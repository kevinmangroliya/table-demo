"use client";

import * as React from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchData,
  selectData,
  selectError,
  selectLoading,
} from "@/store/feature/tableSlice";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { tableColumns } from "./columns";
import DraggableHeader from "./DraggableHeader";

const DataTable = ({ filter }) => {
  const dispatch = useDispatch();
  const data = useSelector(selectData);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const [columns, setColumns] = React.useState(tableColumns);

  const moveColumn = (fromIndex, toIndex) => {
    const updatedColumns = [...columns];
    const [movedColumn] = updatedColumns.splice(fromIndex, 1);
    updatedColumns.splice(toIndex, 0, movedColumn);
    setColumns(updatedColumns);
  };

  const handleResize = (index, newWidth) => {
    const updatedColumns = [...columns];
    updatedColumns[index].width = newWidth;
    setColumns(updatedColumns);
  };

  React.useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  console.log("data", data);
  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(filter.toLowerCase())
  );

  const columnsWithDragDropAndResize = columns.map((column, index) => ({
    ...column,
    title: (
      <DraggableHeader
        column={column}
        index={index}
        moveColumn={moveColumn}
        onResize={handleResize}
      />
    ),
  }));

  return (
    <DndProvider backend={HTML5Backend}>
      <Table
        dataSource={filteredData}
        scroll={{ x: "auto" }}
        style={{ width: "90%", overflow: "auto" }}
        columns={columnsWithDragDropAndResize}
        pagination={{ pageSize: 10 }}
        rowKey="id"
        loading={loading}
        components={{
          header: {
            cell: (props) => (
              <th
                {...props}
                style={{ ...props.style, width: props.column?.width }}
              />
            ),
          },
        }}
      />
    </DndProvider>
  );
};

export default DataTable;
