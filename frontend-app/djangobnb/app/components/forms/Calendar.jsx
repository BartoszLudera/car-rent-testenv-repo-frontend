'use client';

import React from 'react';
import { DateRange } from 'react-date-range';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const DatePicker = ({ value, onChange, bookedDates }) => {
    const defaultValue = {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    };
    
    const ranges = value ? [value] : [defaultValue];
    
    return (
        <DateRange
            className='w-full border border-gray-400 rounded-xl mb-4'
            rangeColors={['#262626']}
            ranges={ranges}
            date={new Date()}
            onChange={onChange}
            direction='vertical'
            showDateDisplay={false}
            minDate={new Date()}
            disabledDates={bookedDates || []}
        />
    );
};

export default DatePicker;
