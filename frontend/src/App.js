// frontend/src/App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MyCalendar from './Calendar';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import { Container, Typography, Box, Grid } from '@mui/material';

const App = () => {
  const [events, setEvents] = useState([]);
  console.log(events)
  const [tasks, setTasks] = useState([]); // タスクリストを保持するstate

  useEffect(() => {
    fetchEvents(); // コンポーネントのマウント時にイベントを取得
    fetchTasks(); // コンポーネントのマウント時にタスクリストを取得
  }, []);


  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/tasks/'); // URLを正しく指定
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/tasks/'); // DjangoのREST APIからタスクリストを取得
      setTasks(response.data); // タスクリストをstateにセット
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleEventSelect = (event) => {
    // イベントの詳細を表示する処理
    alert(`Event selected: ${event.title}`);
  };

  const handleDateSelect = (slotInfo) => {
    // 新しいタスクを追加する処理
    const newTask = {
      title: '',
      description: '',
      start_date: slotInfo.start,
      end_date: slotInfo.end,
    };
    setTasks([...tasks, newTask]); // 新しいタスクを追加してタスクリストを更新
  };

  const handleTaskAdd = async (task) => {
    try {
      await axios.post('http://localhost:8000/api/tasks/', task); // タスクを追加
      fetchTasks(); // タスクリストを更新
    } catch (error) {
      console.error('Error adding task:', error);
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
              <TaskList tasks={tasks} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default App;
