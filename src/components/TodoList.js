import React from 'react';
import './TodoList.scss';
import TodoListItem from './TodoListItem';

//todos라는 props을 받아옴
const TodoList = ({todos, onRemove, onToggle}) => {
    return (
        <div className="TodoList">
            {todos.map(todo => ( //map함수로 반복문, todo라는 매개변수를 받아서 TodoListItem을 todos 배열 크기만큼 map함수는 key props가 필요함
                <TodoListItem todo={todo} key={todo.id} onRemove={onRemove} onToggle={onToggle} />
            ))}
        </div>
    );
};

export default TodoList;