import React, { useEffect, useState, useRef } from 'react';
import { Post } from '../../../../models/post.model';
import { PostServices } from '../../../../services/post.service';
import { Form } from '@unform/web';
import { InputCS } from '../../../Forms/input';
import { TextAreaCS } from '../../../Forms/textarea';
import { EditModal } from '../posts/modal';
import './posts.scss';
import { Userservice } from '../../../../services/user.service';

export const Posts = () => {
  const formRef = useRef<any>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [reloadList, setReloadList] = useState([{}]);
  const [type, setType] = useState(1);
  const [actualUser, setActualUser] = useState('');
  const userId = JSON.parse(localStorage.getItem('userid') || '{}');

  const selectType = (data: any) => {
    if (data === '1') {
      setType(1);
    } else {
      setType(0);
    }
  };

  useEffect(() => {
    PostServices()
      .get()
      .then((res) => {
        setPosts(res.data);
      });
  }, [reloadList]);

  useEffect(() => {
    Userservice()
      .getById(userId)
      .then((res) => {
        setActualUser(res.data.name);
      });
  }, []);

  const handleForm = (data: any) => {
    if (data.content.length == 0) {
      return;
    } else {
      PostServices()
        .create(
          {
            title: data.title,
            type: type,
            content: data.content,
            writenBy: actualUser,
          },
          userId
        )
        .then((res) => {
          setReloadList([...reloadList, { data }]);
        });
    }
  };

  const deletePost = (id: any) => {
    PostServices().remove(id);
    setReloadList([]);
  };
  const postHtml = (
    <div className='row'>
      <div className='col-lg-6 col-sm-12'>
        <Form onSubmit={handleForm} ref={formRef} id='formid'>
          <InputCS
            name='title'
            placeholder='Titúlo'
            className='form-control  mt-3'
          />
          <div className='d-flex mt-3 '>
            <select
              name='type'
              form='formid'
              onChange={(e) => selectType(e.target.value)}
              className='form-control '
            >
              <option value='1'>Elogio</option>
              <option value='0'>Crítica</option>
            </select>
          </div>
          <TextAreaCS
            placeholder='Comentário'
            className='form-control mt-3'
            rows={5}
            name='content'
            form='formid'
          />
          <button type='submit' className='btn btn-success my-3 w-50'>
            Enviar
          </button>
        </Form>
      </div>
    </div>
  );

  return (
    <div className='container mainPosts my-5'>
      <div className=''>
        <h3>Posts</h3>
      </div>
      {postHtml}
      {posts.map((p) => {
        return (
          <div key={p.id} className='my-3 border p-4'>
            <h5 style={p.type === 1 ? { color: 'blue' } : { color: 'red' }}>
              {p.title}
            </h5>
            <p className='mt-3'>{p.content}</p>
            <i className=''> Por: {p.writenBy}</i>
            <div className='mt-3'>
              {p.userPostId == userId ? (
                <div className='d-flex'>
                  <EditModal data={p.id} />
                  <button
                    className='btn btn-danger ml-3'
                    title='Excluir'
                    onClick={() => deletePost(p.id)}
                  >
                    <span className='material-icons'>delete_outline</span>
                  </button>
                </div>
              ) : undefined}
            </div>
          </div>
        );
      })}
    </div>
  );
};
