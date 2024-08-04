// EventSearchBar.js
import React, { useState } from 'react';
import {View, TextInput, Button, StyleSheet, Text} from 'react-native';
import FieldForms from "./FieldForms";
import ButtonRectangle from "./ButtonRectangle";

export default function SearchBar(){
    return(
        <SearchBar
            placeholder="Type Here..."
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    input:{
        width: '80%'
    },

    searchButton:{
        height: '40%'
    }
});