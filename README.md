
#
```javascript
git clone https://github.com/rao123dk/live-currency.git
cd live-currency

```
# Web API for a campaigns

## To run campaigns API run below command

```javascript
cd api
npm i
npm start

```
Server started on port: 8088

http://localhost:8088/campaigns?sortBy=totalAmount&&sortOrder=desc

http://localhost:8088/activeCampaigns

http://localhost:8088/closedCampaigns


# React web app

```javascript
cd ui
npm i
npm start

```



# NOTE:
When I was trying to hit API with custom  base
like http://api.exchangeratesapi.io/v1/latest?access_key=7982969fe5cbd35b9951eba27f13350e&format=1&symbols=USD&base=INR
so it was throwing error
```javacript
{
  "error": {
    "code": "base_currency_access_restricted",
    "message": "An unexpected error ocurred. [Technical Support: support@apilayer.com]"
  }
}
```
This API is taking base as `base : "EUR"` by default. So Please consider my change. I was taking default price in INR another option EUR instead of USD


# See UI on
http://localhost:3000