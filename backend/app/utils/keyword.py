from krwordrank.word import KRWordRank

min_count = 1
max_length = 10

beta = 0.85
max_iter = 10


def keywordrank(keyword: str):
    wordrank_extractor = KRWordRank(min_count=min_count, max_length=max_length)
    keywords, rank, graph = wordrank_extractor.extract([keyword], beta, max_iter)
    return keywords.keys()
