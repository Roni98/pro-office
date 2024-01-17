import React, {useState} from "react";
import {subjectImage} from "../../assets/images";
import './AddSubjectForm.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faCircle,
    faRefresh,
    faExternalLink,
    faFloppyDisk,
    faSquare,
    faEllipsisV
} from '@fortawesome/free-solid-svg-icons';
import {Subject} from "../../config/interfaces";

const AddSubjectForm = ({onAddSubject,}: { onAddSubject: (newSubject: Subject) => void; }) => {
    const [subjectTitle, setSubjectTitle] = useState<string>("");
    const [startTime, setStartTime] = useState<string>("");
    const [endTime, setEndTime] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [isToggled, setIsToggled] = useState<boolean>(false);

    const handleToggle = () => {
        setIsToggled(!isToggled);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newSubject: Subject = {
            id: Math.random(),
            name: subjectTitle,
            startTime,
            endTime,
            description,
        };
        onAddSubject(newSubject);
    };


    return (
        <form onSubmit={handleSubmit}>
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
                        <div className={`attendance ${isToggled ? 'attendanceRoundedTop' : ''}`}>
                            <label className="switch">
                                <input type="checkbox" id="toggleButton" onChange={handleToggle}/>
                                <span className="slider"></span>
                            </label>
                            <div className={'toggleText'}>
                                Required attendance
                            </div>
                        </div>
                        {isToggled && (
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
                                    <FontAwesomeIcon width={12} height={12} color={'#30A1FF'} icon={faSquare}/>
                                </div>
                                <div className={'subjectNameText'}>
                                    <div className="input-container">
                                        <div className="textAreaInput">
                                            <input type={'text'} value={subjectTitle}
                                                   onChange={(e) => setSubjectTitle(e.target.value)}
                                                   className={'w-full p-2'} id="myInput" placeholder="Enter title"/>
                                        </div>
                                    </div>
                                </div>
                                <button type={'submit'} className={'iconAddSubject'}>
                                    <FontAwesomeIcon icon={faFloppyDisk}/>
                                </button>
                            </div>
                        </div>
                        <div>
                            <FontAwesomeIcon color={'#90949f'} icon={faEllipsisV}/>
                        </div>
                    </div>
                    <div className={'startEndTime'}>
                        <div className="input-containerTime">
                            <label htmlFor="myInput" className={'sectionLabel'}>Subject start time</label>
                            <div className="icon-input">
                                <FontAwesomeIcon icon={faCircle}/>
                                <input type="text" id="myInput" value={startTime}
                                       onChange={(e) => setStartTime(e.target.value)} placeholder="Enter time"/>
                            </div>
                        </div>
                        <div className="input-containerTime">
                            <label htmlFor="myInput" className={'sectionLabel'}>Subject end time</label>
                            <div className="icon-input">
                                <FontAwesomeIcon icon={faCircle}/>
                                <input type="text" id="myInput" value={endTime}
                                       onChange={(e) => setEndTime(e.target.value)} placeholder="Enter time"/>
                            </div>
                        </div>
                    </div>
                    <div className={'subjectDescription'}>
                        <div className="input-container">
                            <label htmlFor="myInput" className={'sectionLabel'}>Subject description</label>
                            <div className="textAreaInput">
                                <textarea value={description}
                                          onChange={(e) => setDescription(e.target.value)} className={'w-full p-2'}
                                          rows={5} id="myInput" placeholder="Enter text"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>

    )
}

export {AddSubjectForm,};
