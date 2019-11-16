import scraper

colleges = ['khc', 'cas', 'com', 'eng', 'cfa', 'cgs', 'sar', 'gms', 'grs',
                'sdm', 'met', 'questrom', 'sha', 'law', 'busm', 'sph', 'ssw',
                'sth', 'wheelock']

if __name__ == "__main__":
    for college in colleges:
        url = "https://www.bu.edu/academics/" + college + "/courses"
        soup = scraper.getSoup(url)
        departmentList = scraper.getDepartmentList(soup)
        for deptTuple in departmentList:
            deptName = deptTuple[0]
            deptLink = deptTuple[1]
            classList = scraper.getClassInfoFromPage(deptLink)
            if len(classList) == 0:
                continue
            firstClassString = classList[0]
            deptCode = firstClassString.split(' ')[1]
            deptCode = deptCode.lower()
            print(college + ' ' + deptCode)
            print(deptTuple)
    #url = "https://www.bu.edu/academics/cas/courses/"
    #soup = scraper.getSoup(url)
    #departmentList = scraper.getDepartmentList(soup)

    #departmentTuples = []

    #for deptTuple in departmentList:
    #    deptName = deptTuple[0]
    #    deptLink = deptTuple[1]

    #    classList = scraper.getClassInfoFromPage(deptLink)

    #    if len(classList) == 0:
    #        continue

    #    firstClassString = classList[0]
    #    deptCode = firstClassString.split(' ')[1]

    #    departmentTuples.append((deptCode, deptName))

    #print(departmentTuples)
