import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MyCalendar from './Calendar';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import { Container, Typography, Box, Grid, CircularProgress } from '@mui/material';

const App = () => {
  const [events, setEvents] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false); // ローディング状態を管理するステート

  useEffect(() => {
    fetchEvents();
    fetchTasks();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/tasks/');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const fetchTasks = async () => {
    try {
      setLoading(true); // タスクリスト取得開始時にローディング状態をtrueにする
      const response = await axios.get('http://localhost:8000/api/tasks/');
      setTasks(response.data);
      setLoading(false); // タスクリスト取得完了時にローディング状態をfalseにする
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setLoading(false); // エラー時にもローディング状態をfalseにする
    }
  };

  const handleEventSelect = (event) => {
    alert(`Event selected: ${event.title}`);
  };

  const handleDateSelect = (slotInfo) => {
    const newTask = {
      title: '',
      description: '',
      start_date: slotInfo.start,
      end_date: slotInfo.end,
    };
    setTasks([...tasks, newTask]);
  };

  const handleTaskAdd = async (task) => {
    try {
      setLoading(true); // タスク追加処理開始時にローディング状態をtrueにする
      await axios.post('http://localhost:8000/api/tasks/', task);
      fetchTasks();
    } catch (error) {
      console.error('Error adding task:', error);
    } finally {
      setLoading(false); // タスク追加処理完了時にローディング状態をfalseにする
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      setLoading(true); // タスク削除処理開始時にローディング状態をtrueにする
      await axios.delete(`http://localhost:8000/api/tasks/${taskId}/`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    } finally {
      setLoading(false); // タスク削除処理完了時にローディング状態をfalseにする
    }
  };

  const handleToggleComplete = async (taskId) => {
    try {
      setLoading(true); // タスク完了状態の変更処理開始時にローディング状態をtrueにする
      const taskToToggle = tasks.find((task) => task.id === taskId);
      const updatedTask = { ...taskToToggle, completed: taskToToggle.completed === 'Completed' ? 'Incomplete' : 'Completed' };
      await axios.put(`http://localhost:8000/api/tasks/${taskId}/`, updatedTask);
      fetchTasks();
    } catch (error) {
      console.error('Error toggling task completion:', error);
    } finally {
      setLoading(false); // タスク完了状態の変更処理完了時にローディング状態をfalseにする
    }
  };

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h3" align="center" gutterBottom>
          Calendar and Task Management App
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box p={2} border={1} borderRadius={5} bgcolor="#f9f9f9" boxShadow={2}>
              <MyCalendar events={events} onEventSelect={handleEventSelect} onDateSelect={handleDateSelect} />
            </Box>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Box p={2} border={1} borderRadius={5} bgcolor="#f9f9f9" boxShadow={2}>
              <TaskForm onTaskAdd={handleTaskAdd} />
            </Box>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Box p={2} border={1} borderRadius={5} bgcolor="#f9f9f9" boxShadow={2}>
              {loading ? (
                <CircularProgress />
              ) : (
                <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} onToggleComplete={handleToggleComplete} />
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default App;