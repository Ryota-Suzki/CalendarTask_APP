// TaskList.js

import React from 'react';
import { List, ListItem, ListItemText, Typography, Chip, Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const TaskList = ({ tasks, onDeleteTask }) => {
    return (
        <Box mt={4} p={2} border={1} borderRadius={5} bgcolor="#f9f9f9" boxShadow={2}>
            <Typography variant="h5" gutterBottom>
                タスクリスト
            </Typography>
            <List>
                {tasks.map((task) => (
                    <ListItem key={task.id}>
                        <ListItemText
                            primary={task.title}
                            secondary={
                                <>
                                    <Typography component="span" variant="body2" color="text.primary">
                                        {task.description}
                                    </Typography>
                                    <br />
                                    {task.importance === 'Low' && <Chip label="Low" color="primary" />}
                                    {task.importance === 'Medium' && <Chip label="Medium" color="warning" />}
                                    {task.importance === 'High' && <Chip label="High" color="error" />}
                                    &nbsp;開始: {new Date(task.start_date).toLocaleString()}
                                    &nbsp;終了: {new Date(task.end_date).toLocaleString()}
                                </>
                            }
                        />
                        <IconButton onClick={() => onDeleteTask(task.id)} aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default TaskList;
