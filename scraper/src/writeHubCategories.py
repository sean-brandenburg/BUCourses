from pymongo import MongoClient
import os
from fileIO import writeClassNames

if __name__ == "__main__":
    username = os.environ['MONGODBUSERNAME']
    password = os.environ['MONGODBPASSWORD']

    client = MongoClient("mongodb+srv://" + username + ":" + password +
                         "@courses-fv3mh.mongodb.net/test?"
                         "retryWrites=true&w=majority")

    db = client.get_database("bucourses_db")
    courseInfo = db.course_info

    allObjects = list(courseInfo.find({},{"HubList": 1, "_id": 0}))
    hubMap = {}

    for singleObject in allObjects:
        for hubItem in singleObject['HubList']:
            if not (hubItem in hubMap.keys()):
                hubMap[hubItem] = True
            
    hubList = list(hubMap.keys())
    hubList.sort()

    writeClassNames("hubCategories.txt",hubList)

    client.close()