import json
import os

TESTSDIR = os.path.dirname(os.path.abspath(__file__))
PARENTDIR = os.path.dirname(TESTSDIR)


def parseClassNames(line):
    classCode = line.split(':')[0]
    classCode = classCode.lower()
    classCode = classCode.replace(' ', '-')
    return classCode


def readClassNames(filename):
    filePath = os.path.join(PARENTDIR, filename)
    f = open(filePath, 'r')
    classCodes = []

    for line in f:
        classCodes.append(parseClassNames(line))

    f.close()

    return classCodes


def writeClassNames(filename, classList):
    filePath = os.path.join(PARENTDIR, filename)
    f = open(filePath, 'x')

    for classString in classList:
        f.write(classString + '\n')

    f.close()


def writeJSONFile(classcode, dictionary):
    filename = classcode + '.json'
    filePath = os.path.join(PARENTDIR, filename)

    with open(filePath, 'w') as outfile:
        json.dump(dictionary, outfile, indent=4)
