<h1 align="center">MVoucher Profit Tracker</h1>
<h2 align="center"><img src="./static/images/logo.png" style="display: block; margin: 0 auto;"></h2>


## Description and Usage
MVoucher Profit Tracker is a Python (Flask) powered web dashboard that calculates the profit margin when excercising an [$MVOUCHER](https://cardanoscan.io/token/a2936e00439913f1ac105c29883c013322360247c409343028b831be4d564f5543484552) call option into a [$MILK](https://cardanoscan.io/token/afbe91c0b44b3040e360057bf8354ead8c49c4979ae6ab7c4fbdc9eb4d494c4b7632) token within the Cardano blockchain. 

## System Requirements
You will need the following services to utilize MVoucher Profit Tracker:

### Blockfrost Account
A Blockfrost API key is required to retrieve data from the CARDANO blockain. and can be obtained after registration via the following link:
 - https://blockfrost.dev/overview/getting-started

### Coingecko API
MVoucher Profit Tracker uses the (free) public Coingecko API for aggregate price info. 
- https://www.coingecko.com/en/api/pricing

## Dependencies
To install the necessary dependencies, you can use the included `requirements.txt` file:

```sh
pip install -r requirements.txt
```

```sh
Flask==2.1.1
Flask-Cors==3.0.10
python-dotenv==0.20.0
requests==2.27.1
```

## Instructions

1. Clone repo:
https://github.com/brandontownes/MVoucher-Profit-Tracker

2. Replace environment variables in '.env_template' with the above required API keys (made need to enable 'view hidden files' first)

3. Save new file as '.env' 

```bash
BLOCKFROST_PROJECT_ID=[BLOCKFROST_PROJECT_ID]
ADA_WALLET_ADDRESS=[ADA_WALLET_ADDRESS] # must contain at least 1 MVOUCHER token
```