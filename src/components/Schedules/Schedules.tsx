import React, {useState} from "react";
import './Schedules.css';
import {AddSubjectCard} from "../AddSubjectCard";
import {SubjectCard} from "../SubjectCard";
import {Subject} from "../../config/interfaces";
import {AddSubjectForm} from "../AddSubjectForm";

export const mockSubjects: Subject[] = [
    {
        id: 1,
        name: "Mathematics",
        startTime: "08:30",
        endTime: "10:15",
        gapTime: "1:45",
        description: "Introduction to algebra and geometry"
    },
    {
        id: 2,
        name: "Physics",
        startTime: "10:30",
        endTime: "12:00",
        gapTime: "1:30",
        description: "Fundamentals of mechanics and thermodynamics"
    },
    {
        id: 3,
        name: "Chemistry",
        startTime: "12:30",
        endTime: "14:00",
        gapTime: "1:30",
        description: "Exploring organic and inorganic chemistry",
        attendance: true,
    },
];

const Schedules = () => {
    const [subjects, setSubjects] = useState<Subject[]>(mockSubjects);
    const [showAddForm, setShowAddForm] = useState(false);

    const handleAddSubject = (newSubject: Subject) => {
        setSubjects([...subjects, newSubject]);
        setShowAddForm(false); // Hide the form after adding
    };

    const toggleAddForm = () => {
        setShowAddForm(!showAddForm);
    };


    console.log(showAddForm, 'dssdssdsdds')

    return (
        <div className={'schedules'}>
            <AddSubjectCard addSubject={toggleAddForm}/>
            {showAddForm && <AddSubjectForm onAddSubject={handleAddSubject} />}
            {subjects.map(subject => (
                <SubjectCard key={subject.id} subject={subject} />
            ))}
        </div>
    )
}

export { Schedules, };
