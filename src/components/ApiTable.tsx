import React, { FC, useEffect, useState } from 'react';
import { Table } from '.';
import { ApiTableProps, TableData } from '../types/table';

const ApiTable: FC<ApiTableProps> = ({
  fetchData,
  fetchingArea
}) => {
  const [data, setData] = useState<TableData[]>([] as TableData[]);
  const [error, setError] = useState<any>();

  const getData = async () => {
    try {
      const { data: resultData } = await fetchData();
      
      // @ts-ignore
      setData(data => [...data, ...resultData]); 
      setError(null); // clear error if request is successfull
    } catch (err) {
      setError(err);
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