from bs4 import BeautifulSoup
import sys
import os
CURRENTDIR = os.path.dirname(os.path.abspath(__file__))
PARENTDIR = os.path.dirname(CURRENTDIR)
SRCDIR = os.path.join(PARENTDIR, 'src')
sys.path.insert(0, SRCDIR)
import scraper # noqa


# Assert that getSoup returns BeautifulSoup object
def testGetSoup():
    url = "https://www.bu.edu/academics/eng/courses"
    result = scraper.getSoup(url)
    assert isinstance(result, BeautifulSoup), "Result is not a BeautifulSoup" \
        "object"


# Assert that getNumPages returns correct number of pages. When writing this
# test the url has 22 pages but it could change in the future so I'm checking
# if it's 20 or more
def testGetNumPages():
    url = "https://www.bu.edu/academics/eng/courses"
    minPages = 20
    numPages = scraper.getNumPages(url)
    print(numPages)
    assert numPages >= minPages, "Does not have more than 20 pages"


# Test to see if the first class is BE 209. If the page changes this test
# will need to be changed. I think it's a fair assumption that the first
# class will be BE 209 for a while though.
def testGetClassInfoFromPage():
    url = "https://www.bu.edu/academics/eng/courses"
    classes = scraper.getClassInfoFromPage(url)
    className = "ENG BE 209: Principles of Molecular Cell Biology and " \
        "Biotechnology"
    assert classes[0] == className, "The class name does not match"


if __name__ == "__main__":
    testGetSoup()
    testGetNumPages()
    testGetClassInfoFromPage()
