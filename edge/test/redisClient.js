const Redis = require("ioredis");
const REDIS_HOST = "0.0.0.0";
const REDIS_PORT= 6379;

const message = {
    userId: '111',
    details: JSON.stringify({message: 'test message 113'})
};

(async () => {
    const conn = new Redis(REDIS_PORT, REDIS_HOST);
    conn.publish(message.userId, JSON.stringify(message));
    conn.quit()
})();