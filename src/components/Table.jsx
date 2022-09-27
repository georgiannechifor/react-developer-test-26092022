import React, { useState, useEffect } from "react";
import { array, func, bool, object } from "prop-types";
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
} from "@material-ui/core";

import { columns, ERROR_MESSAGE } from "../constants";
import { formatTimestamp } from "../lib/dateFormat";
import orderBy from "lodash/orderBy";
import LoadingButton from "./LoadingButton";

const CustomTable = ({ data, isLoading, error, onLoadMore }) => {
  const [order, setOrder] = useState("desc");
  const [sorted, setSorted] = useState([]);

  useEffect(() => {
    if (data) {
      setSorted(orderBy(data, "timestamp", order));
    }
  }, [data, order, setSorted]);

  const handleSort = () => {
    setOrder((order) => (order === "asc" ? "desc" : "asc"));
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          {columns.map((column) =>
            column.sortable ? (
              <TableCell
                style={{ fontWeight: "bold" }}
                key={column.key}
                sortDirection={order}
              >
                <TableSortLabel direction={order} onClick={handleSort}>
                  {column.label}
                </TableSortLabel>
              </TableCell>
            ) : (
              <TableCell style={{ fontWeight: "bold" }} key={column.key}>
                {column.label}
              </TableCell>
            )
          )}
        </TableHead>
        <TableBody>
          {sorted.map((user) => (
            <TableRow key={user.id}>
              <TableCell width={90}>{formatTimestamp(user.timestamp)}</TableCell>
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
                <LoadingButton isLoading={isLoading} onClick={onLoadMore} />
              </>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

CustomTable.propTypes = {
  data: array,
  onLoadMore: func,
  error: object,
  isLoading: bool,
};

CustomTable.defaultProps = {
  data: [],
  error: null,
  isLoading: false,
  onLoadMore: () => null,
};

CustomTable.displayName = "CustomTable";
export default CustomTable;
