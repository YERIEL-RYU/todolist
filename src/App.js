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

  //todo 등록 함수 매개변수 : text
  //변수 todo에 id는 변수 nextId의 현재값, 매개변수로 받은 text, checked는 false 로 배열을 담는다.
  //setTodos 함수에 concat 함수를 통해서 todos 배열에 추가한다.
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

  //todo 제거 함수 매개변수 : id
  //setTodos 함수에 매개변수로 받은 id와 todo의 id를 비교하는데 filter 함수를 통해 todos 배열을 제거
  //filter는 조건을 확인 하는 함수를 파라미터로 넣어줘야하고 파라미터는 true와 false를 반환하는데 true의 값만 새로운 배열에 포함됨
  // !== not equal 연산자 : 타입까지 비교해서 같지 않으면 true를 반환한다. 
  const onRemove = useCallback (
    id => {
      setTodos(todos.filter(todo => todo.id !==id));
    },[todos],
  ) ;

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert}/>
      {/* TodoList의 props로 todos를 전달함 */}
      <TodoList todos={todos} onRemove={onRemove}/>  
    </TodoTemplate>
  )
}

export default App;
