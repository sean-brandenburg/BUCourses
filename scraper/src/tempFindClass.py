import fileIO
import scraper
from pymongo import MongoClient
import os


if __name__ == "__main__":
    username = os.environ['MONGODBUSERNAME']
    password = os.environ['MONGODBPASSWORD']

    client = MongoClient("mongodb+srv://" + username + ":" + password +
                         "@courses-fv3mh.mongodb.net/test?"
                         "retryWrites=true&w=majority")

    db = client.get_database("bucourses_db")
    courseInfo = db.course_info

    # classNames = fileIO.readClassNames('classnames.txt')
    # classCodes = list(map(fileIO.parseClassNames, classNames))

    # for i, classCode in enumerate(classCodes):
    #     print(classCode)
    #     print(i)
        
    #     classInfo = scraper.getClassDetails(classCode)
    #     courseInfo.update_one({"Code": classCode},
    #                           {"$set": classInfo},
    #                           upsert=True)
    print('here')
    print(courseInfo.find_one({'Code': "eng-ec-311"}))

    client.close()
