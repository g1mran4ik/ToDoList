import AppFilter from "../app-filter/app-filter";
import AppInfo from "../app-info/app-info";
import TodosAddForm from "../todos-add-form/todos-add-form";
import TodosList from "../todos-list/todos-list";

import Tasks from "../../contexts/tasks";
import { getTasks } from "../axios";
import "./app.css";
import { useEffect, useState } from "react";
import useFetching from "../../hooks/useFetching";

export default function App() {

  const [tasks, setTasks] = useState([])
  const [filteredTasks, setFilteredTasks] = useState([])

  const [fetchTasks] = useFetching({
    fetch: async () => getTasks(),
    afterFetch: (data) => {
      setTasks(data);
      setFilteredTasks(data);
    },
  });

  useEffect(() => {
    fetchTasks();
  }, [])


  return (
    <Tasks.Provider value={{tasks, fetchTasks, filteredTasks, setFilteredTasks}}>
      <div className="app">
        <AppInfo />
        <div className="navigation-panel">
          <AppFilter />
          <TodosAddForm />
        </div>
        <TodosList />
      </div>
    </Tasks.Provider>
  );
}
