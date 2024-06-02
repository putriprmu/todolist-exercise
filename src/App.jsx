import React, { useState } from "react";
import styled from "styled-components";
import { IoTrashSharp } from "react-icons/io5";
import "./App.css";

const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  background-color: rgb(32, 45, 63);
  padding: 60px;
  padding-top: 30px;
  padding-bottom: -40px;
  font-family: sans-serif;
  font-size: small;
  color: white;
`;

const TaskList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const TaskItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const TaskText = styled.span`
  flex: 1;
  text-align: left;
`;

const Checkbox = styled.input.attrs({ type: "checkbox" })`
  margin-right: 10px;
`;

const DeleteButton = styled.button`
  background-color: transparent;
  border: 1px solid white;
  cursor: pointer;
  border-radius: 5px;
  box-shadow: 0px 4px 8px #830000;
`;

const TrashIcon = styled(IoTrashSharp)`
  color: #ff00009c;
  font-size: medium;
`;

const TotalDone = styled.div`
  text-align: center;
  color: #ffffff;
`;

const AddTodoContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: baseline;
`;

const TodoInput = styled.input`
  margin-right: 10px;
  border-radius: 5px;
  padding: 7px;
  padding-inline-end: 250px;
  border: none;
  background-color: #c3d6e3;
  flex-grow: 1;
`;

const AddButton = styled.button`
  background-color: #4c92d7;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 8px 20px;
  cursor: pointer;
`;

function App() {
  const [tasks, setTasks] = useState([
    { text: "Create Guest Experience mobile check-in", checked: false },
    { text: "Document current CI/CD process", checked: false },
    {
      text: "Perform Code Review for final Pillow-Talk release",
      checked: false,
    },
    { text: "Implement new color Palette from Design Team", checked: false },
    { text: "Fix image uploading process for guest check-in", checked: false },
    { text: "Provide onboarding documentation", checked: false },
  ]);
  const [totalDoneCount, setTotalDoneCount] = useState(0);
  const [newTask, setNewTask] = useState("");

  const handleCheckboxChange = (index) => {
    const newTasks = [...tasks];
    newTasks[index].checked = !newTasks[index].checked;
    setTasks(newTasks);
    updateTotalDoneCount();
  };

  const handleDeleteTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
    updateTotalDoneCount();
  };

  const updateTotalDoneCount = () => {
    const count = tasks.filter((task) => task.checked).length;
    setTotalDoneCount(count);
  };

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { text: newTask, checked: false }]);
      setNewTask("");
    }
  };

  return (
    <Container>
      <h2 className="title">Chores ToDo List</h2>
      <TaskList>
        {tasks.map((task, index) => (
          <TaskItem key={index}>
            <Checkbox
              checked={task.checked}
              onChange={() => handleCheckboxChange(index)}
            />
            <TaskText>{task.text}</TaskText>
            <DeleteButton onClick={() => handleDeleteTask(index)}>
              <TrashIcon />
            </DeleteButton>
          </TaskItem>
        ))}
      </TaskList>
      <hr className="divider" />
      <TotalDone>Done: {totalDoneCount}</TotalDone>
      <AddTodoContainer>
        <label htmlFor="newTask" className="add-label">
          Add todo:
        </label>
        <br />
        <TodoInput
          id="newTask"
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <br />
        <AddButton onClick={handleAddTask}>Add Task</AddButton>
      </AddTodoContainer>
    </Container>
  );
}

export default App;
