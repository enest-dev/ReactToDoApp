import React, { FunctionComponent } from "react";
import { useState } from "react";
import { FormControl, TextField, Select, Input, MenuItem, InputLabel, Button, Grid } from '@material-ui/core';
import { dataService } from "@services";
import { ProgressLoader } from "@shared";
import './TaskEditor.scss';

const TaskEditor: FunctionComponent<{ task, handleCancel, toDoUsers }> =
    ({ task, handleCancel, toDoUsers }) => {
        const [taskValues, setTaskValues] = useState(task || {});
        const [errors, setErrors] = useState({ title: '', });
        const [isLoading, setLoading] = useState(false);

        const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = event.target;
            event.persist();
            setTaskValues({ ...taskValues, [name]: value });
        };

        const handleSubmit = async (event: any) => {
            if (event) event.preventDefault();
            const errorList = validate(taskValues);
            setErrors({ ...errorList });
            if (!errorList.valid)
                return;

            setLoading(true);
            console.log('setLoading', isLoading);
            const taskResponse = await dataService.upsertTask(taskValues);
            setLoading(false);
            if (taskResponse) {
                handleCancel(true);
            }
        };

        const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
            setTaskValues({ ...taskValues, assignedTo: event.target.value });
        };

        const { title, description, assignedTo } = taskValues;

        return (
            <Grid container spacing={1}>
                <FormControl
                    margin="normal"
                    fullWidth
                >
                    <TextField
                        id="title"
                        name="title"
                        label="Write a title"
                        onChange={handleInputChange}
                        helperText={errors.title}
                        required
                        error={errors.title ? true : false}
                        value={title} />
                </FormControl>
                <FormControl
                    className=""
                    margin="normal"
                    fullWidth
                >
                    <TextField
                        name="description"
                        label="Write a description"
                        onChange={handleInputChange}
                        value={description} />
                </FormControl>
                <FormControl
                    className=""
                    margin="normal"
                    fullWidth
                >
                    <InputLabel id="userSelection">Select user</InputLabel>
                    <Select
                        value={assignedTo}
                        onChange={handleSelectChange}
                        input={<Input />}
                    >
                        {
                            toDoUsers && toDoUsers.map((userInfo) => (
                                <MenuItem key={userInfo.id} value={userInfo.id}>
                                    {userInfo.name}
                                </MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
                {isLoading && <ProgressLoader type="linear" />}
                <Grid
                    container
                    direction="row"
                    justify="flex-end"
                    alignItems="center"
                    spacing={1}
                >
                    <Button
                        className="button-margin"
                        variant="contained"
                        color="primary"
                        onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button
                        className="button-margin"
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}>
                        Save
                    </Button>
                </Grid>
            </Grid>
        );
    }

function validate(values) {
    let errors = { title: '', valid: true };
    if (!values.title) {
        errors.title = 'Title is required.';
        errors.valid = false;
    }
    return errors;
};

export default TaskEditor;