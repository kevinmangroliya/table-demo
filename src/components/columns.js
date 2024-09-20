export const tableColumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 90,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: 150,
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Completed",
      dataIndex: "completed",
      key: "completed",
      width: 150,
      sorter: (a, b) => (a.completed === b.completed ? 0 : a.completed ? -1 : 1),
      render: (text) => (text ? "true" : "false"),
    },
  ];