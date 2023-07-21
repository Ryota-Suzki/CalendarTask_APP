import React from 'react';
import { Typography, List, ListItem, ListItemText, Divider, Box } from '@mui/material';
import moment from 'moment';

const TaskList = ({ tasks }) => {
    return (
        <Box mt={4} p={2} border={1} borderRadius={5} bgcolor="#f9f9f9" boxShadow={2}>
            <Typography variant="h5" gutterBottom>
                タスクリスト
            </Typography>
            <List>
                {tasks.map((task, index) => (
                    <React.Fragment key={index}>
                        <ListItem>
                            <ListItemText primary={task.title} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary={`説明文: ${task.description}`} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary={`開始日時: ${moment(task.start_date).format('YYYY/MM/DD HH:mm')}
                                - 終了日時: ${moment(task.end_date).format('YYYY/MM/DD HH:mm')}`} />
                        </ListItem>
                        <Divider />
                    </React.Fragment>
                ))}
            </List>
        </Box>
    );
};

export default TaskList;
