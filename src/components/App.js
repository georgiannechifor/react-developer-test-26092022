import React, { useEffect, useState } from 'react';
import api from '../lib/api';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Table from './Table';

export const App = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState();

  const fetchData = async () => {
    try {
      const result = await api.getUsersDiff();
      setData(data => [...data, ...result.data]);
      setError(null); // clear error if request is successfull
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container className="app" fixed>
      <Box data-testid="app-box" m={1}>
        <Table
          data={data}
          onLoadMore={fetchData}
          error={error}
        />
      </Box>
    </Container>
  );
};

export default App;
