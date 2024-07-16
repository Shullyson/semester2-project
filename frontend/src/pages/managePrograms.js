import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './admin.css';

const Programs = ({ handleClose }) => {
    const [programs, setPrograms] = useState([]);
    const [newProgram, setNewProgram] = useState('');

    useEffect(() => {
        fetchPrograms();
    }, []);

    const fetchPrograms = () => {
        axios.get('http://localhost:5000/adminprograms')
            .then(response => {
                setPrograms(response.data);
            })
            .catch(error => {
                console.error('Error fetching programs:', error);
            });
    };

    const addProgram = () => {
        axios.post('http://localhost:5000/adminprograms', { program_name: newProgram })
            .then(() => {
                fetchPrograms();
                setNewProgram('');
            })
            .catch(error => {
                console.error('Error adding program:', error);
            });
    };

    const updateProgram = (id, programName) => {
        axios.put(`http://localhost:5000/adminprograms/${id}`, { program_name: programName })
            .then(() => {
                fetchPrograms();
            })
            .catch(error => {
                console.error('Error updating program:', error);
            });
    };

    const deleteProgram = (id) => {
        axios.delete(`http://localhost:5000/adminprograms/${id}`)
            .then(() => {
                fetchPrograms();
            })
            .catch(error => {
                console.error('Error deleting program:', error);
            });
    };

    const handleSave = () => {
        handleClose();
    };

    const handleCancel = () => {
        handleClose();
    };


    return (
        <div className="programs-container">
            <h2>Manage Programs</h2>
            <div className="form-container">
                <input
                    type="text"
                    name="program"
                    placeholder="Program Name"
                    value={newProgram}
                    onChange={(e) => setNewProgram(e.target.value)}
                />
                <button onClick={addProgram}>Add Program</button>
            </div>
            <ul className="programs-list">
                {programs.map(program => (
                    <li key={program.ID}>
                        <span>{program.ProgramName}</span>
                        <button onClick={() => updateProgram(program.ID, program.ProgramName)}>Update</button>
                        <button onClick={() => deleteProgram(program.ID)}>Delete</button>
                    </li>
                ))}
            </ul>
            <div className="modal-footer">
                <div className="button-container">
                <button onClick={handleSave}>Save</button>
                <button className="cancel" onClick={handleCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default Programs;
