import React, {forwardRef, useImperativeHandle, useRef, useState} from "react";
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
import {AddSubject, Subject} from "../../config/interfaces";

interface AddSubjectFormProps {
    onAddSubject: (newSubject: Subject) => void;
    editingSubject?: Subject | null;
}

const AddSubjectForm = forwardRef<{ focusNameInput: () => void }, AddSubjectFormProps>(
    ({ onAddSubject, editingSubject }, ref) => {

    const nameInputRef = useRef<HTMLInputElement>(null);
    const [image, setImage] = useState(editingSubject?.image || undefined);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const triggerFileInputClick = () => {
        fileInputRef.current?.click();
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                setImage(e.target?.result as string); // Update the image state
            };
            fileReader.readAsDataURL(event.target.files[0]);
        }
    };

    useImperativeHandle(ref, () => ({
        focusNameInput: () => {
            nameInputRef.current?.focus();
        },
    }));

    const initialState: AddSubject = editingSubject
        ? { ...editingSubject }
        : {
            name: "",
            startTime: "",
            endTime: "",
            description: "",
            attendance: false,
            image: "",
        };
    const [formState, setFormState] = useState<AddSubject>(initialState);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Convert times to Date objects for comparison
        const startTime = new Date(`1970-01-01T${formState.startTime}`);
        const endTime = new Date(`1970-01-01T${formState.endTime}`);

        if (endTime <= startTime) {
            alert('End time cannot be earlier than start time.');
            return;
        }

        if (editingSubject) {
            // Update existing subject
            onAddSubject({ ...editingSubject, ...formState, image });

        } else {
            const newSubject: Subject = {
                id: Math.random(),
                name: formState.name,
                startTime: formState.startTime,
                endTime: formState.endTime,
                description: formState.description,
                attendance: formState.attendance,
                image: image,
            };
            onAddSubject(newSubject);
        }
    };


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleToggle = () => {
        setFormState(prevState => ({
            ...prevState,
            attendance: !prevState.attendance
        }));
    };


    return (
        <form onSubmit={handleSubmit}>
            <div className={'subjectCard'}>
                <div className={'section1'}>
                    <div className={'subjectImage'} onClick={triggerFileInputClick}>
                        <img className={'subjectCoverImage'} alt={'subjectImage'} src={image || subjectImage}/>
                        <div className='addSubjectImageButton'>
                            <FontAwesomeIcon className='icon' icon={faRefresh}/>
                            <p>Change program cover</p>
                        </div>
                        <input
                            type="file"
                            id="imageUpload"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleImageChange}
                            accept="image/*"
                        />
                    </div>
                    <div className={'mb-4'}>
                        <div className={`attendance ${formState.attendance ? 'attendanceRoundedTop' : ''}`}>
                            <label className="switch">
                                <input
                                    hidden={true}
                                    type="checkbox"
                                    id="attendance"
                                    name="attendance"
                                    checked={formState.attendance}
                                    onChange={handleToggle}
                                />
                                <span className="slider"></span>
                            </label>
                            <div className={'toggleText'}>
                                Required attendance
                            </div>
                        </div>
                        {formState.attendance && (
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
                                    <div className="input-container">
                                        <div className="textAreaInput">
                                            <input
                                                required={true}
                                                type={'text'}
                                                ref={nameInputRef}
                                                value={formState.name}
                                                onChange={handleInputChange}
                                                name="name"
                                                className={'w-full p-2'}
                                                id="name"
                                                placeholder="Enter title"
                                            />
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
                            <label htmlFor="startTime" className={'sectionLabel'}>Subject start time</label>
                            <div className="icon-input">
                                <FontAwesomeIcon icon={faCircle}/>
                                <input
                                    type="time"
                                    required={true}
                                    id="startTime"
                                    name={'startTime'}
                                    value={formState.startTime}
                                    onChange={handleInputChange}
                                    placeholder="Enter time"/>
                            </div>
                        </div>
                        <div className="input-containerTime">
                            <label htmlFor="endTime" className={'sectionLabel'}>Subject end time</label>
                            <div className="icon-input">
                                <FontAwesomeIcon icon={faCircle}/>
                                <input
                                    type="time"
                                    required={true}
                                    id="endTime"
                                    value={formState.endTime}
                                    name="endTime"
                                    onChange={handleInputChange}
                                    placeholder="Enter time"/>
                            </div>
                        </div>
                    </div>
                    <div className={'subjectDescription'}>
                        <div className="input-container">
                            <label htmlFor="description" className={'sectionLabel'}>Subject description</label>
                            <div className="textAreaInput">
                                <textarea
                                    value={formState.description}
                                    onChange={handleInputChange}
                                    className={'w-full p-2'}
                                    rows={5}
                                    name="description"
                                    id="description"
                                    placeholder="Enter description"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
});

export {AddSubjectForm,};
