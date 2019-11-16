import sys
import os
CURRENTDIR = os.path.dirname(os.path.abspath(__file__))
PARENTDIR = os.path.dirname(CURRENTDIR)
SRCDIR = os.path.join(PARENTDIR, 'src')
sys.path.insert(0, SRCDIR)
import fileIO # noqa


def testParseClassNames():
    line = "ENG EC 330: Applied Algorithms for Engineers"
    expected = "eng-ec-330"
    parsed = fileIO.parseClassNames(line)
    assert parsed == expected, "Class name couldn't be parsed"


def testReadClassNames():
    classCodes = fileIO.readClassNames('classNames.txt')
    assert len(classCodes) >= 8500, "Class names couldn't be read"


if __name__ == "__main__":
    testParseClassNames()
    testReadClassNames()
