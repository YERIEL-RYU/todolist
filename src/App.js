import React, {useCallback, useReducer, useRef} from 'react';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';
import TodoTemplate from './components/TodoTemplate';

function createBulkTodos() {
  const arrary = [];
  for (let i =1; i <=2500; i++){
    arrary.push({
      id : i,
      text : `할 일 ${i}`,
      checked : false,
    });
  }
  return arrary;
}

//useReducer에 사용할 함수 선언
//매개변수 1. 현재 상태 toodos
//매개변수 2. 업데이트에 필요한 정보 action
function todoReducer(todos, action){
  //조건문
  switch(action.type){
    //새로 추가
    case 'INSERT' : //{type : 'INSERT', todo:{id:1, text: 'todo', checked:false}}
      return todos.concat(action.todo);

    //제거
    case 'REMOVE' :
      return todos.filter(todo => todo.id !== action.id);

    //토글
    case 'TOGGLE' :
      return todos.map(todo => todo.id === action.id ? {...todo, checked: !todo.checked} : todo,)

    //조건이 아니라면
    default :
      return todos;  
  }
}

const App = () => {
  //todos는 배열 dispatch는 함수
  const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos)
  const nextId = useRef(2501) 

  const onInsert = useCallback(
    text => {
      const todo = {
        id: nextId.current,
        text,
        checked : false,
      };
      //type이 insert로 매개변수를 받아서 dispatch 함수를 실행 시키면 action이 호출 되고
      //type에 따라 조건문이 실행 된다.
      dispatch({type:'INSERT' , todo});
      nextId.current += 1;
    },[] //todos가 바뀌었을때 함수 생성
  );


  const onRemove = useCallback (
    id => {
      dispatch({type:'REMOVE',id})
    },[],
  ) ;


  const onToggle = useCallback(
    id => {
      dispatch({type:'TOGGLE', id});
    },[],
  )

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert}/>
      {/* TodoList의 props로 todos를 전달함 */}
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle}/>  
    </TodoTemplate>
  )
}

export default App;
