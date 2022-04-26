import React, { useState } from 'react';
import { ReactDOM } from 'react-dom';
import ReactSelect, { components } from "react-select";
import Select from 'react-select';
import { EmailJSResponseStatus, send, sendForm } from 'emailjs-com';
import axios from 'axios';
import './Form.css';
import { useNavigate } from 'react-router-dom';


function Form() {
    const [lecturerName, setLecturerName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [moduleName, setModuleName] = React.useState('');
    const [moduleCode, setModuleCode] = React.useState('');
    const [teachingMethod, setTeachingMethod] = React.useState('');
    const [onlineHours, setOnlineHours] = React.useState('');
    const [inPersonHours, setInPersonHours] = React.useState('');
    const [lectureDays, setLectureDays] = React.useState(''); //total days of lectures
    const [lectureHours, setLectureHours] = React.useState('');
    const [numberOfStudents, setNumberOfStudents] = React.useState('');
    const [devicesUsed, setDevicesUsed] = React.useState();
    const [heating, setHeating] = React.useState('');
    const [lighting, setLighting] = React.useState('');
    const [naturalLighting, setNaturalLighting] = React.useState('');
    const [papers, setPapers] = React.useState('');
    const [totalPaper, setTotalPaper] = React.useState('');

    const teachingOptions = [
        { value: 'Face-to-Face', label: 'Face-to-Face' },
        { value: 'Fully Online', label: 'Fully Online' },
        { value: 'Hybrid/Blended', label: 'Hybrid/Blended' }
    ];

    const devicesOptions = [
        { value: 'None', label: 'None' },
        { value: 'Computer', label: 'Computer' },
        { value: 'Laptop', label: 'Laptop' },
        { value: 'Tablet', label: 'Tablet/Ipad' },
        { value: 'Projector', label: 'Projector' },
        { value: 'Visuliser', label: 'Visuliser' }
    ];

    const sendEmail = async (e) => {
        console.log('Sending email...');
        e.preventDefault();
        send(
            'service_qxh5tqa',
            'template_2de1bbb',
            {
                lecturerName,
                email,
                moduleName,
                moduleCode,
                teachingMethod,
                onlineHours,
                inPersonHours,
                lectureDays,
                lectureHours,
                numberOfStudents,
                devicesUsed: JSON.stringify(devicesUsed),
                heating,
                lighting,
                naturalLighting,
                papers,
                totalPaper
            },
            'SD9CuKiYcgFemZb20'
        );
    }

    let navigate = useNavigate();

    const handelSubmit = async (e) => {
        e.preventDefault();
        sendEmail(e);

        //data is the values we sent from the backend
        //wait for data to be received from the backend
        const { data } = await axios.post('http://localhost:4000/form',
            {
                lecturerName,
                email,
                moduleName,
                moduleCode,
                teachingMethod,
                onlineHours,
                inPersonHours,
                lectureDays,
                lectureHours,
                numberOfStudents,
                devicesUsed,
                heating,
                lighting,
                naturalLighting,
                papers,
                totalPaper
            })
        console.log(data)

        //navigate to the feedback page and send the data as state
        navigate('/feedback', { state: data })

    }

    return (
        <>
            <div className="body">
                <header>
                    <h1>Carbon Footprint Estimation Tool</h1>
                    <p>Please fill in the form below to see how much carbon footprint is released weekly by your current
                        teaching method compared to an alternative teaching methods.</p>
                </header><form className="form" onSubmit={handelSubmit}>
                    <h3><b>Lecturer Information</b></h3>

                    <label>Lecturer Name:
                        <br></br>
                        <input
                            type="text"
                            name="lecturerName"
                            id='lecturerName'
                            value={lecturerName}
                            onChange={(e) => setLecturerName(e.target.value)} />
                    </label>

                    <br></br>

                    <label>Lecturer Email (Required):
                        <br></br>
                        <input
                            required
                            type="text"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                    </label>

                    <h3><b>Module Information</b></h3>

                    <label>Module Name:
                        <br></br>
                        <input
                            type="text"
                            name="moduleName"
                            value={moduleName}
                            onChange={(e) => setModuleName(e.target.value)} />
                    </label>

                    <br></br>

                    <label>Module Code:
                        <br></br>
                        <input
                            type="text"
                            name="moduleCode"
                            value={moduleCode}
                            onChange={(e) => setModuleCode(e.target.value)} />
                    </label>

                    <br></br>

                    <label>Current Teaching Method (Required):
                        <br></br>
                        <Select
                            required
                            type="text"
                            isMulti={false}
                            options={teachingOptions}
                            name="teachingMethod"
                            placeholder="Select a teaching method"
                            value={teachingMethod}
                            onChange={(e) => setTeachingMethod(e.value)} />
                    </label>
                    {teachingMethod === 'Hybrid/Blended'
                        ?
                        <>
                            <div>
                                <label className="selectedMethod">Selected Teaching Method (Required): {teachingMethod}</label>
                            </div>
                            <br></br>
                            <div>
                                <label>Online Hours (Required):
                                    <br></br>
                                    <input
                                        type="number"
                                        name="onlineHours"
                                        value={onlineHours}
                                        onChange={(e) => setOnlineHours(e.target.value)} />
                                </label>

                                <br></br>

                                <label>In-Person Hours (Required):
                                    <br></br>
                                    <input
                                        type="number"
                                        name="inPersonHours"
                                        value={inPersonHours}
                                        onChange={(e) => setInPersonHours(e.target.value)} />
                                </label>

                                <br></br>

                                <label>How many days of in-person lectures are there? (Required)
                                    <br></br>
                                    <input
                                        type="number"
                                        name="lectureDays"
                                        value={lectureDays}
                                        onChange={(e) => setLectureDays(e.target.value)} />
                                </label>

                            </div>
                        </>
                        : <>
                            <div>
                                <label className="selectedMethod">Selected Teaching Method: {teachingMethod}</label>
                            </div>
                            <br></br></>
                    }
                    {teachingMethod === 'Face-to-Face'
                        ?
                        <>
                            <div>
                                <label>How many days of in-person lectures are there? (Required)
                                    <br></br>
                                    <input
                                        type="number"
                                        name="lectureDays"
                                        value={lectureDays}
                                        onChange={(e) => setLectureDays(e.target.value)} />
                                </label>
                            </div>
                        </>
                        : <></>}

                    <label>Total Lecture Hours (Required):
                        <br></br>
                        <input
                            required
                            type="number"
                            name="lectureHours"
                            value={lectureHours}
                            onChange={(e) => setLectureHours(e.target.value)} />
                    </label>

                    <br></br>

                    <div>
                        <h3><b>Further Information</b></h3>
                        {teachingMethod === 'Hybrid/Blended' || teachingMethod === 'Face-to-Face'
                            ?
                            <>
                                <label>Number of Students (Required):
                                    <br></br>
                                    <input
                                        required
                                        type="number"
                                        name="numberOfStudents"
                                        value={numberOfStudents}
                                        onChange={(e) => setNumberOfStudents(e.target.value)} />
                                </label>
                                <br></br>

                                <label>Devices Used (Required):
                                    <br></br>
                                    <Select
                                        type="text"
                                        isMulti={true}
                                        options={devicesOptions}
                                        name="devicesUsed"
                                        placeholder="Select devices used"
                                        value={devicesUsed}
                                        onChange={(newValue) => setDevicesUsed(newValue)} />
                                </label>

                                <h4>Do you use heating/ac system in the lecture? (Required)</h4>
                                <label className='yes_no'>Yes
                                    <input
                                        type="checkbox"
                                        name="heating"
                                        checked={heating === 'Yes'}
                                        value="Yes"
                                        onChange={(e) => setHeating(e.target.value)} />
                                </label>
                                <label className='yes_no'>No
                                    <input
                                        type="checkbox"
                                        name="heating"
                                        checked={heating === 'No'}
                                        value="No"
                                        onChange={(e) => setHeating(e.target.value)} />
                                </label>

                                <h4>Do you use the lights in the lecture? (Required)</h4>
                                <label className='yes_no'>Yes
                                    <input
                                        type="checkbox"
                                        name="lighting"
                                        checked={lighting === 'Yes'}
                                        value="Yes"
                                        onChange={(e) => setLighting(e.target.value)} />
                                </label>
                                <label className='yes_no'>No
                                    <input
                                        type="checkbox"
                                        name="lighting"
                                        checked={lighting === 'No'}
                                        value="No"
                                        onChange={(e) => setLighting(e.target.value)} />
                                </label>
                                {lighting === 'Yes'
                                    ?
                                    <>
                                        <h4>Do you get natural light in your lecture room?</h4>
                                        <label className='yes_no'>Yes
                                            <input
                                                type="checkbox"
                                                name="naturalLighting"
                                                value="Yes"
                                                checked={naturalLighting === 'Yes'}
                                                onChange={(e) => setNaturalLighting(e.target.value)} />
                                        </label>
                                        <label className='yes_no'>No
                                            <input
                                                type="checkbox"
                                                name="naturalLighting"
                                                value="No"
                                                checked={naturalLighting === 'No'}
                                                onChange={(e) => setNaturalLighting(e.target.value)} />
                                        </label>
                                    </>
                                    : null}

                                <h4>Do you use paper in your lecture? (Required)</h4>
                                <div >
                                    <label className='yes_no'>Yes
                                        <input
                                            type="checkbox"
                                            name="papers"
                                            value="Yes"
                                            checked={papers === 'Yes'}
                                            radioGroup="papers"
                                            onChange={(e) => setPapers(e.target.value)} />
                                    </label>
                                    <label className='yes_no'>No
                                        <input
                                            type="checkbox"
                                            name="papers"
                                            value="No"
                                            checked={papers === 'No'}
                                            radioGroup="papers"
                                            onChange={(e) => setPapers(e.target.value)} />
                                    </label>
                                </div>
                                {papers === 'Yes'
                                    ?
                                    <><br></br><label>Total Number of Papers Used (Required):
                                        <br></br>
                                        <input
                                            type="number"
                                            name="totalPaper"
                                            value={totalPaper}
                                            onChange={(e) => setTotalPaper(e.target.value)} />
                                    </label></>
                                    : null}
                            </>
                            : <>
                                <label>Number of Students (Required):
                                    <br></br>
                                    <input
                                        required
                                        type="number"
                                        name="numberOfStudents"
                                        value={numberOfStudents}
                                        onChange={(e) => setNumberOfStudents(e.target.value)} />
                                </label>
                                <br></br>
                            </>
                        }
                    </div>

                    <br></br>

                    <button type="submit">Submit</button>
                    <br></br>
                </form>
            </div>
        </>
    );
}
export default Form;