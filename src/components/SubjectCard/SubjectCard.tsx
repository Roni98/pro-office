import React, {Fragment, useEffect, useRef, useState,} from "react";
import {subjectImage} from "../../assets/images";
import './SubjectCard.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faCircle,
    faRefresh,
    faExternalLink,
    faPencil,
    faSquare,
    faEllipsisV,
} from '@fortawesome/free-solid-svg-icons';
import {Subject} from "../../config/interfaces";

const SubjectCard = (
    {
        subject,
        onToggleAttendance,
        onImageChange,
        onTextChange,
    } : {
        subject: Subject,
        onToggleAttendance: (subjectKey: number) => void,
        onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
        onTextChange: (field: string, value: string) => void,
    }) => {

    const fileInputRef = useRef<HTMLInputElement>(null);
    const titleInputRef = useRef<HTMLInputElement>(null);
    const [editTitle, setEditTitle,] = useState(false);

    useEffect(() => {
        if (editTitle) {
            titleInputRef.current?.focus();
        }
    }, [editTitle]);

    const handleAddImageClick = () => {
        fileInputRef.current?.click();
    };

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
                        <img className={'subjectCoverImage'} alt={'subjectImage'} src={subject.image || subjectImage}/>
                        <div className='addSubjectImageButton' onClick={handleAddImageClick}>
                            <FontAwesomeIcon className='icon' icon={faRefresh}/>
                            <p>Change subject image</p>
                        </div>
                        <input
                            type='file'
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={onImageChange}
                            accept='image/*'
                        />
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
                            {
                                editTitle ? (
                                    <>
                                        <div className="icon-input">
                                            <input
                                                ref={titleInputRef}
                                                value={subject.name}
                                                type={'text'}
                                                onChange={(e) => onTextChange('name', e.target.value)}
                                                onBlur={() => setEditTitle(false)}
                                            />
                                        </div>
                                    </>
                                ) : (
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
                                        <div className={'iconEditSubject'} onClick={() => setEditTitle(true)}>
                                            <FontAwesomeIcon icon={faPencil}/>
                                        </div>
                                    </div>
                                )
                            }
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
                                    onChange={(e) => onTextChange('startTime', e.target.value)}
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
                                    onChange={(e) => onTextChange('endTime', e.target.value)}
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
                                    onChange={(e) => onTextChange('description', e.target.value)}
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
