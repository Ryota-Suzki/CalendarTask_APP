import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const MyCalendar = ({ events, onEventSelect, onDateSelect }) => {
    const [calendarEvents, setCalendarEvents] = useState(events);
    console.log(events)

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
    const eventStyleGetter = (event, start, end, isSelected) => {
        // 重要度に応じた色をイベントのスタイルに適用
        const backgroundColor = event.color || 'gray'; // 重要度に応じた色が設定されていない場合は灰色をデフォルトとする

        const style = {
            backgroundColor,
            borderRadius: '5px',
            opacity: 0.8,
            color: 'white',
            border: '0px',
            display: 'block',
        };

        return {
            style,
        };
    };

    return (
        <div style={{ height: '500px' }}>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor={(event) => new Date(event.start_date)}
                endAccessor={(event) => new Date(event.end_date)}
                onSelectEvent={handleEventSelect}
                onSelectSlot={handleDateSelect}
                eventPropGetter={eventStyleGetter} // イベントのスタイルをカスタマイズするプロパティを追加
                style={{ height: '100%' }}
            />
        </div>
    );
};

export default MyCalendar;
