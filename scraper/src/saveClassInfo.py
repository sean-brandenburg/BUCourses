import fileIO
import scraper
from pymongo import MongoClient
import os
import json

if __name__ == "__main__":
    with open('../../departments.json') as jsonFile:
        departmentMap = json.load(jsonFile)

    username = os.environ['MONGODBUSERNAME']
    password = os.environ['MONGODBPASSWORD']

    client = MongoClient("mongodb+srv://" + username + ":" + password +
                         "@courses-fv3mh.mongodb.net/test?"
                         "retryWrites=true&w=majority")

    db = client.get_database("bucourses_db")
    courseInfo = db.course_info

    classNames = fileIO.readClassNames('classnames.txt')
    classCodes = list(map(fileIO.parseClassNames, classNames))

    for i, classCode in enumerate(classCodes):
        print(classCode)
        print(i)

        splitted = classCode.split('-')
        collegeCode = splitted[0].upper()
        departmentCode = splitted[1].upper()

        if collegeCode in departmentMap.keys() and departmentCode in departmentMap[collegeCode].keys():
            department = departmentMap[collegeCode][departmentCode]
        else:
            department = ""

        classInfo = scraper.getClassDetails(classCode)
        classInfo["Department"] = department
        courseInfo.update_one({"Code": classCode},
                              {"$set": classInfo},
                              upsert=True)

    client.close()
