# :balloon: Mini Project - REACT로 Todo list 만들기

* 배열안에 반복문으로 2500개의 엘리먼트를 생성하고 React.memo와 useReducer과 react-virtualized 라이브러리를 사용하여 최적화까지 완료한 Todo list 입니다.
* 리액트를 다루는 기술 10장과 11장을 참고하였습니다.

![todolist캡쳐](https://user-images.githubusercontent.com/66396615/92876860-85a00900-f445-11ea-83c4-8f6df8d53dbe.PNG)

---------------------------------------------
##  :seedling: src
#### :sparkles: App.js
* TodoListItem의 엘리먼트를 생성하기 위한 함수
```
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
```
      
* useReducer를 사용하여 상태를 업데이트 하는 로직을 컴포넌트 밖에 선언
```
function todoReducer(todos, action){
  switch(action.type){  //조건문
    case 'INSERT' : //{type : 'INSERT', todo:{id:1, text: 'todo', checked:false}}    //새로 추가
      return todos.concat(action.todo);
    case 'REMOVE' :    //제거
      return todos.filter(todo => todo.id !== action.id);
    case 'TOGGLE' :    //토글
      return todos.map(todo => todo.id === action.id ? {...todo, checked: !todo.checked} : todo,)
    default :    //조건이 아니라면
      return todos;  
  }
}
```
useReduce는 현재상태, 업데이트에 필요한 정보를 담은 액션 값 두개를 매개변수로 받아 새로운 상태를 반환하는 함수이다.
* App.js의 컴포넌트
```
const App = () => {
  const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos)
  const nextId = useRef(2501) 
  const onInsert = useCallback(
    text => {
      const todo = {
        id: nextId.current,
        text,
        checked : false,
      };
      dispatch({type:'INSERT' , todo});
      nextId.current += 1;
    },[] 
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
```
todos는 배열 dispatch는 함수   
useReducer는
```  
const 변수명 = useReducer(reducer함수, 초기값, 초기값을 불러오는 함수)
```  
로 선언한다.    
dispatch 함수는 action을 실행시키는 함수로 함수안에 파라미터로 액션(type,id)을 주면 reducer함수가 실행 된다.

-----------------------------------------------------------
##  :seedling: conponents
#### :sparkles: TodoListTemplate.js 
  * Todo list의 탬플릿
```
const TodoTemplate = ({children}) => {
    return (
        <div className="TodoTemplate">
            <div className="app-title"> 일정 관리 </div>            
            <div className="content"> {children} </div>            
        </div>
    );
};
```
App.js에서 children을 TodoInsert와 TodoList로 받는다.
#### :sparkles: TodoInsert.js
* todo list 입력 form
```
const TodoInsert = ({onInsert}) => {
    const [value, setValue] = useState('');

    const onChange = useCallback(e => {
        setValue(e.target.value);
    },[]);

    const onSubmit = useCallback(
        e => {
            onInsert(value);
            setValue('');
            e.preventDefault();
    },[onInsert, value]);

    return (
        <form className="TodoInsert" onSubmit={onSubmit}>
            <input placeholder="할 일을 입력하세요" value={value} onChange={onChange}/>
            <button type="submit"><MdAdd/></button>
        </form>
    );
};
```
App.js에 props로 onInsert함수를 받아온다.   
onChange 함수를 통해서 input에 입력된 값을 value로 받아온다.   
onSubmit 함수는 현재 value에 저장된 값으로 props로 받아온 onInsert함수를 호출한다. 그러고 나서 value의 값을 초기화 시켜준다. submit은 화면을 새로고침 하는데 새로 등록하는 TodoListItem은 DB에 저장 되지 않고 화면에만 그리기때문에 새로고침하는 것을 방지하기 위해서 preventDefault함수를 사용한다.
#### :sparkles: TodoList.js
* todoListItem을 모아 리스트를 만든다.
```
const TodoList = ({todos, onRemove, onToggle}) => {
    const rowRenderer = useCallback(
        ({index, key, style})=> {
            const todo = todos[index];
            return (
                <TodoListItem todo={todo} key={key} onRemove={onRemove} onToggle={onToggle} style={style}/>
            );
        },[onRemove, onToggle, todos],
    )
    return (
        <List 
            className="TodoList"
            width={512}
            height={513}
            rowCount={todos.length}
            rowHeight={57}
            rowRenderer={rowRenderer}
            list={todos}
            style={{outline:'none'}}
        />
    );
};
```
App.js에서 props로 todos, onRemove, onToggle을 받아온다.     
  * react-virtualized 라이브러리
*  스크롤되기 전에 보이지 않는 컴포넌트는 렌더링 하지 않고 크기만 차지하여 최적화를 시켜주는 라이브러리이다.
```
$ yarn add react-virtualized
```
* 간단히 설치할 수 있다.     
TodoList.js는 react-virtualized 컴포넌트만 리턴하기 때문에 rowRenderer라는 함수를 선언하여 react-virtualized 컴포넌트에서 각 TodoListItem을 렌더링 할때 rowRenderer 함수를 props로 설정해야한다. rowRenderer 함수는 index와 key, style 값을 파라미터로 받아와서 사용한다.      
react-virtualized 컴포넌트는 해당 리스트의 전체 크기와 각 엘리먼트의 높이와 렌더링해야할 때 사용하는 함수와 배열을 prorps로 넣어주면 전달 받은 props를 사용하여 자동으로 최적화 해준다.     
#### :sparkles: TodoListItem.js
* todo list의 내용
  * toggle 기능으로 check와 uncheck기능을 사용할 수 있고 버튼을 통해서 해당 엘리먼트를 삭제할 수도 있다.
```
const TodoListItem = ({todo, onRemove, onToggle, style}) => {
    const {id,text, checked} =todo;
    return (
        <div className="TodoListItem-virtulaized" style={style}>
            <div className="TodoListItem">
                <div className={cn('checkbox', {checked})} onClick={() => onToggle(id)}>
                    {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />} 
                    <div className="text"> {text} </div>
                </div>
                <div className="remove" onClick={()=>onRemove(id)}>
                    <MdRemoveCircleOutline />
                </div>
            </div>
        </div>
    );
};
```
class가 checkbox인 div는 checked라는 속성값을 가지고 id를 매개변수고 갖는 onToggle함수를 클릭이벤트로 가지고 있다. checked 속성은 true와 false값을 가지고 삼항연산자를 통해 조건문을 선언하였다.     
삭제버튼은 매개변수로 id를 갖는 onRemove 함수를 클릭이벤트로 가지고 있다. 
