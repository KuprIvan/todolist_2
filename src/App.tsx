import React, {useState} from 'react';
import './App.css';
import Todolist, {TaskType} from "./Components/Todolist";


export type FilterValuesType = 'all' | 'active' | 'completed';

function App():JSX.Element {
    let [tasks, setTasks] = useState<Array<TaskType>>([
        { id: 1, title: 'HTML&CSS', isDone: true },
        { id: 2, title: 'JS', isDone: true },
        { id: 3, title: 'ReactJS', isDone: false },
        { id: 4, title: 'RestAPI', isDone: true },
        { id: 5, title: 'GraphQL', isDone: false },
    ])

    function removeTask(taskId: number) {
        let filteredTasks = tasks.filter(t => t.id != taskId);
        setTasks(filteredTasks)
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
            />
        </div>
    );
}

export default App;
