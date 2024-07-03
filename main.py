import os
import requests
from dotenv import load_dotenv
from flask import Flask, jsonify, render_template
from flask_cors import CORS

app = Flask('app')
CORS(app)
load_dotenv()

BLOCKFROST_API_URL = "https://cardano-mainnet.blockfrost.io/api/v0/addresses/"
BLOCKFROST_PROJECT_ID = os.environ["BLOCKFROST_PROJECT_ID"]
COINGECKO_API_URL = os.environ["COINGECKO_API_URL"]
ADA_WALLET_ADDRESS = os.environ["ADA_WALLET_ADDRESS"]

@app.route('/')
def index():
  return render_template('index.html')
@app.route("/prices")
def get_prices():
  try:
    params = {
        "ids": "cardano,muesliswap-milk",
        "vs_currencies": "usd",
    }
    response = requests.get(COINGECKO_API_URL, params=params)
    response.raise_for_status()  # This will raise an exception for HTTP errors
    return jsonify(response.json())
  except requests.RequestException as e:
    return jsonify(error=str(e)), 500

@app.route("/wallet")
def get_wallet_info():
  try:
    header = {"project_id": BLOCKFROST_PROJECT_ID}
    response = requests.get(f"{BLOCKFROST_API_URL}{ADA_WALLET_ADDRESS}",
                            headers=header)
    response.raise_for_status()  
    return jsonify(response.json())
  except requests.RequestException as e:
    return jsonify(error=str(e)), 500

if __name__ == "__main__":
  app.run(host='0.0.0.0', port=8080)
