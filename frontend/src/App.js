import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MyCalendar from './Calendar';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import TaskDetails from './TaskDetails';
import { Container, Typography, Box, Grid, CircularProgress, createTheme, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

const App = () => {
  const [events, setEvents] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [taskDetailsOpen, setTaskDetailsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    fetchEvents();
    fetchTasks();
  }, []);

  const theme = createTheme({
    palette: {
      type: 'dark',
    },
  });

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
      setLoading(true);
      const response = await axios.get('http://localhost:8000/api/tasks/');
      setTasks(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setLoading(false);
    }
  };

  const handleEventSelect = (event) => {
    setSelectedTask(event); // 選択されたイベント（タスク）をセット
    setTaskDetailsOpen(true); // 編集画面を表示
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
      setLoading(true);
      await axios.post('http://localhost:8000/api/tasks/', task);
      await fetchTasks();
      setEvents([...events, task]); // events ステートを更新
    } catch (error) {
      console.error('Error adding task:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:8000/api/tasks/${taskId}/`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    } finally {
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

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setTaskDetailsOpen(true);
  };

  const handleTaskSave = async (editedTask) => {
    try {
      setLoading(true);
      await axios.put(`http://localhost:8000/api/tasks/${editedTask.id}/`, editedTask);
      await fetchTasks();
      setEvents(events.filter((task) => task.id !== editedTask.id).concat(editedTask));
    } catch (error) {
      console.error('Error saving task:', error);
    } finally {
      setLoading(false);
      setTaskDetailsOpen(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <Box my={4}>
          <Typography variant="h3" align="center" gutterBottom>
            Calendar and Task Management App
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box p={2} border={1} borderRadius={5} bgcolor="#f9f9f9" boxShadow={2}>
                <MyCalendar
                  key={JSON.stringify(events)} // eventsが変更されたときにカレンダーを再描画する
                  events={events}
                  onEventSelect={handleEventSelect}
                  onDateSelect={handleDateSelect}
                />
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
                  <TaskList tasks={tasks}
                    setTasks={setTasks}
                    onDeleteTask={handleDeleteTask}
                    onToggleComplete={handleToggleComplete}
                    onTaskClick={handleTaskClick}
                    setLoading={setLoading}
                    setEvents={setEvents}
                    fetchTasks={fetchTasks} />
                )}
                {taskDetailsOpen && selectedTask && (
                  <Dialog open={taskDetailsOpen} onClose={() => setTaskDetailsOpen(false)}>
                    <DialogContent>
                      <TaskDetails
                        task={selectedTask}
                        onSave={handleTaskSave}
                        onClose={() => setTaskDetailsOpen(false)}
                        setLoading={setLoading}
                      />
                    </DialogContent>
                  </Dialog>
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default App;
