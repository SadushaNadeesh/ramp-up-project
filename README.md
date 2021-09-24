Title: Develop a system with following features to auto mobile club and deploy on dockers.  

Tools : Services- NodeJS (Using NestJS) [GraphQL, Bull Job, Socketcluster]  
		Frontend- Angular 11  
		
Guide line:  
	1) Import data from exel sheet and csv files using bullJS batch job. Bellow fields should show and age_of_vehicle should calculate automatically based on manufactured_date during import.
	   id, first_name, last_name, email, car_make,car_model,vin,manufactued_date, age_of_vehicle  
	2) Implement update and delete functionalities for above records.  
	3) Implement to list all members,ascending order to manufacture date with server side pagination of 100 record at a time.  
	4) Implement search feature to search from model with wild card enabled. (M* should return Mitsubishi and MDM both)  
	5) Data should be read through graphQL and system need to implement with microservices architecture. Use postgresql and postgraphile.  
	6) Implement batch process feature to export data to csv based on given criteria based on age of the car. Eg: Export all cars over 5 years old. This should be batch job and UI need to get real time notification after batch job and UI need to get real time notification after batch complete.
	   Notification should slide from top of UI and disappear automatically after 10 secs. If user has multiple notification those will stack and disappear 10 secs from each appearance.
	   Note: Implement notification with web socket.(UI need to listen to a websocket server)  
	7) Deploy UI, service, database and batch job in seperate containers.  