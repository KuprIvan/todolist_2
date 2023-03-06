import React, {useState} from 'react';
import './App.css';
import Todolist, {TaskType} from "./Components/Todolist";
import {v1} from "uuid";


export type FilterValuesType = 'all' | 'active' | 'completed';

function App():JSX.Element {
    let [tasks, setTasks] = useState<Array<TaskType>>([
        { id: v1(), title: 'HTML&CSS', isDone: true },
        { id: v1(), title: 'JS', isDone: true },
        { id: v1(), title: 'ReactJS', isDone: false },
        { id: v1(), title: 'RestAPI', isDone: true },
        { id: v1(), title: 'GraphQL', isDone: false },
    ])

    function removeTask(taskId: string) {
        let filteredTasks = tasks.filter(t => t.id != taskId);
        setTasks(filteredTasks)
    }

    function addNewTask(title: string) {
        let task = { id: v1(), title: title, isDone: false}
        let newTasks = [task, ...tasks]
        setTasks(newTasks)
    }

    const changeStatus = (id: string, isDone: boolean) => {
        // returns first element that satisfies the provided testing function
        let task = tasks.find(t => t.id === id)

        if (task) {
            task.isDone = isDone
            setTasks([...tasks])
        }
    }

    // Filters

    let [filter, setFilter] = useState<FilterValuesType>('all')
    let tasksForTodoList = tasks;

    if (filter === 'active') {
        tasksForTodoList = tasks.filter(t => t.isDone === false)
    }
    if (filter === 'completed') {
        tasksForTodoList = tasks.filter(t => t.isDone === true)
    }

    function changeFilter(filterValue: FilterValuesType ) {
        setFilter(filterValue)
    }



    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={tasksForTodoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addNewTask={addNewTask}
                changeStatus={changeStatus}
                filter={filter}
            />
        </div>
    );
}

export default App;
