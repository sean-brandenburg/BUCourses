"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongo = __importStar(require("mongodb"));
var MongoHelper = /** @class */ (function () {
    function MongoHelper() {
    }
    MongoHelper.connect = function () {
        var uri = "mongodb+srv://" + this.USER + ":" + this.PASSWORD + "@courses-fv3mh.mongodb.net/test?retryWrites=true&w=majority";
        return new Promise(function (resolve, reject) {
            mongo.MongoClient.connect(uri, { useNewUrlParser: true }, function (err, client) {
                if (err) {
                    console.log("something went wrong");
                    reject(err);
                }
                else {
                    console.log("successful connection");
                    MongoHelper.client = client;
                    resolve(client);
                }
            });
        });
    };
    MongoHelper.prototype.disconnect = function () {
        MongoHelper.client.close();
    };
    MongoHelper.USER = process.env.MONGODBUSERNAME;
    MongoHelper.PASSWORD = process.env.MONGODBPASSWORD;
    return MongoHelper;
}());
exports.MongoHelper = MongoHelper;
