import React from 'react';
import { Card, CardContent, CardActions, Button, Chip, Typography, Box, Modal, ToggleButtonGroup, ToggleButton, Switch } from '@mui/material';
import axios from 'axios';
import TaskDetails from './TaskDetails';

const TaskList = ({ tasks, setTasks, onDeleteTask, onToggleComplete, onTaskClick, setLoading, setEvents, fetchTasks }) => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [selectedTask, setSelectedTask] = React.useState(null);

    const handleTaskClick = (task, event) => {
        // トグルボタンがクリックされた場合は編集画面を表示しない
        if (event.target.tagName.toLowerCase() !== 'button') {
            setSelectedTask(task);
            setIsModalOpen(!isModalOpen); // トグル状態を反転させる
        }
    };

    const handleTaskDetail = (task) => {
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

    const handleToggleComplete = async (taskId) => {
        try {
            setLoading(true);
            const taskToToggle = tasks.find((task) => task.id === taskId);
            const updatedTask = { ...taskToToggle, completed: taskToToggle.completed === 'Completed' ? 'Incomplete' : 'Completed' };
            await axios.put(`http://localhost:8000/api/tasks/${taskId}/`, updatedTask);
            fetchTasks();
        } catch (error) {
            console.error('Error toggling task completion:', error);
        } finally {
            setLoading(false);
        }
    };

    const getBorderColor = (importance) => {
        if (importance === 'Low') {
            return 'blue'; // 低い重要度の場合は青色の枠
        } else if (importance === 'Medium') {
            return 'orange'; // 中程度の重要度の場合はオレンジ色の枠
        } else if (importance === 'High') {
            return 'red'; // 高い重要度の場合は赤色の枠
        } else {
            return 'gray'; // それ以外の場合は灰色の枠
        }
    };

    return (
        <Box mt={4} overflow="auto" maxHeight="540px">
            <Typography variant="h5" gutterBottom sx={{ position: 'sticky', top: 0, bgcolor: '#f9f9f9', zIndex: 1, p: 2 }}>
                タスクリスト
            </Typography>
            {tasks.map((task) => (
                <Card key={task.id} variant="outlined"
                    style={{
                        marginBottom: '10px', border: `2px solid ${getBorderColor(task.importance)}`,
                        opacity: task.completed === 'Completed' ? 0.7 : 1,
                    }}>
                    <CardContent>
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                            onClick={(event) => handleTaskClick(task, event)}
                        >
                            <Typography variant="h6" style={{ textDecoration: task.completed === 'Completed' ? 'line-through' : 'none' }}>
                                {task.title}
                            </Typography>
                            <Box>
                                <ToggleButtonGroup
                                    value={task.completed}
                                    exclusive
                                    onChange={() => handleToggleComplete(task.id)}
                                    sx={{ borderRadius: '25px' }}
                                >
                                    <ToggleButton value="Incomplete" color="primary">
                                        未完了
                                    </ToggleButton>
                                    <ToggleButton value="Completed" color="success">
                                        完了
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </Box>
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
                        <Button onClick={() => handleTaskDetail(task)} color="primary">
                            編集
                        </Button>
                    </CardActions>
                </Card >
            ))
            }
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
        </Box >
    );
};

export default TaskList;
