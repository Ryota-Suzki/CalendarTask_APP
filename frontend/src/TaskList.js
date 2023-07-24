import React from 'react';
import { Card, CardContent, CardActions, Button, Chip, Typography, Box } from '@mui/material';

const TaskList = ({ tasks, onDeleteTask, onToggleComplete }) => {
    return (
        <Box mt={4}>
            <Typography variant="h5" gutterBottom>
                タスクリスト
            </Typography>
            {tasks.map((task) => (
                <Card key={task.id} variant="outlined" style={{ marginBottom: '10px' }}>
                    <CardContent>
                        <Box display="flex" alignItems="center" justifyContent="space-between">
                            <Typography variant="h6">{task.title}</Typography>
                            {task.importance === 'Low' && <Chip label="Low" color="primary" />}
                            {task.importance === 'Medium' && <Chip label="Medium" color="warning" />}
                            {task.importance === 'High' && <Chip label="High" color="error" />}
                            {task.completed === 'Completed' ? (
                                <Chip label="完了" color="primary" />
                            ) : (
                                <Chip label="未完了" color="default" />
                            )}
                        </Box>
                        <Typography color="textSecondary">{task.description}</Typography>
                        <Box mt={2}>
                            <Typography variant="body2" component="span">
                                開始: {new Date(task.start_date).toLocaleString()}
                            </Typography>
                            &nbsp;&nbsp;
                            <Typography variant="body2" component="span">
                                終了: {new Date(task.end_date).toLocaleString()}
                            </Typography>
                        </Box>
                    </CardContent>
                    <CardActions>
                        <Button onClick={() => onDeleteTask(task.id)} color="secondary">
                            削除
                        </Button>
                        <Button onClick={() => onToggleComplete(task.id)} color="primary">
                            {task.completed === 'Completed' ? '未完了に変更' : '完了に変更'}
                        </Button>
                    </CardActions>
                </Card>
            ))}
        </Box>
    );
};

export default TaskList;
