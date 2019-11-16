import scraper
import fileIO
from functools import reduce

if __name__ == "__main__":
    colleges = ['khc', 'cas', 'com', 'eng', 'cfa', 'cgs', 'sar', 'gms', 'grs',
                'sdm', 'met', 'questrom', 'sha', 'law', 'busm', 'sph', 'ssw',
                'sth', 'wheelock']
    numPages = []
    classListByCollege = []

    urlFront = 'https://www.bu.edu/academics/'
    urlBack = '/courses/'

    for college in colleges:
        print("Getting page number for " + college)
        numPages.append(scraper.getNumPages(urlFront + college + urlBack))

    for i, college in enumerate(colleges):
        print("Getting classes for " + college)
        url = urlFront + college + urlBack
        classes = []
        for pageNumber in range(1, numPages[i] + 1):
            name = scraper.getClassInfoFromPage(url + str(pageNumber))
            classes.append(name)
        classes = reduce(lambda x, y: x + y, classes)
        classListByCollege.append(classes)

    classList = reduce(lambda x, y: x + y, classListByCollege)

    print('Writing classes to file...')
    fileIO.writeClassNames('classNames.txt', classList)
    print('done')
