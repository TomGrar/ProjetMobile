import React from 'react';
import { Picker } from '@react-native-picker/picker';

export default function PickerComponent({ selectedValue, onValueChange, data, label }) {
    return (
        <Picker
            selectedValue={selectedValue}
            onValueChange={onValueChange}
            mode={'dialog'}
            style={{ backgroundColor: 'white', marginTop: '3%', width: '45%' }}
        >
            <Picker.Item label={label} value={''} style={{ color: 'gray', fontSize: 17 }} />
            {data.map((item, index) => (
                <Picker.Item key={index} label={item} value={item} />
            ))}
        </Picker>
    );
}