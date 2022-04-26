import React from "react";
import { useLocation } from "react-router-dom";
import './Feedback.css'

function Feedback() {

    const { state } = useLocation()

    return (
        <>
            <div className="feedback">

                {
                    state
                        ? <>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Name: {(state.lecturerName)}</th>
                                        <th>Module Name: {(state.moduleName)}</th>
                                        <th>Module Code: {(state.moduleCode)}</th>
                                    </tr>
                                </thead>
                            </table>
                            <h3><b>Thank you very much for using Carbon Footprint Estimating Tool to estimate your weekly carbon footprint.</b></h3>
                            <h2>Your Information:</h2>
                            <h3>Name: {(state.lecturerName)}</h3>
                            <h3>Email: {(state.email)}</h3>
                            <h2>Module Information:</h2>
                            <h3>Module Name: {(state.moduleName)}</h3>
                            <h3>Module Code: {(state.moduleCode)}</h3>
                            <h3>Teaching method: {(state.teachingMethod)}</h3>
                            <h3>Total lecture hours: {(state.lectureHours)}</h3>
                            
                            <h2>Further Information:</h2>
                            <h3>Total number of students: {(state.numberOfStudents)}</h3>
                            <h2>Total Carbon Estimation</h2>
                            <h3> Your current teaching method produces around <b>&nbsp;{(state.faceCarbon) || (state.onlineCarbon) || (state.hyCarbon)}&nbsp; </b> grams of carbon footprint</h3>



                            <h2>Suggestions to lower your emission:</h2>
                            <h3>{(state.onlineSuggest) || (state.faceSuggest) || (state.hySuggest)}</h3>
                            <br></br>
                            <h3><b>We will contact you by email to arrange a meeting to get your feedback.</b></h3>
                           
                        </>
                        : <h2>There is no calculations has been done</h2>
                }
            </div>
        </>
    );
}

export default Feedback;