import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Navbar = styled.nav`
  background: #333;
  padding: 10px;
  color: #fff;
`;

const Button = styled.button`
  background: #fff;
  color: #333;
  border: none;
  padding: 10px;
  margin-right: 10px;
  cursor: pointer;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  max-width: 800px;
  margin: 20px auto;
  padding: 0 20px;
`;

const UserCard = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://reqres.in/api/users?page=1');
      setUsers(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar>
        <Button onClick={getUsers}>Get Users</Button>
        <span>Brand Name</span>
      </Navbar>
      {loading ? (
        <Loader>
          <span>Loading...</span>
        </Loader>
      ) : (
        <CardGrid>
          {users.map(user => (
            <UserCard key={user.id}>
              <img src={user.avatar} alt={user.first_name} />
              <h3>{user.first_name} {user.last_name}</h3>
              <p>{user.email}</p>
            </UserCard>
          ))}
        </CardGrid>
      )}
    </div>
  );
}

export default App;