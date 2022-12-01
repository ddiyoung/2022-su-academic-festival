from konlpy.tag import Okt


def keywordrank(keyword: str):
    okt = Okt()
    return okt.nouns(keyword)
