import React, {useRef, useState} from "react";
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
        description: "Introduction to algebra and geometry",
        attendance: false,
    },
    {
        id: 2,
        name: "Physics",
        startTime: "10:30",
        endTime: "12:00",
        gapTime: "1:30",
        description: "Fundamentals of mechanics and thermodynamics",
        attendance: false,
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
    const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
    const addSubjectFormRef = useRef<{ focusNameInput: () => void }>(null);


    const handleEditSubject = (subject: Subject) => {
        setEditingSubject(subject);
        setShowAddForm(true); // Show the form for editing
        setTimeout(() => addSubjectFormRef.current?.focusNameInput(), 5);
    };


    const handleAddSubject = (newSubject: Subject) => {
        if (editingSubject) {
            setSubjects(subjects.map(subject => subject.id === newSubject.id ? newSubject : subject));
        } else {
            setSubjects([newSubject, ...subjects]);
        }
        setShowAddForm(false);
        setEditingSubject(null);
    };

    const handleToggleAttendance = (subjectId: number) => {
        setSubjects(subjects.map(subject => {
            if (subject.id === subjectId) {
                return { ...subject, attendance: !subject.attendance };
            }
            return subject;
        }));
    };


    const toggleAddForm = () => {
        setShowAddForm(!showAddForm);
    };

    const handleFileInputChange = (subjectId: number, event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                const newImage = e.target?.result;
                setSubjects(subjects.map(subject =>
                    subject.id === subjectId ? {...subject, image: newImage as string} : subject
                ));
            };
            fileReader.readAsDataURL(event.target.files[0]);
        }
    };

    return (
        <>
            <AddSubjectCard addSubject={toggleAddForm}/>
            {showAddForm &&
                <AddSubjectForm
                    ref={addSubjectFormRef}
                    onAddSubject={handleAddSubject}
                    editingSubject={editingSubject}
                />
            }
            {subjects.map(subject => (
                <SubjectCard
                    key={subject.id}
                    subject={subject}
                    onToggleAttendance={handleToggleAttendance}
                    onEdit={handleEditSubject}
                    onImageChange={(event) => handleFileInputChange(subject.id, event)}
                />
            ))}
        </>
    )
}

export { Schedules, };
