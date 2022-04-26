const express = require('express');
const router = express.Router();
const Form = require('../models/formModel');

router.route('/form').post(async (req, res) => {
    const {
        lecturerName,
        email,
        moduleName,
        moduleCode,
        teachingMethod,
        lectureHours,
        onlineHours,
        inPersonHours,
        lectureDays,
        numberOfStudents,
        devicesUsed,
        lighting,
        heating,
        naturalLighting,
        papers,
        totalPaper
    } = req.body;

    const newForm = new Form({
        lecturerName,
        email,
        moduleName,
        moduleCode,
        teachingMethod,
        lectureHours,
        onlineHours,
        inPersonHours,
        lectureDays,
        numberOfStudents,
        devicesUsed,
        lighting,
        heating,
        naturalLighting,
        papers,
        totalPaper
    });

    //wait for the form to be saved to mongodb
    await newForm.save()

    // Calculations...
    // Carbon footprint emission values breakdown in grams
    const paperEmission = 4.7;
    const lightingEmission = 213; // assuming the bulbs are led and there are 30 lights in average with 10 watts per bulb
    const heatingEmission = 397;
    const computerEmission = 142;
    const laptopEmission = 35;
    const tabletEmission = 11;
    const projectorEmission = 106;
    const visuliserEmission = 71;
    const travellingEmission = 100; // 100 grams of CO2 is released per student per day
    const totalWasteEmission = 16.3; // 16.3 grams of CO2 is released per student per day for waste disposal and fleet
    const onlineLectureEmission = 115; // devices and other equipment used in online lectures
    const onlineTeachingEmission = 3.7; // servers/virtual meeting rooms used in online teaching

    function faceToFaceCarbon() {
        var travel = 0;
        var lightHeatPaper = 0;
        var waste = 0;
        var comp = 0;
        var lap = 0;
        var tab = 0;
        var proj = 0;
        var vis = 0;
        if (teachingMethod === 'Face-to-Face') {
            travel = (numberOfStudents * travellingEmission * lectureDays);
            lightHeatPaper = (lightingEmission * lectureHours) + (heatingEmission * lectureHours) + (paperEmission * totalPaper);
            waste = numberOfStudents * totalWasteEmission * lectureDays;

            for (var i = 0; i < devicesUsed.length; i++) {
                if (devicesUsed[i].value === 'Computer') {
                    comp = computerEmission * lectureHours;
                } else if (devicesUsed[i].value === 'Laptop') {
                    lap = laptopEmission * lectureHours;
                } else if (devicesUsed[i].value === 'Tablet') {
                    tab = tabletEmission * lectureHours;
                } else if (devicesUsed[i].value === 'Projector') {
                    proj = projectorEmission * lectureHours;
                } else if (devicesUsed[i].value === 'Visuliser') {
                    vis = visuliserEmission * lectureHours;
                } else if (devicesUsed[i].value === 'None') {
                    comp = 0;
                    lap = 0;
                    tab = 0;
                    proj = 0;
                    vis = 0;
                }
            }
        }
        return travel + lightHeatPaper + waste + comp + lap + tab + proj + vis;
    }
    console.log('Face to Face', faceToFaceCarbon());


    function hybridCarbon() {
        var travel = 0;
        var lightHeatPaper = 0;
        var waste = 0;
        var online = 0;
        var onlineTeach = 0;
        var comp = 0;
        var lap = 0;
        var tab = 0;
        var proj = 0;
        var vis = 0;
        if (teachingMethod === 'Hybrid/Blended') {
            travel = (numberOfStudents * travellingEmission * lectureDays);
            lightHeatPaper = (lightingEmission * (lectureHours - onlineHours)) + (heatingEmission * (lectureHours - onlineHours)) + (paperEmission * totalPaper);
            waste = numberOfStudents * totalWasteEmission * lectureDays;
            online = (numberOfStudents * onlineLectureEmission * onlineHours);
            onlineTeach = (numberOfStudents * onlineTeachingEmission * onlineHours);

            for (var i = 0; i < devicesUsed.length; i++) {
                if (devicesUsed[i].value === 'Computer') {
                    comp = computerEmission * lectureHours;
                } else if (devicesUsed[i].value === 'Laptop') {
                    lap = laptopEmission * lectureHours;
                } else if (devicesUsed[i].value === 'Tablet') {
                    tab = tabletEmission * lectureHours;
                } else if (devicesUsed[i].value === 'Projector') {
                    proj = projectorEmission * lectureHours;
                } else if (devicesUsed[i].value === 'Visuliser') {
                    vis = visuliserEmission * lectureHours;
                } else if (devicesUsed[i].value === 'None') {
                    comp = 0;
                    lap = 0;
                    tab = 0;
                    proj = 0;
                    vis = 0;
                }
            }
        }

        return travel + lightHeatPaper + waste + online + onlineTeach + comp + lap + tab + proj + vis;
    }
    console.log('Hybrid', hybridCarbon());


    function fullyOnlineCarbon() {
        var lecture = 0;
        var onlineTeach = 0;
        if (teachingMethod === 'Fully Online') {
            lecture = numberOfStudents * onlineLectureEmission * lectureHours;
            onlineTeach = (numberOfStudents * onlineTeachingEmission * lectureHours);
        }
        return lecture + onlineTeach;
    }
    console.log('Fully Online', fullyOnlineCarbon());


    function onlineSuggestion() {
        var estimateFace = 0;
        var estimateHybrid = 0;
        if (teachingMethod === 'Fully Online') {
            estimateFace = (numberOfStudents * travellingEmission * lectureHours) +
                (lectureHours * lightingEmission) + (lectureHours * heatingEmission) +
                (numberOfStudents * totalWasteEmission * lectureHours) + (lectureHours * computerEmission) +
                (lectureHours * laptopEmission) + (lectureHours * projectorEmission);
            estimateHybrid = (numberOfStudents * travellingEmission * (lectureHours / 2)) +
                ((lectureHours / 2) * lightingEmission) + (lectureHours / 2 * heatingEmission) +
                (numberOfStudents * totalWasteEmission * lectureHours / 2) + (lectureHours / 2 * computerEmission) +
                (lectureHours / 2 * laptopEmission) + (lectureHours / 2 * projectorEmission) +
                (numberOfStudents * onlineTeachingEmission * lectureHours / 2) +
                (numberOfStudents * onlineLectureEmission * lectureHours / 2);
            return 'You are currently using a fully online teaching method. This is the best option for you as it will allow you to use the most of your resources and will reduce the amount of waste and carbon emissions. If you were to switch to Face-to-Face or Hybrid/Blended, your carbon footprint will be increased as follows: Face-to-Face: ' 
            + estimateFace + ' grams and Hybrid/Blended: ' + estimateHybrid + ' grams. We would recommend you to continue with Fully Online teaching method as it has the lowest total carbon footprint.';
        }
    }

    function faceSuggestion() {
        var estimateHybrid = 0;
        var estimateOnline = 0;
        if (teachingMethod === 'Face-to-Face') {
            estimateHybrid = (numberOfStudents * travellingEmission * (lectureHours / 2)) +
                ((lectureHours / 2) * lightingEmission) + (lectureHours / 2 * heatingEmission) +
                (numberOfStudents * totalWasteEmission * lectureHours / 2) +
                (lectureHours / 2 * computerEmission) + (lectureHours / 2 * laptopEmission) +
                (lectureHours / 2 * projectorEmission) + (numberOfStudents * onlineTeachingEmission * lectureHours / 2) +
                (numberOfStudents * onlineLectureEmission * lectureHours / 2);;
            estimateOnline = (numberOfStudents * onlineLectureEmission * lectureHours) +
                (numberOfStudents * onlineTeachingEmission * lectureHours);
            
        }
        var light = 0;
        var rec = '';
        var paper = 0;
        var pepRec = '';
        if (teachingMethod === 'Face-to-Face' && lighting==='Yes' && naturalLighting==='Yes') {
            light = (lectureHours * lightingEmission);
            rec= 'You can lower ' + light + ' grams of carbon footprint from your current teaching method by using natural lighting in your lectures. ';
        }
        if (teachingMethod === 'Face-to-Face' && papers==='Yes') {
            paper = (paperEmission * totalPaper);
            pepRec = 'You can lower ' + paper + ' grams of carbon footprint from your current teaching method by removing the use of papers in your lectures. ';
        }
        return 'You are currently using a Face-to-Face teaching method. ' + rec + pepRec +
                'If you were to switch to Hybrid/Blended or Fully Online, your carbon footprint will decrease as follows: Hybrid/Blended: ' + 
                estimateHybrid + ' grams and Fully Online: ' + estimateOnline + ' grams. We would recommend you to switch to Hybrid/Blended or Fully Online as it will reduce your total carbon footprint.';
    }

    function hybridSuggestion() {
        var estimateFace = 0;
        var estimateOnline = 0;
        if (teachingMethod === 'Hybrid/Blended') {
            estimateFace = (numberOfStudents * travellingEmission * lectureHours) +
                (lectureHours * lightingEmission) + (lectureHours * heatingEmission) +
                (numberOfStudents * totalWasteEmission * lectureHours) +
                (lectureHours * computerEmission) +
                (lectureHours * projectorEmission)
            estimateOnline = (numberOfStudents * onlineLectureEmission * lectureHours) +
                (numberOfStudents * onlineTeachingEmission * lectureHours);
        }
        var light = 0;
        var rec = '';
        var paper = 0;
        var pepRec = '';
        if (teachingMethod === 'Hybrid/Blended' && lighting==='Yes' && naturalLighting==='Yes') {
            light = (onlineHours * lightingEmission);
            rec= 'You can lower ' + light + ' grams of carbon footprint from your current teaching method  by using natural lighting in your lectures. ';
        }
        if (teachingMethod === 'Hybrid/Blended' && papers==='Yes') {
            paper = (paperEmission * totalPaper);
            pepRec = 'You can lower ' + paper + ' grams of carbon footprint from your current teaching method by removing the use of papers in your lectures. ';
        }
        return 'You are currently using a Hybrid/Blended teaching method. ' + rec + pepRec +
        'If you were to switch to Face-to-Face your carbon footprint will increase to: ' + estimateFace + ' grams and if you switch to Fully Online your carbon footprint will decrease to: ' + estimateOnline + ' grams.' +
        + ' We would you to switch to Fully Online as it will reduce your total carbon footprint.';
    }

    
    var faceCarbon = faceToFaceCarbon();
    var hyCarbon = hybridCarbon();
    var onlineCarbon = fullyOnlineCarbon();

    var onlineSuggest = onlineSuggestion();
    var faceSuggest = faceSuggestion();
    var hySuggest = hybridSuggestion();


    //send back data to frotnend as json
    if (teachingMethod === 'Face-to-Face') {
        return res.json({ faceSuggest, faceCarbon, lecturerName, email, moduleName, moduleCode, teachingMethod, lectureDays, lectureHours, numberOfStudents });
    }
    if (teachingMethod === 'Hybrid/Blended') {
        return res.json({ hySuggest, hyCarbon, lecturerName, email, moduleName, moduleCode, teachingMethod, lectureDays, lectureHours, numberOfStudents });
    }
    if (teachingMethod === 'Fully Online') {
        return res.json({ onlineSuggest, onlineCarbon, lecturerName, email, moduleName, moduleCode, teachingMethod, lectureDays, lectureHours, numberOfStudents });
    }

});

module.exports = router;