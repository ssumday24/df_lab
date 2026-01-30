# FLASK 서버
from flask import Flask , jsonify
import requests
from config import Api_key # config.py 가져오기 
from flask_cors import CORS  #리액트와 통신

from auction_sold import get_item_price_average


app= Flask(__name__)
CORS(app) # 리액트(3000) - Flask(5000) 포트연결

@app.route('/api/prices/<item_name>')
def get_any_item_price(item_name):
    
    # 평균가격 데이터 가져오기
    result = get_item_price_average(item_name)

    # 딕셔너리 -> JSON (텍스트 문자열)화
    return jsonify(result)


if __name__ == '__main__' :
    # 디버그 모드로 실행
    app.run(host='0.0.0.0',port = 5000 , debug = True)