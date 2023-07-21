import React, { useState } from 'react';
import { TextField, Button, Grid, Container, Typography, Box } from '@mui/material';

const TaskForm = ({ onTaskAdd }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // 入力値を新しいタスクとして追加する処理
        const newTask = {
            title: title,
            description: description,
            start_date: startDate,
            end_date: endDate,
        };

        onTaskAdd(newTask);

        // フォームをリセット
        setTitle('');
        setDescription('');
        setStartDate('');
        setEndDate('');
    };

    return (
        <Container maxWidth="md">
            <Box mt={4} p={2} border={1} borderRadius={5} bgcolor="#f9f9f9" boxShadow={2}>
                <Typography variant="h5" gutterBottom>
                    タスクを追加
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="タイトル"
                                value={title}
                                onChange={handleTitleChange}
                                variant="outlined"
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="説明"
                                value={description}
                                onChange={handleDescriptionChange}
                                multiline
                                rows={4}
                                variant="outlined"
                                required
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                type="datetime-local"
                                label="開始日時"
                                value={startDate}
                                onChange={handleStartDateChange}
                                variant="outlined"
                                required
                                InputLabelProps={{
                                    shrink: true, // フォーカス時にラベルを縮小しない
                                }}
                                InputProps={{
                                    inputProps: {
                                        min: '1970-01-01T00:00',
                                        max: endDate,
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                type="datetime-local"
                                label="終了日時"
                                value={endDate}
                                onChange={handleEndDateChange}
                                variant="outlined"
                                required
                                InputLabelProps={{
                                    shrink: true, // フォーカス時にラベルを縮小しない
                                }}
                                InputProps={{
                                    inputProps: {
                                        min: startDate,
                                        max: '2100-12-31T23:59',
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary">
                                タスクを追加
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Container>
    );
};

export default TaskForm;
