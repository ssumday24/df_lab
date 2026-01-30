import requests
from config import API_KEY

# auction-sold 
"""
https://api.neople.co.kr/df/auction-sold?itemName=<itemName>&wordType=<wordType>&wordShort=<wordShort>&limit=<limit>&apikey=<내키>
"""

def get_item_price_average(item_name):
        
    # 1. url 설정
    url = "https://api.neople.co.kr/df/auction-sold"

    params={
        "itemName" : "item_name",
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
        
        # 2.평균 계산
        average = sum(prices) / len(prices)

        # 딕셔너리 자료형 반환 
        return{
            "average": round(average),
            "count" : len(prices),
            "status": "success"
        }

    else:
        return{
            "status":"error",
            "message":"최근 거래 데이터가 없습니다."
        }
  