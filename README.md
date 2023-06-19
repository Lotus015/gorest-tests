# GoRest API Tests

**How to run**

1. Install Docker https://docs.docker.com/get-docker/
2. If you want to run the Postman collection via newman, run

```
docker run -t postman/newman_ubuntu1404 run "https://raw.githubusercontent.com/Lotus015/gorest-tests/b31b76a2d1d0fc36291736b42587ac063302e756/GoRest%20Collection.postman_collection.json"
```

If you want to run the pactum.js tests: 

Clone the repository and run
```
docker build -t gorest-tests . 

docker run gorest-tests
```

The test suite aims to cover both the negative and positive scenarios for GET, POST, PUT, PATCH and DELETE methods on the /users endpoint. 