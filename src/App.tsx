import React, {useState} from 'react';
import './App.css';
import Todolist, {TaskType} from "./Components/Todolist";
import {v1} from "uuid";

//---- Types ---- //
export type FilterValuesType = 'all' | 'active' | 'completed';
type TodoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}

//---- Types ---- //

function App(): JSX.Element {
    /*let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'RestAPI', isDone: true},
        {id: v1(), title: 'GraphQL', isDone: false},
    ])*/

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
        {id: todolistId1, title: 'What to learn', filter: 'active'}, // 0
        {id: todolistId2, title: 'What to buy', filter: 'all'}, // 1
    ])

    let [tasks, setTasks] = useState({
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'RestAPI', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
            ],
        [todolistId2]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'RestAPI', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })


    //------------ lesson-5 [Associative Arrays]---------------//

    /*let [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
        {id: v1(), title: 'What to learn', filter: 'active'}, // 0
        {id: v1(), title: 'What to buy', filter: 'all'}, // 1
    ])*/

    //------------ lesson-5 [Associative Arrays]---------------//


    //---- BLL ----//
    function removeTask(todoListId: string, taskId: string) {
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(t => t.id !== taskId)})
       /* let filteredTasks = tasks.filter(t => t.id != taskId);
        setTasks(filteredTasks)*/
    }

    function addNewTask(todoListId: string, title: string) {
        let task = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [todoListId]: [task, ...tasks[todoListId]]})
    }

    const changeStatus = (todoListId: string, id: string, isDone: boolean) => {
        // returns first element that satisfies the provided testing function
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === id ? {...t, isDone: isDone} : t)})

       /* let task = tasks[todoListId].find(t => t.id === id)

        if (task) {
            task.isDone = isDone
            setTasks({...tasks, [todoListId]: [...tasks[todoListId]]})
        }*/
    }
    //---- BLL ----//


    // Filters
    // let [filter, setFilter] = useState<FilterValuesType>('all')

   /* let tasksForTodoList = tasks;
    if (todoLists[0].filter === 'active') {
        tasksForTodoList = tasks.filter(t => t.isDone === false)
    }
    if (todoLists[0].filter === 'completed') {
        tasksForTodoList = tasks.filter(t => t.isDone === true)
    }*/
    // console.log([...todoLists])
    function changeFilter(todoListId: string, filterValue: FilterValuesType) {
        // debugger
        // {id: v1(), title: 'What to learn', filter: 'active'} === {...t}
        setTodoLists(todoLists.map(t => t.id === todoListId ? { ...t, filter: filterValue } : t ))
    }

    console.log(todoLists)
    console.log(tasks)
    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(t => t.id !== todoListId))
        delete tasks[todoListId]
    }

    return (
        <div className="App">
            {todoLists.map(t => {
                let tasksForTodoList = tasks[t.id];

                if (t.filter === 'active') {
                    tasksForTodoList = tasks[t.id].filter(t => t.isDone === false)
                }
                if (t.filter === 'completed') {
                    tasksForTodoList = tasks[t.id].filter(t => t.isDone === true)
                }

                return <Todolist
                    key={t.id}
                    title={t.title}
                    todoListId={t.id}
                    tasks={tasksForTodoList}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addNewTask={addNewTask}
                    changeStatus={changeStatus}
                    removeTodoList={removeTodoList}
                    filter={t.filter}
                />
            })
            }

        </div>
    );
}

export default App;
