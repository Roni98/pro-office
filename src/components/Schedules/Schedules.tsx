import React, {useState} from "react";
import './Schedules.css';
import {AddSubjectCard} from "../AddSubjectCard";
import {SubjectCard} from "../SubjectCard";
import {Subject} from "../../config/interfaces";
import {AddSubjectForm} from "../AddSubjectForm";

interface TimeSlot {
    type: 'subject' | 'gap';
    subject?: Subject;
    startTime?: string;
    endTime?: string;
}

interface GapSlot {
    type: 'gap';
    startTime: string;
    endTime: string;
}

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

const calculateTimeSlots = (subjects: Subject[]): TimeSlot[] => {
    const dayStart = '07:00';
    const dayEnd = '17:00';
    const sortedSubjects = [...subjects].sort((a, b) => a.startTime.localeCompare(b.startTime));

    const timeSlots: TimeSlot[] = [];
    let lastEndTime = dayStart;

    sortedSubjects.forEach(subject => {
        if (lastEndTime < subject.startTime) {
            timeSlots.push({
                type: 'gap',
                startTime: lastEndTime,
                endTime: subject.startTime
            });
        }
        timeSlots.push({ type: 'subject', subject: subject });
        lastEndTime = subject.endTime;
    });

    if (lastEndTime < dayEnd) {
        timeSlots.push({
            type: 'gap',
            startTime: lastEndTime,
            endTime: dayEnd
        });
    }

    return timeSlots;
};

const Schedules = () => {
    const [subjects, setSubjects] = useState<Subject[]>(mockSubjects);
    const [showAddForm, setShowAddForm] = useState(false);

    const handleToggleAttendance = (subjectId: number) => {
        setSubjects(subjects.map(subject => {
            if (subject.id === subjectId) {
                return { ...subject, attendance: !subject.attendance };
            }
            return subject;
        }));
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

    const handleTextChange = (subjectId: number, field: string, value: string) => {
        setSubjects(subjects.map(subject => {
            if (subject.id === subjectId) {
                return { ...subject, [field]: value };
            }
            return subject;
        }));
    };

    const [selectedGap, setSelectedGap] = useState<GapSlot | null>(null);

    const timeSlots = calculateTimeSlots(subjects);

    const handleAddSubjectInSlot = (newSubject: Subject) => {
        const updatedSubjects = [...subjects, newSubject].sort((a, b) => a.startTime.localeCompare(b.startTime));
        setSubjects(updatedSubjects);
        setShowAddForm(false);
        setSelectedGap(null);
    };

    const handleSelectGap = (gap: GapSlot) => {
        setShowAddForm(true);
        setSelectedGap(gap);
    };

    return (
        <>
            {timeSlots.map((slot) => {
                if (slot.type === 'subject' && slot.subject) {
                    const subject = slot.subject;

                    return (
                        <SubjectCard
                            key={subject.id}
                            subject={subject}
                            onToggleAttendance={handleToggleAttendance}
                            onImageChange={(event) => handleFileInputChange(subject.id, event)}
                            onTextChange={(field, value) => handleTextChange(subject.id, field, value)}
                        />
                    );
                } else {
                    const isGapSelected = selectedGap && slot.startTime === selectedGap.startTime && slot.endTime === selectedGap.endTime;

                    return (
                        <div key={`gap-${slot.startTime}-${slot.endTime}`}>
                            {isGapSelected && showAddForm ? (
                                <AddSubjectForm
                                    onAddSubject={handleAddSubjectInSlot}
                                    defaultStartTime={slot.startTime}
                                    defaultEndTime={slot.endTime}
                                />
                            ) : (
                                <AddSubjectCard
                                    addSubject={() => handleSelectGap(slot as GapSlot)}
                                    startTime={slot.startTime}
                                    endTime={slot.endTime}
                                />
                            )}
                        </div>
                    );
                }
            })}
        </>
    );

}

export { Schedules, };
