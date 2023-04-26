import { Button, Form, Input, Modal } from "antd";
import { useContext, useEffect, useRef, useState } from "react";
import Tasks from "../../contexts/tasks";
import useFetching from "../../hooks/useFetching";
import { postTask } from "../axios";

export default function TodosAddForm() {
  const { fetchTasks, setFilteredTasks } = useContext(Tasks);
  const [open, setOpen] = useState(false);

  const [fetchTaskPOST] = useFetching({
    fetch: async (task) => postTask(task),
    afterFetch: () => {
      form.resetFields();
      setOpen(false);
      fetchTasks();
    },
  });

  const handleCancel = () => {
    form.resetFields();
    setOpen(false);
  };

  const [form] = Form.useForm();

  const required = (msg) => ({
    required: true,
    message: msg || "Заполните это поле!",
  });

  const onFinish = (values) => {
    fetchTaskPOST({ ...values, completed: false });
  };

  const inputRef = useRef(null);

  useEffect(() => {
    setTimeout(() => open && inputRef?.current?.focus(), 100)
  }, [open]);

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Новая задача
      </Button>
      <Modal
        title="Новая задача"
        open={open}
        onOk={form.submit}
        onCancel={handleCancel}
        okText={"Добавить задачу"}
        cancelText={"Отмена"}
      >
        <Form
          onFinish={onFinish}
          autoComplete="off"
          requiredMark={false}
          form={form}
        >
          <Form.Item name="text" rules={[required()]}>
            <Input ref={inputRef} placeholder="Описание задачи" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
