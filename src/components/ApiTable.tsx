import React, { FC, useEffect, useState } from 'react';
import { Table } from '.';
import { ApiTableProps, TableData } from '../types/table';

/*
there is a prop drilling in ApiTable and Table ( fetchingArea is provided from ApiTable to Table and from table to useTrackerPromise)
the solution would be to use a context state
*/
const ApiTable: FC<ApiTableProps> = ({
  fetchData,
  fetchingArea
}) => {
  const [data, setData] = useState<TableData[]>([] as TableData[]);
  const [error, setError] = useState<string>("");

  const getData = async () => {
    try {
      const { data: resultData } = await fetchData();
    
      setData(data => [...data, ...resultData]); 
      setError(""); // clear error if request is successfull
    } catch (err) {
      setError(err.error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Table
      data={data}
      error={error}
      onLoadMore={getData}
      fetchingArea={fetchingArea}
    />
  )
}

export default ApiTable;