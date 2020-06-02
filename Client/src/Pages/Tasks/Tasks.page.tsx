import React, { useState, FunctionComponent, useEffect } from 'react';
import { Dialog, ProgressLoader } from '@components/Shared';
import TaskEditor from './TaskEditor/TaskEditor';
import TasksList from './TasksList/TasksList';
import { dataService } from '@services';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { Task } from '@models';
import "./Tasks.page.scss";

const TasksPage: FunctionComponent = () => {
    const [toDos, setToDos] = useState([]);
    const [toDoUsers, setToDoUsers] = useState([]);
    const [showAddComponent, setVisible] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [selectedTask, setSelectedTask] = useState(new Task());

    useEffect(() => { getAllToDoTaskLists(); getAllToDoUsers(); }, []);

    const getAllToDoTaskLists = async () => {
        setLoading(true);
        const toDoTaskLists = await dataService.getToDoTaskLists();
        setLoading(false);
        setToDos(toDoTaskLists);
    }

    const getAllToDoUsers = async () => {
        const toDoUserList = await dataService.getAllUsers();
        setToDoUsers(toDoUserList);
    }

    const showAddToDoModal = (isVisible: boolean) => {
        setVisible(isVisible);
        if (!isVisible) {
            setSelectedTask(new Task())
        }
    }

    const onEditTodoItem = (task) => {
        setSelectedTask({ ...task, assignedTo: task.assignedTo ? task.assignedTo.id : '' });
        showAddToDoModal(true);
    }

    const onDeleteToDoItem = async (task) => {
        setLoading(true);
        const response = await dataService.deleteToDoTask(task.id);
        setLoading(false);
        if (response) {
            getAllToDoTaskLists();
        }
    }

    return (
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="stretch"
            spacing={1}
        >
            <Grid
                container
                direction="row"
                justify="flex-end"
                alignItems="center">
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => showAddToDoModal(true)}
                    startIcon={<AddIcon />}>
                    Add New Task
            </Button>
            </Grid>
            {isLoading && <ProgressLoader type="linear" />}
            <TasksList tasksList={toDos} onDelete={onDeleteToDoItem} onEdit={onEditTodoItem} />
            <Dialog
                title={`${selectedTask.id ? 'Update' : 'Add'} Task`}
                open={showAddComponent}
                onClose={() => showAddToDoModal(false)}
                uniquePaperClass="converter-modal"
                dialogContent={() =>
                    <TaskEditor
                        task={selectedTask}
                        handleCancel={(refreshList: boolean) => {
                            showAddToDoModal(false);
                            if (refreshList) {
                                getAllToDoTaskLists();
                            }
                        }}
                        toDoUsers={toDoUsers}
                    />
                }
            />
        </Grid>
    );
}

export default TasksPage;