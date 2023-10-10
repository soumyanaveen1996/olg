const FIELDS_TO_UPDATE = ['hasPassed', 'progressPercent', 'score', 'state', 'courseId', 'userId', 'completedModules'];
const COLLECTIONS = {
    CREW: 'crews_olg',
    USER_COURSES: 'userCourses_olg',
    COURSES: 'courses_olg',
    REMOTE_NODES: 'remoteNodes_olg'
};
const DB_STATUS_CODE = {
    SUCCESS: 200,
    ERROR: 500
};

module.exports = {
    FIELDS_TO_UPDATE,
    COLLECTIONS,
    DB_STATUS_CODE
};