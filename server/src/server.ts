import express = require('express');
import { MongoHelper } from './mongoHelper';
import cors = require('cors');
import { isNullOrUndefined, isUndefined } from 'util';

const app: express.Application = express();
app.use(cors());
var courseInfo: any;

app.get('/class', (req, res) => {
    let code: string | undefined = req.query.code;
    let limit : number | undefined = parseInt(req.query.limit,10);
    let college: string | Array<string> | undefined = req.query.college;
    let department : string | Array<string> | undefined = req.query.department;
    let credits: Array<number> = Array.isArray(req.query.credits) ? req.query.credits.map( (item : string) => {return parseInt(item,10)}) : [parseInt(req.query.credits,10)];
    let creditsMin: number | undefined = isUndefined(req.query.creditsmin) ? undefined : Number(req.query.creditsmin);
    let level : Array<number> = Array.isArray(req.query.level) ? req.query.level.map( (item : string) => {return parseInt(item,10)}) : [parseInt(req.query.level,10)];
    let levelMin : number | undefined = isUndefined(req.query.levelmin) ? undefined : Number(req.query.levelmin);
    let hub : string | Array<string> | undefined = req.query.hub;

    if (!isUndefined(code)) {
        courseInfo.findOne({Code: code})
            .then((doc: any) => {
                if (!doc) {
                    throw new Error("Couldn't find this class");
                }
                res.send(doc);
            })
    }
    else {
        let filters : Array<any> = [];

        /* Handle college parameter */
        if(!isUndefined(college)) {
            let filter : any = {};
            if (typeof(college) == 'string') {
                filter = {College : college};
            }
            else {
                filter = {College : {$in : college}};
            }
            filters.push(filter);
        }

        /* Handle department parameter */
        if(!isUndefined(department)) {
            let filter : any = {};
            if (typeof(department) == 'string') {
                filter = {Department : department};
            }
            else {
                filter = {Department : {$in : department}};
            }
            filters.push(filter);
        }


        /* Handle BU Hub requirement parameter */
        if(!isUndefined(hub)) {
             if (typeof(hub) == 'string') {
                let filter : any = {};
                filter = {HubList : hub};
                filters.push(filter);
             }
             else {
                hub.forEach(element => {
                    console.log(element);
                    filters.push({ HubList : element});
                });
             }
        }

        /* Handle credits parameter */
        if (!isNaN(credits[0]) && !isUndefined(creditsMin)) {
            filters.push({$or : [{Credits : {$in : credits}}, {Credits: {$gte : creditsMin}}]});
        }
        else if (!isNaN(credits[0])) {
            filters.push({Credits : {$in: credits}});
        }
        else if (!isUndefined(creditsMin)) {
            filters.push({Credits: {$gte : creditsMin}});
        }

        /* Handle class level parameter */
        if (!isNaN(level[0]) || !isUndefined(levelMin)) {
            let conditions : Array<any> = [];

            if (!isNaN(level[0])) {
                level.forEach(level => {
                    conditions.push({Level: {$gte : level, $lt : level + 100}});
                });
            }

            if (!isUndefined(levelMin)) {
                conditions.push({Level: {$gte : levelMin}});
            }
            filters.push({$or : conditions});
        }        

        /* Join the filters and run query */
        
        let innerFind : any = filters.length == 0 ? {} : {$and: filters};

        if (!isUndefined(limit)) {
            courseInfo.find(innerFind).sort({Code: 1}).limit(limit).toArray( (err: any, result: any) => {
                if (err)
                    throw err;
                res.send(result);
            });
        }
        else {
            courseInfo.find(innerFind).sort({Code: 1}).toArray( (err: any, result: any) => {
                if (err)
                    throw err;
                res.send(result);
            });
        }
        
    }
});

app.listen(3000, async () => {
    console.log('example app listening on port 3000!');
    try {
        let connection: any = await MongoHelper.connect();
        courseInfo = connection.db('bucourses_db').collection('course_info');
        console.log('connection successful :)');
    } catch(err) {
        console.error('whoops!', err);
    }
});