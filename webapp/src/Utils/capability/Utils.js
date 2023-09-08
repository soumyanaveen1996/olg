// We are going to make lodash availalbe on the platform for making bot writing easier
const Lodash = require("lodash");
const moment = require("moment");
const ShortUUID = require("short-uuid");

const UUID = function () {
	let uuid = ShortUUID.uuid();
	return ShortUUID().fromUUID(uuid);
};

export { Lodash, UUID, moment };
