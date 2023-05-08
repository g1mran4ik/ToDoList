import { CheckSquareTwoTone, DeleteTwoTone } from "@ant-design/icons";
import { Button, Popconfirm, Space } from "antd";

import { useContext } from "react";
import Tasks from "../../contexts/tasks";
import useFetching from "../../hooks/useFetching";
import { deleteTask, patchTask } from "../axios";
import NoTasks from "../no-tasks/no-tasks";
import "./todos-list-item.css";

export default function TodosListItem() {
  const { filteredTasks, fetchTasks } = useContext(Tasks);

  const [fetchTaskDELETE] = useFetching({
    fetch: async (id) => deleteTask(id),
    afterFetch: () => fetchTasks(),
  });

  const [fetchTaskPATCH] = useFetching({
    fetch: async (id, data) => patchTask(id, data),
    afterFetch: () => fetchTasks(),
  });

  return filteredTasks.length ? (
    <>
      {filteredTasks.map(({ id, text, completed }) => (
        <li key={id} className="list-group-item">
          {completed ? (
            <span className="list-group-item-label list-group-item-label-line-through">{text}</span>
          ) : (
            <span className="list-group-item-label">{text}</span>
          )}
          <Space>
            <Button
              onClick={() => fetchTaskPATCH(id, { completed: !completed })}
              type="default"
              icon={<CheckSquareTwoTone />}
            />
            <Popconfirm
              title="Удалить задачу"
              description="Вы действительно хотите удалить эту задачу?"
              okText="Да"
              cancelText="Нет"
              onConfirm={() => fetchTaskDELETE(id)}
            >
              <Button type="default" icon={<DeleteTwoTone />} />
            </Popconfirm>
          </Space>
        </li>
      ))}
    </>
  ) : (
    <NoTasks />
  );
}

