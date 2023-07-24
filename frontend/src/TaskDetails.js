import React, { useState } from 'react';
import {
    TextField,
    Button,
    Grid,
    Container,
    Typography,
    Box,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from '@mui/material';

const TaskDetails = ({ task, onSave, onClose, setLoading }) => {
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [startDate, setStartDate] = useState(task.start_date.slice(0, -1));
    const [endDate, setEndDate] = useState(task.end_date.slice(0, -1));
    const [importance, setImportance] = useState(task.importance);
    const [completed, setCompleted] = useState(task.completed);

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

    const handleImportanceChange = (event) => {
        setImportance(event.target.value);
    };

    const handleCompletedChange = (event) => {
        setCompleted(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // 更新後のタスクを作成
        const updatedTask = {
            id: task.id,
            title: title,
            description: description,
            start_date: startDate + 'Z', // タイムゾーン情報を再度追加
            end_date: endDate + 'Z', // タイムゾーン情報を再度追加
            importance: importance,
            completed: completed,
        };

        // ローディング状態を設定
        // setLoading(true);

        // タスクの保存処理を行う
        await onSave(updatedTask);

        // ローディング状態を解除
        // setLoading(false);

        // モーダルを閉じる
        onClose();
    };

    return (
        <Container maxWidth="xs">
            <Box p={2} bgcolor="#fff" boxShadow={3}>
                <Typography variant="h6" gutterBottom>
                    タスクの編集
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField fullWidth label="タイトル" value={title} onChange={handleTitleChange} variant="outlined" required />
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
                                    shrink: true,
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
                                    shrink: true,
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
                            <FormControl fullWidth required>
                                <InputLabel>重要度</InputLabel>
                                <Select name="importance" value={importance} onChange={handleImportanceChange}>
                                    <MenuItem value="Low">Low</MenuItem>
                                    <MenuItem value="Medium">Medium</MenuItem>
                                    <MenuItem value="High">High</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth required>
                                <InputLabel>完了状態</InputLabel>
                                <Select name="completed" value={completed} onChange={handleCompletedChange}>
                                    <MenuItem value="Incomplete">未完了</MenuItem>
                                    <MenuItem value="Completed">完了</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button type="submit" variant="contained" color="primary">
                                保存
                            </Button>
                            <Button onClick={onClose} variant="contained" color="secondary" sx={{ ml: 2 }}>
                                キャンセル
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Container>
    );
};

export default TaskDetails;