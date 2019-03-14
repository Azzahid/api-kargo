# api-kargo

##To Do List
- Initialize project
- Configure database
- Initialiaze server
- Make schema definition of the data and sanitation of the data
- Make function for getting and inserting data to database
- Make function for validating data for bid model
- Make route for each api
- Make sorting function
- Making dummy data for test
- Making test for each route in the api


##Retrospective
###is the solution already the best, if not what can be optimize ?
- the solution that is created still have many flaws. in the API there is no authentication for the security purpose and there is still many things that can be improved at the sort algorithm. my implementation of quick sort can cause a memory leak, because i create many arrays recursively, i think it can be improved if i just stick to one array and play with the variable instead to sort the array. 

###can your algorithm handle 10000, 100000, or 1 million job ?
- according to what i know quick sort is the fastest algorithm to handle sorting, so i think it can.But in my implementation the consumption of the memory will be expensive because i create a new array every time i create a recursive function.

###what is comparison between implementing sorting at the database and your implementation ?
- the pros of the database is that the code is robust and you don't need to especially divide the data when the data is bigger than ram. the cons of using the database is you need to completely understand the database and optimize the query to make the sorting becoming much more efficient, and also because database is outside of the system you can't change the code if you need to customize some of the function.
