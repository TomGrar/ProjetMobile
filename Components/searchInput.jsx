import React from 'react';
import FieldForms from '../Components/FieldForms';

export default function SearchInput({ value, onChangeText, placeholder, style }) {
    return (
        <FieldForms
            style={style}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
        />
    );
}