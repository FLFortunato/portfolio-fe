import React, { useState, useEffect, useContext } from 'react';
import './todoList.scss';
import { TodoListService } from '../../../../services/todoList.service';
import { TodoList } from '../../../../models/todoList.model';
import { EditModal } from './modal';
import { TodoListContext } from '../../../context/todoList.context';

export const TodoListApp = () => {
  const [list, setList] = useState<TodoList[]>([]);
  const [reloadList, setReloadList] = useState([{}]);
  const [content, setContent] = useState('');

  const userid = JSON.parse(localStorage.getItem('userid') || '{}');
  useEffect(() => {
    TodoListService()
      .getByUserId(userid)
      .then((res) => {
        setList(res.data);
      });
  }, [reloadList]);

  const createTodo = () => {
    if (content === '') {
      return;
    }
    setReloadList([...reloadList, { content }]);
    TodoListService().create(userid, { content });

    setContent('');
  };

  const deleteTodo = (e: any) => {
    TodoListService().remove(e);
    setReloadList([]);
  };
  return (
    <>
      <div className='container TodoList rounded my-5 '>
        <div className='listBody mt-2 border rounded'>
          <div className='listHead border text-center '>
            <h1 className='mt-3'>Todo List</h1>
          </div>
          <div className='listContent p-2'>
            {list &&
              list.map((l, i) => {
                return (
                  <div
                    className='d-flex justify-content-between mt-2 itemDiv'
                    key={i}
                  >
                    <p>{l.content}</p>
                    <div>
                      <TodoListContext.Provider value={{ setReloadList }}>
                        <EditModal data={l.id} />
                      </TodoListContext.Provider>
                      <button
                        className='btn btn-danger ml-1'
                        onClick={() => deleteTodo(l.id)}
                      >
                        <span className='material-icons'>delete_outline</span>
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className='listFooter border p-2'>
            <input
              type='text'
              className='form-control w-100 '
              onChange={(e: any) => setContent(e.target.value)}
              value={content}
            />
            <button className='btn btn-success w-100 mt-1' onClick={createTodo}>
              Enviar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
