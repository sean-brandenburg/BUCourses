"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var mongoHelper_1 = require("./mongoHelper");
var cors = require("cors");
var util_1 = require("util");
var app = express();
app.use(cors());
var courseInfo;
app.get('/class', function (req, res) {
    var code = req.query.code;
    var limit = parseInt(req.query.limit, 10);
    var college = req.query.college;
    var department = req.query.department;
    var credits = Array.isArray(req.query.credits) ? req.query.credits.map(function (item) { return parseInt(item, 10); }) : [parseInt(req.query.credits, 10)];
    var creditsMin = util_1.isUndefined(req.query.creditsmin) ? undefined : Number(req.query.creditsmin);
    var level = Array.isArray(req.query.level) ? req.query.level.map(function (item) { return parseInt(item, 10); }) : [parseInt(req.query.level, 10)];
    var levelMin = util_1.isUndefined(req.query.levelmin) ? undefined : Number(req.query.levelmin);
    var hub = req.query.hub;
    if (!util_1.isUndefined(code)) {
        courseInfo.findOne({ Code: code })
            .then(function (doc) {
            if (!doc) {
                throw new Error("Couldn't find this class");
            }
            res.send(doc);
        });
    }
    else {
        var filters_1 = [];
        /* Handle college parameter */
        if (!util_1.isUndefined(college)) {
            var filter = {};
            if (typeof (college) == 'string') {
                filter = { College: college };
            }
            else {
                filter = { College: { $in: college } };
            }
            filters_1.push(filter);
        }
        /* Handle department parameter */
        if (!util_1.isUndefined(department)) {
            var filter = {};
            if (typeof (department) == 'string') {
                filter = { Department: department };
            }
            else {
                filter = { Department: { $in: department } };
            }
            filters_1.push(filter);
        }
        /* Handle BU Hub requirement parameter */
        if (!util_1.isUndefined(hub)) {
            if (typeof (hub) == 'string') {
                var filter = {};
                filter = { HubList: hub };
                filters_1.push(filter);
            }
            else {
                hub.forEach(function (element) {
                    console.log(element);
                    filters_1.push({ HubList: element });
                });
            }
        }
        /* Handle credits parameter */
        if (!isNaN(credits[0]) && !util_1.isUndefined(creditsMin)) {
            filters_1.push({ $or: [{ Credits: { $in: credits } }, { Credits: { $gte: creditsMin } }] });
        }
        else if (!isNaN(credits[0])) {
            filters_1.push({ Credits: { $in: credits } });
        }
        else if (!util_1.isUndefined(creditsMin)) {
            filters_1.push({ Credits: { $gte: creditsMin } });
        }
        /* Handle class level parameter */
        if (!isNaN(level[0]) || !util_1.isUndefined(levelMin)) {
            var conditions_1 = [];
            if (!isNaN(level[0])) {
                level.forEach(function (level) {
                    conditions_1.push({ Level: { $gte: level, $lt: level + 100 } });
                });
            }
            if (!util_1.isUndefined(levelMin)) {
                conditions_1.push({ Level: { $gte: levelMin } });
            }
            filters_1.push({ $or: conditions_1 });
        }
        /* Join the filters and run query */
        var innerFind = filters_1.length == 0 ? {} : { $and: filters_1 };
        if (!util_1.isUndefined(limit)) {
            courseInfo.find(innerFind).sort({ Code: 1 }).limit(limit).toArray(function (err, result) {
                if (err)
                    throw err;
                res.send(result);
            });
        }
        else {
            courseInfo.find(innerFind).sort({ Code: 1 }).toArray(function (err, result) {
                if (err)
                    throw err;
                res.send(result);
            });
        }
    }
});
app.listen(3000, function () { return __awaiter(_this, void 0, void 0, function () {
    var connection, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('example app listening on port 3000!');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, mongoHelper_1.MongoHelper.connect()];
            case 2:
                connection = _a.sent();
                courseInfo = connection.db('bucourses_db').collection('course_info');
                console.log('connection successful :)');
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                console.error('whoops!', err_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
