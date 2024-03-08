let cron = require('node-cron');

const {doEdgeToCloudSync} = require('./syncE2CEnrolments');
const {doCloudToEdgeSync} = require('./syncC2EEnrolments');
const {doCoursesSync} = require('./syncAllCourses');
const {checkAPIGatewayAvailability} = require('./jobUtils');

const CRON_EXPRESSIONS = {
    EVERY_MIN: '* * * * *'
};

exports.start = () => {
    startEnrollmentSyncJob();
    startAllCoursesSyncJob();
}

function startAllCoursesSyncJob() {
    const job = cron.schedule(CRON_EXPRESSIONS.EVERY_MIN, async () => {
        console.log('CRON JOB: Executing allCoursesSyncJob');
        let isAPIAvailable = await checkAPIGatewayAvailability();
        console.log(`CRON JOB: API gateway available: ${isAPIAvailable}`);
        if(isAPIAvailable) {
            console.log('CRON JOB: API gateway is available. Doing the allCoursesSyncJob process');
            await doCoursesSync();
        }
    });

    try {
        console.log('CRON JOB: Starting allCoursesSyncJob');
        job.start();
        console.log('CRON JOB: Cron allCoursesSyncJob started successfully');
    } catch (e) {
        console.log(`CRON JOB: ${Date.now()} Unable to start cron allCoursesSyncJob. Error: ${e.message}`);
    }
}

function startEnrollmentSyncJob() {
    const job = cron.schedule(CRON_EXPRESSIONS.EVERY_MIN, async () => {
        console.log('CRON JOB: Executing enrollmentSyncJob');
        let isAPIAvailable = await checkAPIGatewayAvailability();
        console.log(`CRON JOB: API gateway available: ${isAPIAvailable}`);
        if(isAPIAvailable) {
            console.log('CRON JOB: API gateway is available. Doing the enrollmentSyncJob process');
            await doEdgeToCloudSync();
            await doCloudToEdgeSync();
        }
    });

    try {
        console.log('CRON JOB: Starting enrollmentSyncJob');
        job.start();
        console.log('CRON JOB: enrollmentSyncJob started successfully');
    } catch (e) {
        console.log(`CRON JOB: ${Date.now()} Unable to start enrollmentSyncJob. Error: ${e.message}`);
    }
}

