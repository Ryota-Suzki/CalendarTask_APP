import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardActions, Button, Typography, Box, Modal, ToggleButtonGroup, ToggleButton, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import TaskDetails from './TaskDetails';

const TaskList = ({ tasks, setTasks, onDeleteTask, setLoading, setEvents, fetchTasks, fetchEvents }) => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [selectedTask, setSelectedTask] = React.useState(null);
    const [sortOption, setSortOption] = useState(() => {
        const storedSortOption = localStorage.getItem('sortOption');
        return storedSortOption || 'default';
    });
    const [sortOrder, setSortOrder] = useState('asc');

    console.log(tasks)
    const handleSortChange = (event) => {
        setSortOption(event.target.value);
    };

    const handleSortOrderChange = (event) => {
        setSortOrder(event.target.value);
    };

    useEffect(() => {
        localStorage.setItem('sortOption', sortOption);
    }, [sortOption]);

    // タスクをソートする関数
    const sortTasks = (tasks, sortBy, order) => {
        const sortedTasks = [...tasks];
        switch (sortBy) {
            case 'title':
                sortedTasks.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'startDate':
                sortedTasks.sort((a, b) => new Date(a.start_date) - new Date(b.start_date));
                break;
            case 'endDate':
                sortedTasks.sort((a, b) => new Date(a.end_date) - new Date(b.end_date));
                break;
            case 'completed':
                sortedTasks.sort((a, b) => (a.completed === 'Completed' ? 1 : -1) - (b.completed === 'Completed' ? 1 : -1));
                break;
            default:
                break;
        }
        return order === 'asc' ? sortedTasks : sortedTasks.reverse();
    };

    // ソートされたタスクリストを取得
    const sortedTasks = sortTasks(tasks, sortOption, sortOrder);

    const handleTaskClick = (task, event) => {
        if (event.target.tagName.toLowerCase() !== 'button') {
            setSelectedTask(task);
            setIsModalOpen(!isModalOpen);
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
            fetchEvents();
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
        <Box sx={{ mt: 4, overflow: 'auto', maxHeight: '540px' }}>
            <Typography variant="h5" gutterBottom sx={{ position: 'sticky', top: 0, bgcolor: '#f9f9f9', zIndex: 1, p: 2 }}>
                タスクリスト
            </Typography>
            {/* ソートオプションとソート順のセレクトボックス */}
            <Box sx={{ m: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <FormControl variant="outlined" fullWidth sx={{ minWidth: 150, mr: 2 }}>
                    <InputLabel htmlFor="sort-option">ソート</InputLabel>
                    <Select
                        value={sortOption}
                        onChange={handleSortChange}
                        label="ソート"
                        inputProps={{
                            name: 'sort-option',
                            id: 'sort-option',
                        }}
                    >
                        <MenuItem value="default">デフォルト</MenuItem>
                        <MenuItem value="title">タイトル</MenuItem>
                        <MenuItem value="startDate">開始日時</MenuItem>
                        <MenuItem value="endDate">終了日時</MenuItem>
                        <MenuItem value="completed">完了状態</MenuItem>
                    </Select>
                </FormControl>
                <FormControl variant="outlined" fullWidth sx={{ minWidth: 150 }}>
                    <InputLabel htmlFor="sort-order">ソート順</InputLabel>
                    <Select
                        value={sortOrder}
                        onChange={handleSortOrderChange}
                        label="ソート順"
                        inputProps={{
                            name: 'sort-order',
                            id: 'sort-order',
                        }}
                    >
                        <MenuItem value="asc">昇順</MenuItem>
                        <MenuItem value="desc">降順</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            {
                sortedTasks.map((task) => (
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
                            <Button onClick={() => onDeleteTask(task.id)} color="secondary" sx={{ border: '1px solid lightgray' }}>
                                削除
                            </Button>
                            {!isModalOpen && (
                                <Button onClick={() => handleTaskDetail(task)} color="primary" sx={{ border: '1px solid lightgray' }}>
                                    編集
                                </Button>
                            )}
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
