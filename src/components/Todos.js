import React from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { uid } from "react-uid";
import { Button, InputLabel, FormControl, Input, TextField, Checkbox} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DoneAllIcon from '@material-ui/icons/DoneAll';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
// import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

const todoListState = atom({
  key: "todoListState",
  default: [],
});



export default function TodoList() {
  const todoList = useRecoilValue(todoListState);
  const setTodoList = useSetRecoilState(todoListState);

  const handleComplete = (id) => {
    setTodoList((oldTodoList) => {
      return oldTodoList.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            isCompleted: true
          };
        }

        return item;
      });
    });
  };

  const handleDelete = (id) => {
    setTodoList((oldTodoList) => {
      return oldTodoList.filter((item) => item.id !== id);
    });
  };

  return (
    <>
      <TodoForm />
      <ul>
        {todoList.map((item) => {
          return (
            <li key={item.id}>
              <span
                style={{
                  textDecoration: item.isCompleted ? "line-through" : "unset"
                }}
              >
                {item.text}{" "}
              </span>
              {!item.isCompleted ? ( 
                  <button onClick={() => handleComplete(item.id)} className="btn" > <DoneAllIcon></DoneAllIcon> </button> 
        
      
              ) : null}
              <button onClick={() => handleDelete(item.id)} className="btn"> <DeleteIcon></DeleteIcon> </button> 
              {/* <Button onClick={() => handleDelete(item.id)} variant="contained" color="secondary">
               DELETE
                </Button> */}
            </li>
          );
        })}
      </ul>
    </>
  );
}

function TodoForm() {
  const [inputValue, setInputValue] = React.useState("");
  const setTodoList = useSetRecoilState(todoListState);
  
  const addItem = () => {

    let timestamp = new Date();
    let date = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(timestamp)
  
    setTodoList((oldTodoList) => [
      ...oldTodoList,
      {
        id: uid(`${inputValue}-${oldTodoList.length}`),
        text: inputValue + " ["  + date + "]",
        isCompleted: false
      }
    ]);
    // console.log(new Date());
    return setInputValue("");
  };

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    
    if (e.key === 'Enter' && inputValue!=="") {
     
      // console.log("before calling add item");
      e.preventDefault();
      addItem();
      

    }
};
 

  return (
    <>
        {/* <form  onsubmit="return false"> */}
            <label htmlFor="todo-field">New Todo</label>
          {/* <input
            id="todo-field"
            type="text"
            placeholder="write a todo"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          /> */}

          

            <input id="todo-field"
            type="text"
            placeholder="write a todo"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeypress} />
                  
          <button disabled={!inputValue} onClick={addItem} className="btn"  type="button">
          <AddCircleIcon></AddCircleIcon>
                </button>
      

        
        {/* </form> */}
         
    
      
    </>
  );
}
