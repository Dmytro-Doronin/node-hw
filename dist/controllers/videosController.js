"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVideoController = exports.putVideoByIdController = exports.getVideoByIdController = exports.addVideoController = exports.getAllVideosController = exports.removeAllDataController = exports.db = void 0;
// import {db} from "../db/db";
const resolutionsToCheck = ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"];
const { v4: uuidv4 } = require('uuid');
exports.db = [];
//delete all
const removeAllDataController = (req, res) => {
    exports.db = [];
    return res.status(204).json(exports.db);
};
exports.removeAllDataController = removeAllDataController;
//get
const getAllVideosController = (req, res) => {
    return res.status(200).json(exports.db);
};
exports.getAllVideosController = getAllVideosController;
//post
//1 type of the params, 2)type of the response body, 3) type of the request body, 4) uri query params
const addVideoController = (req, res) => {
    let { title, author, availableResolutions } = req.body;
    let errorObj = {
        errorsMessages: []
    };
    if (!title || title.trim().length < 1 || title.trim().length > 40) {
        errorObj.errorsMessages.push({ message: "Title is required", field: "title" });
    }
    if (!author || author.trim().length < 1 || author.trim().length > 20) {
        errorObj.errorsMessages.push({ message: "Author is required", field: "author" });
    }
    if (Array.isArray(availableResolutions)) {
        availableResolutions.map(p => {
            !resolutionsToCheck.includes(p) && errorObj.errorsMessages.push({
                message: "At least one resolution should be available",
                field: "availableResolutions"
            });
        });
    }
    else {
        availableResolutions = [];
    }
    if (errorObj.errorsMessages.length) {
        res.status(400).send(errorObj);
        return;
    }
    const currentDate = new Date();
    const tomorrowDate = new Date(currentDate);
    tomorrowDate.setDate(currentDate.getDate() + 1);
    const isoStringWithAddedDay = tomorrowDate.toISOString();
    const NewVideo = {
        id: (+new Date() * 1000),
        title,
        canBeDownloaded: false,
        author,
        minAgeRestriction: null,
        createdAt: currentDate.toISOString(),
        publicationDate: isoStringWithAddedDay,
        availableResolutions
    };
    exports.db.push(NewVideo);
    const addedVideo = exports.db.find(item => item.id === NewVideo.id);
    return res.status(201).json(addedVideo);
};
exports.addVideoController = addVideoController;
const getVideoByIdController = (req, res) => {
    const currentVideo = exports.db.find(item => item.id === +req.params.id);
    if (!currentVideo) {
        res.sendStatus(404);
        return;
    }
    return res.status(200).send(currentVideo);
};
exports.getVideoByIdController = getVideoByIdController;
const putVideoByIdController = (req, res) => {
    const id = +req.params.id;
    const currentVideoIndex = exports.db.findIndex(v => v.id === id);
    let currentVideo = exports.db.find(item => item.id === id);
    if (!currentVideo) {
        res.sendStatus(404);
        return;
    }
    let { title, author, availableResolutions, canBeDownloaded, minAgeRestriction, publicationDate } = req.body;
    let errorObj2 = {
        errorsMessages: []
    };
    if (!title || title.trim().length < 1 || title.trim().length > 40) {
        errorObj2.errorsMessages.push({ message: "Title is required", field: "title" });
    }
    if (!author || author.trim().length < 1 || author.trim().length > 20) {
        errorObj2.errorsMessages.push({ message: "Author is required", field: "author" });
    }
    if (Array.isArray(availableResolutions)) {
        availableResolutions.map(p => {
            if (!resolutionsToCheck.includes(p)) {
                errorObj2.errorsMessages.push({
                    message: "At least one resolution should be available",
                    field: "availableResolutions"
                });
            }
        });
    }
    else {
        availableResolutions = [];
    }
    if (typeof minAgeRestriction !== 'undefined' || true) {
        minAgeRestriction > 18 || minAgeRestriction < 1 && errorObj2.errorsMessages.push({ message: "Not currentAgeRestriction range", field: "currentAgeRestriction" });
    }
    else {
        minAgeRestriction = null;
    }
    if (typeof canBeDownloaded !== 'boolean' || typeof canBeDownloaded === 'undefined') {
        errorObj2.errorsMessages.push({ message: "Not correct canBeDownloaded", field: "canBeDownloaded" });
    }
    if (!publicationDate) {
        errorObj2.errorsMessages.push({ message: "Not publicationDate", field: "publicationDate" });
    }
    if (errorObj2.errorsMessages.length > 0) {
        res.status(400).send(errorObj2);
        return;
    }
    // || currentTitle.trim().length > 40
    // || !currentAuthor || currentAuthor.length > 20
    // || currentResolution.length < 1
    // || currentAgeRestriction > 18 || currentAgeRestriction < 1
    // || !currentPublicationDate
    // const currentVideoIndex = db.findIndex(v => v.id === id)
    // let currentVideo = db.find(item => item.id === +req.params.id)
    //
    // if (!currentVideo) {
    //     res.sendStatus(404)
    //     return
    // }
    const updatedCurrentVideo = Object.assign(Object.assign({}, currentVideo), { title: title, author: author, minAgeRestriction: minAgeRestriction, publicationDate: publicationDate, canBeDownloaded: canBeDownloaded, availableResolutions: availableResolutions ? availableResolutions : currentVideo.availableResolutions });
    exports.db.splice(currentVideoIndex, 1, updatedCurrentVideo);
    res.sendStatus(204);
    return;
};
exports.putVideoByIdController = putVideoByIdController;
const deleteVideoController = (req, res) => {
    const id = +req.params.id;
    const indexCurrentVideo = exports.db.findIndex(v => v.id === id);
    const currentVideo = exports.db.find(item => item.id === id);
    if (!currentVideo) {
        res.sendStatus(404);
        return;
    }
    exports.db.splice(indexCurrentVideo, 1);
    return res.sendStatus(204);
};
exports.deleteVideoController = deleteVideoController;
