const mongoose = require('mongoose');

const formSchema = {
    lecturerName: String,
    email: String,
    moduleName: String,
    moduleCode: String,
    teachingMethod: String,
    lectureHours: Number,
    onlineHours: Number,
    lectureDays: Number,
    inPersonHours: Number,
    numberOfStudents: Number,
    devicesUsed: Object,
    lighting: String,
    heating: String,
    naturalLighting: String,
    papers: String,
    totalPaper: Number
};

const Form = mongoose.model("Form", formSchema);

module.exports = Form;