import React from 'react';
import { MdCheckBoxOutlineBlank, MdCheckBox, MdRemoveCircleOutline} from 'react-icons/md'
import './TodoListItem.scss';
import cn from 'classnames';

//props로 TodoList에서 todo를 받아옴
const TodoListItem = ({todo, onRemove, onToggle}) => {
    //App.js에 정의 된 내용 중 text와 checked를 가져옴
    const {id,text, checked} =todo;
    return (
        <div className="TodoListItem">
            <div className={cn('checkbox', {checked})} onClick={() => onToggle(id)}>
                {/* class=checkbox 이고 checked라는 속성을 가진다? 이건가? */}
                {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />} 
                {/* 삼항연산자 checked가 true라면 MdCheckBox, false라면 MdCheckBoxOutlineBlank */}
                <div className="text"> {text} </div>
            </div>
            <div className="remove" onClick={()=>onRemove(id)}>
                <MdRemoveCircleOutline />
            </div>
        </div>
    );
};


export default TodoListItem;