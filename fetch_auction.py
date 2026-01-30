import os,requests
from config import API_KEY
from pprint import pprint   # pretty print 추가  


"""
https://api.neople.co.kr/df/auction-sold?itemName=<itemName>&wordType=<wordType>&wordShort=<wordShort>&limit=<limit>&apikey=<내키>
"""

# 1. url 설정
url = "https://api.neople.co.kr/df/auction-sold"

params={
    "itemName" : "레어 소울 결정",
    "wordType" : "match",
    "apikey" : API_KEY
}

response = requests.get(url,params=params)

pprint(response.json())