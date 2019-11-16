from scraper import getSoup
import json

if __name__ == '__main__':
    url = 'https://www.bu.edu/academics/bulletin/abbreviations-and-symbols/'
    soup = getSoup(url)
    dls = soup.find_all('dl',{'class':'tabular'})

    departmentMap = {}

    cas1code = dls[4].find_all('dt')
    cas1code = cas1code[0:len(cas1code)-1]
    cas1string = dls[4].find_all('dd')
    cas1string = cas1string[0:len(cas1string)-1]

    departmentMap["CAS"] = {}

    for i in range(0,len(cas1code)):
        code = cas1code[i].contents[0]
        string = cas1string[i].contents[0]
        departmentMap["CAS"][code] = string

    cas2code = dls[5].find_all('dt')
    cas2string = dls[5].find_all('dd')

    for i in range(0,len(cas2code)):
        code = cas2code[i].contents[0]
        string = cas2string[i].contents[0].replace('\xa0',' ')
        departmentMap["CAS"][code] = string

    colleges = ['CFA','CGS','COM','ENG','GMS','LAW','MET','OTP','PDP','QST','SAR','SDM','SED','SHA','SPH','SSW','STH']
    for college in colleges:
        departmentMap[college] = {}

    for i in range(6,23):
        current = dls[i]
        codes = current.find_all('dt')
        strings = current.find_all('dd')

        for j in range(0,len(codes)):
            code = codes[j].contents[0]
            string = strings[j].contents[0]
            departmentMap[colleges[i-6]][code] = string
    
    casCodes3 = ['MA','ME','MR','MS','MU','NE','NG','NS','PH','PO','PS','PY','QU','RN','RO','SO','SP','SS','SY','WR','WS','XL']
    casStrings3 = ['Mathematics & Statistics','Middle East & North Africa Studies','Marine Science','Medical Science','Music','Neuroscience','Nigerien Studies (International Programs only)','Natural Sciences','Philosophy','Political Science','Psychological & Brain Sciences','Physics','Spanish Studies (Quito only)','Religion','Romance Studies','Sociology','Special Programs','Social Sciences','Senior-Year Development','Writing','Women’s, Gender, & Sexuality Studies','Comparative Literature']

    for i in range(0, len(casCodes3)):
        departmentMap["CAS"][casCodes3[i]] = casStrings3[i]

    with open('../../departments.json','w') as fp:
        json.dump(departmentMap,fp)