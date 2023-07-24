import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const MyCalendar = ({ events, onEventSelect, onDateSelect }) => {
    const [calendarEvents, setCalendarEvents] = useState(events);

    useEffect(() => {
        setCalendarEvents(events);
    }, [events]);

    const handleEventSelect = (event) => {
        onEventSelect(event); // イベント（タスク）選択のハンドラを親コンポーネントに伝える
    };

    const handleDateSelect = (slotInfo) => {
        const newTask = {
            title: '',
            description: '',
            start_date: slotInfo.start,
            end_date: slotInfo.end,
        };
        onDateSelect(newTask); // 日付選択のハンドラを親コンポーネントに伝える
    };

    return (
        <div style={{ height: '500px' }}>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor={(event) => new Date(event.start_date)}
                endAccessor={(event) => new Date(event.end_date)}
                onSelectEvent={handleEventSelect} // タスクが選択されたときの処理
                onSelectSlot={handleDateSelect}
                style={{ height: "100%" }}
            />
        </div>
    );
};

export default MyCalendar;
