# backend-shared-with-mic

# This project is to test and debug the issue

When we tries to creat the product with brand stock(Additiona offer given with product) assigment it is not being ralate on Admin UI


## Steps

Install backend-shared-with-mic with npm

```bash
git cone https://github.com/kamleshgorasiya/backend-shared-with-mic.git
cd backend-shared-with-mic
npm install
  
```

make sure that database configuration is same as given in the dev.config.ts

```bash
cd src/plugins/shares/scripts
npx ts-node populate-share-price.ts
npx ts-node populate-shares.ts
  
```    

Now go to the http://localhost:3001/admin/login create the zone and tax rate and assign it to the default channel
then Add new product by adding following values.

```bash
	Total share benefit : 15
	Select brand stock : select any one stock as brand stock (This fields relates with Share entity and currently not being handled correctly)
	Brand-share percentage: 50
	My-share percentage :	50
```


then save the product and see if it is being saved in the "product" database table
now try to edit the same product, "Select brand stock" field should be prefilled with same selected brandstock at Admin UI which is not.

