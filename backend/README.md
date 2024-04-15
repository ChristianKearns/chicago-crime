**** Setting up the DB connection ****
Creating env variables for the UF_DB_PASSWORD, UF_DB_USERNAME did not entirely work for me. 
I had to also had to create system variables for the UF_DB_USERNAME and UF_DB_PASSWORD.


**** Setting up Models ****
The models are used to defined SQL tables relating to the csv_files.
In order for grantaccess.js file, used to grant privileges to everyone, all tables are to be created first.
Or you can delete the lines of the tables that are not created yet.//DO not push deleted lines to the repo.
In order to use a table thats been created by a different user but granted you access, 
You have to use the following command : "FROM <username>.<table_name>"

**** Unknown bugs with models****
The db connection is created and works. However, the models are not being created. It used to work 2 days ago, nothing has changed and stopped working.
Although may work with your system, I am not sure why it is not working with mine.
Even with the bug, the files are NOT USELESS copy the SQL statement bewteen the "CREATE TABLE" and the ";" and run it in oracle  console from either oracle developer or oracle console from intellij.

**** Setting up the insert script ****
The insert script is used to insert data into the tables created in the models.Must change the file path.



**** Chuerta Filled tables ****
Crimes table is filled with data from the year 2023,2022,2021,2020,2019.
Shotspotter table is entirely filled.
Event Permit table is entirely filled.
Street Light table is entirely filled. 

**** Christian.Kearns Filled tables ****
Economics table is entirely filled.
PopulationData table is entirely filled.

Thus, other members do not have to run the insert script for these tables as they are already filled.
except for the crime table, we can run the insert script for addtional years. 








