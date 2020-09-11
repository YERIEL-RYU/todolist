import React, { useCallback, useState } from 'react';
import {MdAdd} from 'react-icons/md';
import './TodoInsert.scss';


const TodoInsert = ({onInsert}) => {
    //input값을 관리 할 수 있는 value 라는 상태 정의
    const [value, setValue] = useState('');

    //input에 넣어줄 onChange함수 작성 - 함수를 재사용할 수 있도록 useCallback Hook 사용
    const onChange = useCallback(e => {
        setValue(e.target.value);
    },[]); //컴포넌트가 처음 렌더링 될때만 함수 생성, 처음에 함수 생성하고 재사용 하면 되니까

    //이 함수가 호출 되면 props로 받아온 함수에 value 값을 넣어 호출하고 현재 value값을 초기화
    const onSubmit = useCallback(e=> {
        onInsert(value); //onInsert로 App.js에 있는 todos에 배열 추가
        setValue(''); // 현재 value 값을 초기화 시켜줌
        e.preventDefault(); //submit을 화면을 초기화 시키는데 현재 앱은 DB에 연결 된 것이 아니기 때문에 새로고침하면 의미가 없어서 새로고침을 방지
    })

    return (
        <form className="TodoInsert" onSubmit={onSubmit}>
            <input placeholder="할 일을 입력하세요" value={value} onChange={onChange}/>
            <button type="submit"><MdAdd/></button>
        </form>
    );
};

export default TodoInsert;