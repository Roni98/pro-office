import React, {Fragment,} from "react";
import {subjectImage} from "../../assets/images";
import './SubjectCard.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircle, faRefresh, faExternalLink, faPencil, faSquare, faEllipsisV} from '@fortawesome/free-solid-svg-icons';
import {Subject} from "../../config/interfaces";

const SubjectCard = (
    {
        subject,
        onToggleAttendance,
        onEdit,
    } : {
        subject: Subject,
        onToggleAttendance: (subjectKey: number) => void,
        onEdit: (subject: Subject) => void,
    }) => {

    return (
        <Fragment key={subject.id}>
            <div className={'timePosted'}>
                <FontAwesomeIcon icon={faCircle}/>
                <div className={'timePostedText'}>
                    {subject.startTime} - {subject.endTime}
                </div>
            </div>
            <div className={'subjectCard'}>
                <div className={'section1'}>
                    <div className={'subjectImage'}>
                        <img className={'subjectCoverImage'} alt={'subjectImage'} src={subjectImage}/>
                        <div className='addSubjectImageButton'>
                            <FontAwesomeIcon className='icon' icon={faRefresh}/>
                            <p>Change program cover</p>
                        </div>
                    </div>
                    <div className={'mb-4'}>
                        <div className={`attendance ${subject.attendance ? 'attendanceRoundedTop' : ''}`}>
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    id="toggleButton"
                                    checked={subject.attendance}
                                    onChange={() => onToggleAttendance(subject.id)}
                                />
                                <span className="slider"></span>
                            </label>
                            <div className={'toggleText'}>
                                Required attendance
                            </div>
                        </div>
                        {subject.attendance && (
                            <div className={'externalLink'}>
                                <div className={'externalLinkText'}>
                                    Attendance tracking QR code
                                </div>
                                <FontAwesomeIcon className='icon' icon={faExternalLink}/>
                            </div>
                        )}
                    </div>
                </div>
                <div className={'section2'}>
                    <div className={'subjectTitle'}>
                        <div>
                            <div className={'sectionLabel'}>
                                Subject Title
                            </div>
                            <div className={'subjectName'}>
                                <div className={'activeIcon'}>
                                    <FontAwesomeIcon
                                        width={12}
                                        height={12}
                                        color={'#30A1FF'}
                                        icon={faSquare}
                                    />
                                </div>
                                <div className={'subjectNameText'}>
                                    {subject.name}
                                </div>
                                <div className={'iconEditSubject'} onClick={() => onEdit(subject)}>
                                    <FontAwesomeIcon icon={faPencil}/>
                                </div>
                            </div>
                        </div>
                        <div>
                            <FontAwesomeIcon color={'#90949f'} icon={faEllipsisV}/>
                        </div>
                    </div>
                    <div className={'startEndTime'}>
                        <div className="input-containerTime">
                            <label htmlFor="startTime" className={'sectionLabel'}>Subject start time</label>
                            <div className="icon-input">
                                <FontAwesomeIcon icon={faCircle}/>
                                <input
                                    type="text"
                                    id="startTime"
                                    readOnly={true}
                                    value={subject.startTime}
                                    placeholder="Enter time"
                                />
                            </div>
                        </div>
                        <div className="input-containerTime">
                            <label htmlFor="endTime" className={'sectionLabel'}>Subject end time</label>
                            <div className="icon-input">
                                <FontAwesomeIcon icon={faCircle}/>
                                <input
                                    type="text"
                                    id="endTime"
                                    readOnly={true}
                                    value={subject.endTime}
                                    placeholder="Enter time"
                                />
                            </div>
                        </div>
                    </div>
                    <div className={'subjectDescription'}>
                        <div className="input-container">
                            <label htmlFor="description" className={'sectionLabel'}>Subject description</label>
                            <div className="textAreaInput">
                                <textarea
                                    readOnly={true}
                                    value={subject.description}
                                    className={'w-full p-2'}
                                    rows={5}
                                    id="description"
                                    placeholder="Enter text"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export {SubjectCard,};
