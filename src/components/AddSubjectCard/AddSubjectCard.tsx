import React from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import './AddSubjectCard.css';

interface AddSubjectCardProps {
    addSubject: () => void;
    startTime?: string;
    endTime?: string;
}

const AddSubjectCard = ({addSubject, startTime, endTime,} : AddSubjectCardProps) => {

    const calculateGap = () => {
        if (!startTime || !endTime) {
            return '';
        }

        const [startHours, startMinutes] = startTime.split(':').map(Number);
        const [endHours, endMinutes] = endTime.split(':').map(Number);

        const startDate = new Date(0, 0, 0, startHours, startMinutes);
        const endDate = new Date(0, 0, 0, endHours, endMinutes);

        const diff = endDate.getTime() - startDate.getTime(); // Convert dates to timestamps
        const hours = Math.floor(diff / 3600000); // milliseconds to hours
        const minutes = Math.floor((diff % 3600000) / 60000); // remainder to minutes

        return `${hours}:${minutes.toString().padStart(2, '0')} hr gap`;
    };

    return (
        <div className="cardWrapper">
            <div className="addCard">
            <div className="timeSlot">
                <div className="time">
                    {startTime} - {endTime}
                </div>
                <div className="separator"></div>
                <div className="timeGap">
                    {calculateGap()}
                </div>
            </div>
            <div className="mobileSeparator"></div>
            <div className="addButton">
                <FontAwesomeIcon width={10} height={10} icon={faPlus} />
                <div className={'buttonText'} onClick={addSubject}>
                    Add a subject here
                </div>
            </div>
            <div className="spacer"></div>
        </div>
        </div>
    )
}

export { AddSubjectCard, };
