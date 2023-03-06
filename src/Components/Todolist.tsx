import React, {FC, useState, ChangeEvent, KeyboardEvent} from 'react';
import {FilterValuesType} from "../App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (filterValue: FilterValuesType) => void
    addNewTask: (title: string) => void
    changeStatus: (id: string, isDone: boolean) => void
}

const Todolist: FC<PropsType> = (props): JSX.Element => {
    let [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== '') {
            props.addNewTask(title);
            setTitle('')
        } else {
            setError('Title is required')
        }
    }
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyDownInputHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
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
                onChange={onChangeInputHandler}
                onKeyDown={onKeyDownInputHandler}
            />
            <button onClick={addTask}>+</button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
        <ul>
            {props.tasks.map(t => {

                const oncBtnClickHandler = () => props.removeTask(t.id)
                const onChangeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    let newIsDoneValue = e.currentTarget.checked
                    props.changeStatus(t.id, newIsDoneValue)
                }

                return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                    <input type="checkbox" checked={t.isDone} onChange={onChangeCheckboxHandler}/>
                    <span>{t.title}</span>
                    <button onClick={oncBtnClickHandler}>Del</button>
                </li>
            })}
        </ul>
        <div>
            <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onClickAllFilterHandler}>All</button>
            <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={onClickActiveFilterHandler}>Active</button>
            <button className={props.filter === 'completed' ? 'active-filter' : ''} onClick={onClickCompletedFilterHandler}>Completed</button>
        </div>
    </div>
};

export default Todolist;