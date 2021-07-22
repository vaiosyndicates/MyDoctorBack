import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { create } from 'lodash';
import { Link, NavLink, Redirect } from 'react-router-dom';
import Button from '../../atom/Button';


const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

const List = ({type, data, handleDelete}) => {

  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const rows = [];

  if(type == 'hospital') {

    const columns = [
      { id: 'id', label: 'ID', minWidth: 170 },
      { id: 'title', label: 'Name', minWidth: 170 },
      { id: 'type', label: 'Type', minWidth: 170 },
      { id: 'address', label: 'Address', minWidth: 170 },
      { id: 'pic', label: 'Image', minWidth: 170, format: 'image' },
      { id: 'edit', label: 'Edit', minWidth: 170, format: 'editable' },
      { id: 'delete', label: 'Delete', minWidth: 170, format: 'deleteable' },
    ];
  
    function createData(id, title, type, address, pic) {
      return { id, title, type, address, pic };
    }
  
    for (let index = 0; index < data.length; index++) {
      rows.push(
        createData(data[index].id, data[index].data.title, data[index].data.type, data[index].data.address, data[index].data.thumbnail)
      );
      
    }
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
  
    return (
      <>
        <Paper className={classes.root}>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row,i) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value = row.[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format === 'image' ? <img src={row.['pic']} className="img-responsive" /> : 
                             column.format === 'editable' ? <Link to={`/edithospital/${row.id}`} className="btn btn-primary btn-user btn-block">Edit</Link> :
                             column.format === 'deleteable' ? <Button cls='btn btn-primary btn-user btn-block' onClick={() => handleDelete(row.id)} label='Delete' /> : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </>
    );
  } else {

    const columns = [
      { id: 'id', label: 'ID', minWidth: 170 },
      { id: 'title', label: 'Article Title', minWidth: 170 },
      { id: 'body', label: 'Article Body', minWidth: 170 },
      { id: 'date', label: 'Date', minWidth: 170 },
      { id: 'pic', label: 'Image', minWidth: 170, format: 'image' },
      { id: 'edit', label: 'Edit', minWidth: 170, format: 'editable' },
      { id: 'delete', label: 'Delete', minWidth: 170, format: 'deleteable' },
    ];
  
    function createData(id, title, body, date, pic) {
      return { id, title, body, date, pic };
    }
  
    for (let index = 0; index < data.length; index++) {
      rows.push(
        createData(data[index].id, data[index].data.title, data[index].data.body, data[index].data.date, data[index].data.thumbnail)
      );
      
    }
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
  
    return (
      <>
        <Paper className={classes.root}>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row,i) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value = row.[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format === 'image' ? <img src={row.['pic']} className="img-responsive" /> : 
                             column.format === 'editable' ? <Link to={`/editarticle/${row.id}`} className="btn btn-primary btn-user btn-block">Edit</Link> :
                             column.format === 'deleteable' ? <Button cls='btn btn-primary btn-user btn-block' onClick={() => handleDelete(row.id)} label='Delete' /> : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </>
    );
  }
}

export default List
