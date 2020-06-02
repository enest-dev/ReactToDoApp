import React, { FunctionComponent } from "react";
import clsx from 'clsx';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import { AutoSizer, Table, Column, TableHeaderProps } from 'react-virtualized';
import 'react-virtualized/styles.css';
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";

const columns = [
    { name: 'Task Name', dataKey: 'title', width: 140 },
    { name: 'Description', dataKey: 'description', width: 140 },
    { name: 'Assigned To', dataKey: 'assignedTo', width: 200 },
    { name: 'Action', dataKey: 'action', width: 150 },
]

const styles = (theme: Theme) =>
    createStyles({
        flexContainer: {
            display: 'flex',
            alignItems: 'center',
            boxSizing: 'border-box',
        },
        table: {
            '& .ReactVirtualized__Table__headerRow': {
                flip: false,
                color: 'white',
                backgroundColor: theme.palette.grey[200],
                paddingRight: theme.direction === 'rtl' ? '0 !important' : undefined,
            },
        },
        tableRow: {
            cursor: 'pointer',
        },
        tableRowHover: {
            '&:hover': {
                backgroundColor: theme.palette.grey[200],
            },
        },
        tableCell: {
            flex: 1,
        },
        noClick: {
            cursor: 'initial',
        },
    });

const TasksList: FunctionComponent<{ tasksList, onDelete, onEdit, classes }> = ({ tasksList, onDelete, onEdit, classes }) => {
    if (!tasksList) {
        return null
    }

    const getRowClassName = ({ index }) => {
        return clsx(classes.tableRow, classes.flexContainer, {
            [classes.tableRowHover]: index !== -1 && onEdit != null,
        });
    };


    const headerRenderer = (props: TableHeaderProps) => {
        return (
            <TableCell
                key={props.label}
                component="div"
                variant="head"
                className={clsx(classes.tableCell, classes.flexContainer, classes.noClick)}
            >
                <span>{props.label}</span>
            </TableCell>
        )
    }

    const cellRenderer = ({ label, rowData, cellData, dataKey, columnIndex }: TableHeaderProps) => {
        return (
            <TableCell
                key={columnIndex}
                component="div"
                variant="body"
                className={clsx(classes.tableCell, classes.flexContainer)}
                style={{ height: 40 }}>
                {
                    dataKey === 'action' ? (
                        <>
                            <DeleteIcon onClick={() => onDelete(rowData)} />
                            <EditIcon onClick={(e) => onEdit(rowData)} />
                        </>
                    ) : <span>
                            {dataKey === 'assignedTo' ?
                                rowData?.assignedTo?.email
                                : cellData}
                        </span>
                }
            </TableCell>
        )
    }
    return (
        <Paper style={{ height: 300, width: '100%' }}>
            <AutoSizer>
                {({ height, width }) => (
                    <Table
                        height={height}
                        width={width}
                        className={classes.table}
                        headerHeight={50}
                        rowHeight={40}
                        rowCount={tasksList.length}
                        rowClassName={getRowClassName}
                        rowGetter={({ index }) => tasksList[index]}>
                        {
                            columns.map((column, index) => {
                                return (
                                    <Column
                                        key={column.dataKey}
                                        label={column.name}
                                        dataKey={column.dataKey}
                                        width={column.width}
                                        className={classes.flexContainer}
                                        headerRenderer={headerRenderer}
                                        cellRenderer={cellRenderer}
                                    />
                                )
                            })
                        }
                    </Table>)
                }
            </AutoSizer>
        </Paper>
    )
}
export default withStyles(styles)(TasksList);