import TodosListItem from "../todos-list-item/todos-list-item";

import "./todos-list.css";

export default function TodosList() {

  return (
    <ul className="app-list">
      <TodosListItem/>
    </ul>
  );
}
