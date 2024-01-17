import React from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import './AddSubjectCard.css';

const AddSubjectCard = ({addSubject,} : {addSubject: () => void}) => {
    return (
        <div className="cardWrapper">
            <div className="addCard">
            <div className="timeSlot">
                <div className="time">
                    10:30 - 12:00
                </div>
                <div className="separator"></div>
                <div className="timeGap">
                    1:30 hr gap
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
