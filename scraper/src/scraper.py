import requests
from bs4 import BeautifulSoup
from functools import reduce


def getSoup(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")
    return soup


def getNumPages(url):
    soup = getSoup(url)
    numPagesDiv = soup.find("div", {"class": "pagination"})
    if numPagesDiv is None:
        return 1
    else:
        return int(numPagesDiv.find_all("span")[-1].find("a").contents[0])


def getClassInfoFromPage(url):
    soup = getSoup(url)
    
    classes = []
    courseFeedDiv = soup.find("ul", {"class": "course-feed"})
    if courseFeedDiv == None:
        courseFeedDiv = soup.find("div", {"class": "course-feed"})

    if courseFeedDiv == None:
        courseFeedDiv = soup.find("div", {"class": "content-panel"})

    if courseFeedDiv.name == "div" and courseFeedDiv.get("class") == ["content-panel"]:
        for h3 in courseFeedDiv.find_all('h3', recursive=False):
            if len(h3.contents) == 0:
                continue
            elif len(h3.contents) > 1:
                classes.append([h3.contents[0]])
            else:
                classes.append(h3.contents)

    elif courseFeedDiv.name == "div":
        for div in courseFeedDiv.find_all('div', {"class" : "cf-course"}, recurive=False):
            code = div.find("p", {"class": "meta"}).contents[0]
            code = code.split(' (')[0]
            name = div.find("h4").contents[0]
            combinedString = code + ': ' + name
            classes.append([combinedString])
    else:
        for li in courseFeedDiv.find_all('li', recursive=False):
            name = li.find('a').find('strong')
            classes.append(name.contents)

    if len(classes) == 0:
        return classes

    classes = reduce(lambda x, y: x + y, classes)
    classes = list(map(lambda x: x.rstrip('\n'), classes))
    return classes


'''
Helper Functions to find Course Details
'''


def findClassName(soup):
    containerDiv = soup.find('div', {'class': 'breadcrumbs-wrapper'}).parent
    className = containerDiv.find('h1', recrusive=False).contents[0]

    return className


def findDescription(courseContentDiv):
    descriptionBox = courseContentDiv.find('p', recursive=False).contents
    description = descriptionBox[0] if len(descriptionBox) != 0 else ''

    return description


def findHubList(courseContentDiv):
    hubUl = courseContentDiv.find('ul', {"class": "cf-hub-offerings"})
    hubList = []
    if hubUl is not None:
        for li in hubUl.find_all('li', recursive=False):
            hubList.append(li.contents[0])

    return hubList


def findCreditsPrereqs(courseContentDiv):
    infoBoxDiv = courseContentDiv.find("div", {"id": "info-box"})
    infoBoxItems = infoBoxDiv.find_all('dd')

    credits = infoBoxItems[0].contents[0]

    if len(infoBoxItems) > 1:
        prerequisites = infoBoxItems[1].contents[0]
    else:
        prerequisites = ''

    return (credits, prerequisites)


def findCourseSections(courseContentDiv):
    NUMCOLUMNS = 5
    columns = ['Section', 'Instructor', 'Location', 'Schedule', 'Notes']
    sections = []

    courseSchedulesDiv = courseContentDiv.find('div', {'class': 'cf-course'})
    semesterHeaders = courseSchedulesDiv.find_all('strong')
    sectionTables = courseSchedulesDiv.find_all('table')

    for indexTable, table in enumerate(sectionTables):
        sectionDictionary = {}
        sectionDictionary['Semester'] = semesterHeaders[indexTable].contents[0]

        sectionInfo = table.find_all('td')
        for indexInfo, info in enumerate(sectionInfo):
            if indexInfo > (NUMCOLUMNS - 1) and indexInfo % NUMCOLUMNS == 0:
                sections.append(sectionDictionary.copy())

            columnHeader = columns[indexInfo % NUMCOLUMNS]
            if len(info.contents) != 0:
                if len(info.contents) == 1:
                    sectionDictionary[columnHeader] = info.contents[0].strip()
                else:
                    combinedString = reduce(lambda x, y: x +
                                            (y if isinstance(y, str) else ' '),
                                            info.contents)
                    sectionDictionary[columnHeader] = combinedString.strip()
            else:
                sectionDictionary[columnHeader] = ''

        sections.append(sectionDictionary)

    return sections


def getDepartmentList(soup):
    courseFilterDiv = soup.find("div", {'class': 'course-filter'})
    liList = courseFilterDiv.find("ul").find("li").find_all("li")
    departmentList = []
    for li in liList:
        a = li.find("a")
        departmentTuple = (a.contents[0], a['href'])

        if departmentTuple[0] != 'All Departments':
            departmentList.append(departmentTuple)

    return departmentList


def getClassDetails(code):
    urlFront = 'https://www.bu.edu/academics/'
    urlBack = '/courses/'
    college = urlCollege = code.split('-')[0]
    level = int(code.split('-')[2])
    if urlCollege == 'qst':
        urlCollege = 'questrom'
    elif urlCollege == 'med':
        urlCollege = 'busm'
    elif urlCollege == 'sed':
        urlCollege = 'wheelock'
    url = urlFront + urlCollege + urlBack + code
    soup = getSoup(url)
    courseContentDiv = soup.find("div", {"id": "course-content"})

    mapCollege = {
        'khc': 'Kilachand Honors College',
        'cas': 'Arts and Sciences',
        'com': 'Communication',
        'eng': 'Engineering',
        'cfa': 'Fine Arts',
        'cgs': 'General Studies',
        'sar': 'Sargeant',
        'gms': 'Graduate Medical Sciences',
        'grs': 'Graduate Arts and Sciences',
        'sdm': 'Dental Medicine',
        'met': 'Metropolitan College',
        'qst': 'Questrom',
        'sha': 'Hospitality Administration',
        'law': 'Law',
        'med': 'Medicine',
        'sph': 'Public Health',
        'ssw': 'Social Work',
        'sth': 'Theology',
        'sed': 'Wheelock'
    }

    college = mapCollege[college]

    className = findClassName(soup)
    description = findDescription(courseContentDiv)
    hubList = findHubList(courseContentDiv)
    credits, prerequisites = findCreditsPrereqs(courseContentDiv)
    credits = "Var" if credits == "Var" else float(credits)
    sections = findCourseSections(courseContentDiv)

    courseDictionary = {'Code': code,
                        'ClassName': className,
                        'College': college,
                        'Level': level,
                        'Description': description,
                        'HubList': hubList,
                        'Credits': credits,
                        'Prerequisites': prerequisites,
                        'Sections': sections}

    return courseDictionary
