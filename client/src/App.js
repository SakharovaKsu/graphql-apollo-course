import React, { useEffect, useState } from 'react';
import './App.css';
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_USERS, GET_USER } from './query/user';
import { CREATE_USER } from './mutation/user';

function App() {
  const { data, error, loading, refetch } = useQuery(GET_ALL_USERS, {
    onError: (error) => {
      console.error("Error fetching users:", error);
    }
  });

  const { data: oneUser, loading: loadingOneUser } = useQuery(GET_USER, {
    variables: {
      id: 1
    },
    onError: (error) => {
      console.error("Error fetching one user:", error);
    }
  });

  const [createUser] = useMutation(CREATE_USER, {
    onError: (error) => {
      console.error("Error creating user:", error);
    }
  });

  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [age, setAge] = useState(0);

  const getAll = (e) => {
    e.preventDefault();
    refetch();
  }

  const addUser = (e) => {
    e.preventDefault();
    createUser({ variables: { input: { username, age: parseInt(age) } } }).then(({ data }) => {
      console.log(data);
      setUsername('');
      setAge(0);
    }).catch(err => {
      console.error(err);
    });
  }

  useEffect(() => {
    if (!loading && data) {
      setUsers(data.getAllUsers);
    }
  }, [data, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
      <div>
        <form>
          <input value={username} onChange={e => setUsername(e.target.value)} type={'text'} />
          <input value={age} onChange={e => setAge(e.target.value)} type={'number'} />
          <div className={'btns'}>
            <button onClick={(e) => addUser(e)}>Создать</button>
            <button onClick={e => getAll(e)}>Получить</button>
          </div>
        </form>
        <div>
          {users.map(user =>
              <div key={user.id} className={'user'}>{user.id}. {user.username} {user.age}</div>
          )}
        </div>
      </div>
  );
}

export default App;
