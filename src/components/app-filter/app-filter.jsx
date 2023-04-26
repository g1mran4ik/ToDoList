import { useContext, useEffect, useState } from "react";
import "./app-filter.css";
import Tasks from "../../contexts/tasks";
import { Button } from "antd";
import Search from "antd/es/input/Search";

export default function AppFilter() {
  const { tasks, setFilteredTasks } = useContext(Tasks);

  const [filterText, setFilterText] = useState("all");

  const [searchValue, setSearchValue] = useState("");

  const debounce = (f, interval) => {
    let timer = null;
    return (value) => {
      clearTimeout(timer);
      timer = setTimeout(() => f(value), interval);
    };
  };

  const onSearch = debounce(setSearchValue, 600);

  useEffect(() => {
    filterText === "all" &&
      setFilteredTasks(
        tasks.filter((task) =>
          task.text.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    filterText === "completed" &&
      setFilteredTasks(
        tasks.filter((task) =>
          task.completed && task.text.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    filterText === "uncompleted" &&
      setFilteredTasks(
        tasks.filter(
          (task) =>
            !task.completed && task.text.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
  }, [searchValue, filterText]);

  useEffect(() => {
    setFilterText("all");
  }, [tasks]);

  return (
    <>
      <Search 
      placeholder="Введите текст для поиска"
      allowClear
      size="medium"
      enterButton="Найти"
      style={{width: '30%'}}
      onChange={(e) => onSearch(e.target.value)}
      />
      <div className="btn-group">
        <Button
          onClick={() => setFilterText("all")}
          type={filterText === "all" ? "primary" : "default"}
          style={{ borderRadius: "6px 0 0 6px" }}
        >
          Все задачи
        </Button>
        <Button
          onClick={() => setFilterText("completed")}
          type={filterText === "completed" ? "primary" : "default"}
          style={{ borderRadius: 0 }}
        >
          Выполненные
        </Button>
        <Button
          onClick={() => setFilterText("uncompleted")}
          type={filterText === "uncompleted" ? "primary" : "default"}
          style={{ borderRadius: "0 6px 6px 0" }}
        >
          Невыполненные
        </Button>
      </div>
    </>
  );
}
