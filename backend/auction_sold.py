import requests
from config import API_KEY
from pprint import pprint   # pretty print 추가  

# auction-sold 
"""
https://api.neople.co.kr/df/auction-sold?itemName=<itemName>&wordType=<wordType>&wordShort=<wordShort>&limit=<limit>&apikey=<내키>
"""

# 1. url 설정
url = "https://api.neople.co.kr/df/auction-sold"

params={
    "itemName" : "레어 소울 결정",
    "wordType" : "match",
    "apikey" : API_KEY,
    "limit" : 50  # row 수  
}

response = requests.get(url,params=params)
rjson = response.json()
rows = rjson.get('rows',[])

# 1. 가격 데이터 추출 
prices=[]
if rows :
    for row in rows:
        prices.append(row['unitPrice'])

else:
    print("최근 거래 데이터가 없습니다.")


# 2. 평균 계산
if len(prices) >0:
    average = sum(prices) / len(prices)

    # 천단위 콤마, 소수점은 출력X
    result_msg = f"최근 {len(prices)}건 평균가 : {average:,.0f} 골드"
else:
    result_msg = "조회된 데이터가 없습니다."

print(result_msg)