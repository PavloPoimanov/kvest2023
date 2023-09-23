import React, { useState } from 'react';

const Names = () => {
    // Sample data for names and definitions (replace with your data)
    const initialNames = [
        { id: 1, name: 'John', definition: 'God is gracious' },
        { id: 2, name: 'Emma', definition: 'Whole or complete' },
        { id: 3, name: 'Michael', definition: 'Who is like God' },
        // Add more names and definitions as needed
    ];

    const [names, setNames] = useState(initialNames);
console.log(setNames)
    return (
        <div>
            <h1>Names Page</h1>
            <ul>
                {names.map((nameData) => (
                    <li key={nameData.id}>
                        <strong>{nameData.name}:</strong> {nameData.definition}
                    </li>
                ))}
            </ul>
            {/* Add a form to add new names and definitions */}
            <form>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" />
                <label htmlFor="definition">Definition:</label>
                <input type="text" id="definition" name="definition" />
                <button type="submit">Add Name</button>
            </form>
        </div>
    );
};

export default Names;
