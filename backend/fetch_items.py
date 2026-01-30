import requests, os 
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("API_KEY")

url = "https://api.neople.co.kr/df/items"

params = {
    'itemName': '레어 소울 결정',
    'wordType': 'match',
    'apikey' : api_key
}

response = requests.get(url,params = params)
data = response.json()

print(data)