"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const timer_service_1 = require("./timer.service");
const timerService = new timer_service_1.TimerSessionService();
const TIMER_STATES = {
    RUNNING: '_RUNNINGTIMER',
    START: '_STARTTIMER',
    STOPPED: '_STOPPEDTIMER',
    HELP: '_HELPMODE' //the user is asking for help
};
exports.handlers = {
    'LaunchRequest': function () {
        this.handler.state = TIMER_STATES.START;
        this.emitWithState('StartTimer', true);
    },
    'AMAZON.StartOverIntent': function () {
        this.handler.state = TIMER_STATES.START;
        this.emitWithState('StartTimer', true);
    },
    'StartTimerIntent': function () {
        return __awaiter(this, void 0, void 0, function* () {
            this.emit(':tell', `Timer started!`);
        });
    },
    'StopTimerIntent': function () {
        this.emit(':tell', 'Timer stopped! You have x time left.');
    },
    'CheckAvailableTimeIntent': function () {
        this.emit(':tell', 'You have x minutes available to play.');
    },
    'AMAZON.CancelIntent': function () {
        this.emit('StopTimerIntent');
    },
    'AMAZON.HelpIntent': function () {
        this.handler.state = TIMER_STATES.HELP;
        this.emitWithState('HelpTheUser', true);
    },
    'AMAZON.StopIntent': function () {
        this.emit('StopTimerIntent');
    },
    'Unhandled': function () {
        this.emit(':ask', 'Sorry, I didn\'t get that. Try saying a start timer or stop timer.', 'Try saying a check available time.');
    }
};
