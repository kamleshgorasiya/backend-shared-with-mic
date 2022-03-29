# backend-shared-with-mic

clone the repo
cd to the root of project
npm install
make sure that database configuration is same as given in the dev.config.ts

Now cd to the src/plugins/shares/scripts and execute following command
	npx ts-node populate-share-price.ts
	npx ts-node populate-shares.ts

Now go to the http://localhost:3001/admin/login
then products
Add new product by adding following properties
	Total share benefit : 15
	Select brand stock : select any one stock as brand stock (This fields relates with Share entity and currently not being handled correctly)
	Brand-share percentage: 50
	My-share percentage :	50

Now create the zone and tax rate and assign it to the default channel
then
Add the product and see if it is being saved in the "product" database table
now try to edit the same product, "Select brand stock" field should be prefilled with same selected brandstock which is not.
