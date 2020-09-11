import React, {useCallback, useRef, useState} from 'react';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';
import TodoTemplate from './components/TodoTemplate';

const App = () => {
  //화면에 보여질 todo들을 배열로 정의
  const [todos, setTodos] = useState([
    {
      id : 1,
      text : '리엑트 기초 알아보기',
      checked : true,
    },
    {
      id : 2,
      text : '컴포넌트 스타일링 해보기',
      checked : true,
    },
    {
      id : 3,
      text : '일정관리 앱 만들어 보기',
      checked : false,
    },
  ]);

  //todos 다음에 들어 갈 값의 id를 useRef로 변수에 담기
  const nextId = useRef(4) //3까지 정의했으니 4부터 시작

  const onInsert = useCallback(
    text => {
      const todo = {
        id: nextId.current,
        text,
        checked : false,
      };
      setTodos(todos.concat(todo));
      nextId.current +=1;
    },[todos], //todos가 바뀌었을때 함수 생성
  )

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert}/>
      {/* TodoList의 props로 todos를 전달함 */}
      <TodoList todos={todos}/>  
    </TodoTemplate>
  )
}

export default App;
