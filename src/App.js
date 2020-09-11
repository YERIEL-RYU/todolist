import React, {useState} from 'react';
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
  return (
    <TodoTemplate>
      <TodoInsert />
      {/* TodoList의 props로 todos를 전달함 */}
      <TodoList todos={todos}/>  
    </TodoTemplate>
  )
}

export default App;
