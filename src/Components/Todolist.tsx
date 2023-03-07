import React, {FC, useState, ChangeEvent, KeyboardEvent} from 'react';
import {FilterValuesType} from "../App";

//---- Types ---- //
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (todoListId: string, taskId: string) => void
    changeFilter: (id: string, filterValue: FilterValuesType) => void
    addNewTask: (todoListId: string, title: string) => void
    changeStatus: (todoListId: string, id: string, isDone: boolean) => void
    removeTodoList: (todoListId: string) => void
    todoListId: string
}
//---- Types ---- //


const Todolist: FC<PropsType> = (props): JSX.Element => {
    let [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== '') {
            props.addNewTask(props.todoListId, title);
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

    const onClickAllFilterHandler = () => {props.changeFilter(props.todoListId, 'all')}
    const onClickActiveFilterHandler = () => {props.changeFilter(props.todoListId, 'active')}
    const onClickCompletedFilterHandler = () => {props.changeFilter(props.todoListId, 'completed')}

    const removeTodoListHandler = () => {
        props.removeTodoList(props.todoListId)
    }

    return <div>
        <h3>
            {props.title}
            <button onClick={removeTodoListHandler}>x</button>
        </h3>

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
                const oncBtnClickHandler = () => props.removeTask(props.todoListId, t.id)
                const onChangeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    let newIsDoneValue = e.currentTarget.checked
                    props.changeStatus(props.todoListId, t.id, newIsDoneValue)
                }

                return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                    <input type="checkbox" checked={t.isDone} onChange={onChangeCheckboxHandler}/>
                    <span>{t.title}</span>
                    <button onClick={oncBtnClickHandler}>Del</button>
                </li>
            })}
        </ul>
        <div>
            <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onClickAllFilterHandler}>All
            </button>
            <button className={props.filter === 'active' ? 'active-filter' : ''}
                    onClick={onClickActiveFilterHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? 'active-filter' : ''}
                    onClick={onClickCompletedFilterHandler}>Completed
            </button>
        </div>
    </div>
};

export default Todolist;