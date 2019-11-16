import scraper

soup = scraper.getSoup('https://www.bu.edu/academics/cas/courses')
test = scraper.getDepartmentList(soup)

print(test)
