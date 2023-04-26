import axios from "axios";


export const getTasks = () => axios.get('http://localhost:3000/tasks').then((response) => response.data)

export const postTask = (data) => axios.post('http://localhost:3000/tasks', data).then((response) => response.data)

export const patchTask = (id, data) => axios.patch('http://localhost:3000/tasks/' + id, data).then((response) => response.data)

export const deleteTask = (id) => axios.delete('http://localhost:3000/tasks/' + id).then((response) => response.data)