import React, {useState} from "react";
import {programCover} from "../../assets";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faRefresh, faPencil, faEllipsisH, faCaretDown} from '@fortawesome/free-solid-svg-icons';
import './Program.css';
import {Schedules, Overview} from "../../components";

const Program = () => {
    const options = ['Upcoming', 'Some Event'];
    const [selectedOption, setSelectedOption] = useState(options[0]);
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionClick = (option: string) => {
        setSelectedOption(option);
        setIsOpen(false);
    };
    const [activeTab, setActiveTab] = useState<string>('Schedule');

    const handleTabClick = (tab: string) => {
        if(tab !== 'Analytics') {
            setActiveTab(tab);
        }
    };

    const [coverImage, setCoverImage] = useState(programCover);

    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const fileReader = new FileReader();

            fileReader.onload = (e) => {
                e.target && setCoverImage(e.target.result as string);
            };

            fileReader.readAsDataURL(event.target.files[0]);
        }
    };

    const handleAddImageClick = () => {
        const fileInput = document.getElementById('fileInput') as HTMLInputElement;
        if (fileInput) {
            fileInput.click();
        }
    };


    return (
        <div className={'programScreen'}>
            <div className='imageContainer'>
                <img className='coverImage' src={coverImage} alt='Program Cover' />
                <div className='addImageButton' onClick={handleAddImageClick}>
                    <FontAwesomeIcon className='icon' icon={faRefresh} />
                    <p>Change program cover</p>
                </div>
                <input
                    type='file'
                    id='fileInput'
                    style={{ display: 'none' }}
                    onChange={handleFileInputChange}
                    accept='image/*'
                />
            </div>
            <div className={'mainSection'}>
                <div className={'header'}>
                    <div className={'headerLeft'}>
                        <div className={'sectionLabel'}>
                            Program Title
                        </div>
                        <div className={'programName'}>
                            <div className={'programNameText'}>
                                Some subject title
                            </div>
                            <div className={'iconEdit'}>
                                <FontAwesomeIcon icon={faPencil}/>
                            </div>
                        </div>
                    </div>
                    <div className={'headerRight'}>
                        <div className={'statusText'}>
                            Status
                        </div>
                        <div className={'dropdownWithIcons'}>
                            <div>
                                <FontAwesomeIcon color={'#175FFF'} icon={faEllipsisH}/>
                            </div>
                            <div className="dropdown">
                                <button className="dropdownButton" onClick={toggleDropdown}>
                                    {selectedOption}
                                </button>
                                {isOpen && (
                                    <ul className="dropdownMenu">
                                        {options.map((option, index) => (
                                            <li key={index} onClick={() => handleOptionClick(option)}>
                                                {option}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faCaretDown}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tabBar">
                    <div
                        className={`tab ${activeTab === 'Analytics' ? 'active' : ''} ${'Tab 1' === 'Tab 1' ? 'disabled' : ''}`}
                        onClick={() => handleTabClick('Analytics')}
                    >
                        Analytics
                    </div>
                    <div
                        className={`tab ${activeTab === 'Overview' ? 'active' : ''}`}
                        onClick={() => handleTabClick('Overview')}
                    >
                        Overview
                    </div>
                    <div
                        className={`tab ${activeTab === 'Schedule' ? 'active' : ''}`}
                        onClick={() => handleTabClick('Schedule')}
                    >
                        Schedule
                    </div>
                </div>
                {
                    activeTab === 'Schedule' ? (
                        <Schedules/>
                    ) : ( <Overview/> )
                }
            </div>
        </div>
    );
}

export {Program,};
