import { default as Network, NetworkRequest, futureRequest } from "./Network";
import { Contact } from "./Contact";
import { default as RemoteBotInstall } from "./RemoteBotInstall";
import { DeviceLocation } from "./DeviceLocation";
import { Messages } from "./Messages";
import AgentGuard from "./AgentGuard";
import BotState from "./BotState";
import ConversationContext from "./ConversationContext";
import { DeviceStorage } from "./DeviceStorage";
import {
	MessageTypeConstants,
	MessageTypeConstantsToInt,
	ButtonStyle,
	Message,
} from "./Message";
import { Auth, AUTH_PROVIDERS } from "./Auth";
import { Stripe } from "./Stripe";
import sha1 from "sha1";
import axios from "axios";

// let AgentGuard = require("./AgentGuard");
let Utils = require("./Utils");
let Moment = require("moment");
let MomentTimezone = require("moment-timezone");
let Immutable = require("immutable");
let R = require("ramda");

const version = "1.0"; // Keeps getting bumped if new capabilities are added (after release 1)

export default {
	AUTH_PROVIDERS,
	AgentGuard: new AgentGuard(),
	Auth: new Auth(),
	BotState: new BotState(),
	ButtonStyle,
	Contact: new Contact(),
	ConversationContext: new ConversationContext(),
	DeviceLocation: new DeviceLocation(),
	DeviceStorage: new DeviceStorage(),
	futureRequest,
	Immutable,
	Message,
	Messages: new Messages(),
	MessageTypeConstants,
	MessageTypeConstantsToInt,
	Moment,
	MomentTimezone,
	Network,
	NetworkRequest,
	R,
	RemoteBotInstall: new RemoteBotInstall(),
	Stripe: new Stripe(),
	Utils,
	version,
	sha1,
	Promise,
	axios,
};

// todo yet to be implemented
//     Settings,
//     PollingStrategyTypes,
//     DeviceLocation,
//     Notification,
//     Media,
//     Resource,
//     ResourceTypes,
//     Channel
