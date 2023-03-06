import React, {FC, useState, ChangeEvent, KeyboardEvent} from 'react';
import {FilterValuesType} from "../App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (filterValue: FilterValuesType) => void
    addNewTask: (title: string) => void
}

const Todolist: FC<PropsType> = (props):JSX.Element => {
    let [title, setTitle] = useState<string>('')

    const addTask = () => {
        props.addNewTask(title);
        setTitle('')
    }
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyDownInputHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.keyCode === 13) {
            addTask()
        }
    }

    const onClickAllFilterHandler = () => {
        props.changeFilter('all')
    }
    const onClickActiveFilterHandler = () => {
        props.changeFilter('active')
    }
    const onClickCompletedFilterHandler = () => {
        props.changeFilter('completed')
    }


    return <div>
        <h3>{props.title}</h3>
        <div>
            <input
                value={title}
                onChange={ onChangeInputHandler }
                onKeyDown={ onKeyDownInputHandler }
            />
            <button onClick={addTask}>+</button>
        </div>
        <ul>
            { props.tasks.map(t => {

                const oncBtnClickHandler = () => props.removeTask(t.id)

                return <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>
                    <button onClick={ oncBtnClickHandler }>Del</button>
                </li>
            }) }
        </ul>
        <div>
            <button onClick={ onClickAllFilterHandler }>All</button>
            <button onClick={ onClickActiveFilterHandler }>Active</button>
            <button onClick={ onClickCompletedFilterHandler }>Completed</button>
        </div>
    </div>
};

export default Todolist;