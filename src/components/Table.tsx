import React, { FC, useState, useEffect } from "react";
import {
  Table,
  TableFooter,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TableSortLabel,
  SortDirection,
} from "@material-ui/core";
import { usePromiseTracker } from 'react-promise-tracker';
import orderBy from "lodash/orderBy";
import { columns, ERROR_MESSAGE } from "../constants";
import { formatTimestamp } from "../lib/dateFormat";
import LoadingButton from "./LoadingButton";
import { TableData, TableProps } from "../types/table";

const CustomTable: FC<TableProps> = ({
  data,
  error,
  onLoadMore,
  fetchingArea
}) => {
  const [order, setOrder] = useState<SortDirection>("desc");
  const [sorted, setSorted] = useState<TableData[]>([] as TableData[]);
  const { promiseInProgress: isLoading } = usePromiseTracker({
    area: fetchingArea
  })

  useEffect(() => {
    if (data) {
      setSorted(orderBy(data, "timestamp", order));
    }
  }, [data, order, setSorted]);

  const handleSort = () => {
    setOrder((order) => (order === "asc" ? "desc" : "asc"));
  };

  return (
    <TableContainer
      data-testid="app-table"
      component={Paper}
      style={{
        marginBottom: 50
      }}
    >
      <Table>
        <TableHead>
          {
            columns.map((column) =>
            column.sortable ? (
              <TableCell
                style={{ fontWeight: "bold" }}
                key={column.key}
                sortDirection={order}
              >
                <TableSortLabel
                  // @ts-ignore
                  direction={order}
                  onClick={handleSort}
                >
                  {column.label}
                </TableSortLabel>
              </TableCell>
            ) : (
                <TableCell
                  style={{ fontWeight: "bold" }}
                  key={column.key}>
                {column.label}
              </TableCell>
            ))
          }
        </TableHead>
        <TableBody>
          {sorted.map((user: TableData) => (
            <TableRow key={user.id}>
              <TableCell>{formatTimestamp(user.timestamp)}</TableCell>
              <TableCell>{user.id}</TableCell>
              {/* accessed array values like that because if I'd use user.diff.map(..) the items
                would need a key and our data doesn't contain any distinct field for that*/}
              <TableCell>{user.diff[0].oldValue}</TableCell>
              <TableCell>{user.diff[0].newValue}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={columns.length} align="center">
              <>
                {
                  error ? (
                  <Typography
                    style={{
                      color: "#FF0000",
                      fontWeight: "bold",
                      fontSize: 13,
                      marginBottom: 10,
                    }}
                  >
                    {ERROR_MESSAGE}
                  </Typography>
                  ) : null
                }
                <LoadingButton
                  isLoading={isLoading}
                  onClick={onLoadMore}
                  buttonLabel={error ? 'Retry' : 'Load More'}
                />
              </>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

CustomTable.displayName = "CustomTable";
export default CustomTable;
