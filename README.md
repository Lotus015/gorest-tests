# GoRest API Tests

The test suite aims to cover both the negative and positive scenarios for GET, POST, PUT, PATCH and DELETE methods on the /users endpoint. 
The postman collection can be run with newman. 
Same tests are also automated using pactum.js. 

For pactum.js tests, data templates can be found in the data/dataTemplates.json file. 
These are json objects prepared earlier for testing purposes, they can be changed if you want to adapt the testing scenarios. 
Test spec files can be found in test.js file. 

**How to run**

1. Install Docker https://docs.docker.com/get-docker/
2. If you want to run the Postman collection via newman, run

```
docker run -t postman/newman_ubuntu1404 run "https://raw.githubusercontent.com/Lotus015/gorest-tests/b31b76a2d1d0fc36291736b42587ac063302e756/GoRest%20Collection.postman_collection.json"
```

If you want to run the pactum.js tests: 

1. Clone the repository
2. Navigate to project file and run

```
docker build -t gorest-tests . 

docker run gorest-tests
```
