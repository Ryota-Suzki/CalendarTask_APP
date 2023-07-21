import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const MyCalendar = ({ events, onEventSelect, onDateSelect }) => {
    return (
        <div style={{ height: "500px" }}>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor={(event) => new Date(event.start_date)}
                endAccessor={(event) => new Date(event.end_date)}
                onSelectEvent={onEventSelect}
                onSelectSlot={onDateSelect}
                style={{ height: "100%" }}
            />
        </div>
    );
};


export default MyCalendar;
