import React from 'react';
import '../../App.css'

const TextInput = ({ value, onChange }) => {
    return (
        <div>
            <input 
                type="text" 
                value={value} 
                onChange={onChange} 
                placeholder="Enter text"
            />
        </div>
    );
};

export default TextInput;