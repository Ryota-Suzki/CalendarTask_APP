import React from 'react';
import { Card, CardContent, CardActions, Button, Chip, Typography, Box, Modal } from '@mui/material';
import axios from 'axios';
import TaskDetails from './TaskDetails';

const TaskList = ({ tasks, setTasks, onDeleteTask, onToggleComplete, onTaskClick, setLoading, setEvents }) => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [selectedTask, setSelectedTask] = React.useState(null);

    const handleTaskClick = (task) => {
        setSelectedTask(task);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleTaskSave = async (editedTask) => {
        try {
            setLoading(true);
            await axios.put(`http://localhost:8000/api/tasks/${editedTask.id}/`, editedTask);
            const response = await axios.get('http://localhost:8000/api/tasks/');
            setTasks(response.data);
            setEvents(response.data); // setEvents も更新する必要がある場合は追加
            setLoading(false);
        } catch (error) {
            console.error('Error saving task:', error);
            setLoading(false);
        }
    };

    return (
        <Box mt={4}>
            <Typography variant="h5" gutterBottom>
                タスクリスト
            </Typography>
            {tasks.map((task) => (
                <Card key={task.id} variant="outlined" style={{ marginBottom: '10px' }}>
                    <CardContent>
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                            onClick={() => onTaskClick(task)}
                        >
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
                        <Button onClick={() => handleTaskClick(task)} color="primary">
                            編集
                        </Button>
                    </CardActions>
                </Card>
            ))}
            <Modal open={isModalOpen} onClose={handleCloseModal}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    {selectedTask && <TaskDetails task={selectedTask} onSave={handleTaskSave} onClose={handleCloseModal} />}
                </Box>
            </Modal>
        </Box>
    );
};

export default TaskList;
