const { spec, request, stash } = require("pactum");

request.setBaseUrl("https://gorest.co.in/public/v2/users");
var token = "fa2436410ecbf5f844b3563887b93a9c8aae99acedf191754599da3bf3c31159";

stash.loadData();

it("GET All Users", async () => {
  await spec().get("/").expectStatus(200);
});

it("GET User by ID - Valid ID", async () => {
  await spec().get("/").withQueryParams("id", "1844").expectStatus(200);
});

it("GET User by ID - Invalid ID", async () => {
  await spec()
    .get("/")
    .withQueryParams("id", "s")
    .expectStatus(200)
    .expectJsonLike([]);
});

it("GET User by ID - Valid Email", async () => {
  await spec()
    .get("/")
    .withQueryParams("id", "adhiraj_kaniyar@wisoky-walter.example")
    .expectStatus(200);
});

it("GET User by ID - Invalid Email", async () => {
  await spec()
    .get("/")
    .withQueryParams("id", "]]")
    .expectStatus(200)
    .expectJsonLike([]);
});

it("POST Unauthorized", async () => {
  await spec()
    .post("/")
    .expectStatus(401)
    .expectJsonLike({ message: "Authentication failed" });
});

it("POST Create User - Email Empty", async () => {
  await spec()
    .post("/")
    .withHeaders("Authorization", `Bearer ${token}`)
    .withJson({
      "@DATA:TEMPLATE@": "emptyEmail",
    })
    .expectStatus(422)
    .expectJsonLike([
      {
        field: "email",
        message: "can't be blank",
      },
    ]);
});

it("POST Create User - Status Empty", async () => {
  await spec()
    .post("/")
    .withHeaders("Authorization", `Bearer ${token}`)
    .withJson({
      "@DATA:TEMPLATE@": "emptyStatus",
    })
    .expectStatus(422)
    .expectJsonLike([
      {
        field: "status",
        message: "can't be blank",
      },
    ]);
});

it("POST Create User - Name Empty", async () => {
  await spec()
    .post("/")
    .withHeaders("Authorization", `Bearer ${token}`)
    .withJson({
      "@DATA:TEMPLATE@": "emptyName",
    })
    .expectStatus(422)
    .expectJsonLike([
      {
        field: "name",
        message: "can't be blank",
      },
    ]);
});

it("POST Create User - Gender Empty", async () => {
  await spec()
    .post("/")
    .withHeaders("Authorization", `Bearer ${token}`)
    .withJson({
      "@DATA:TEMPLATE@": "emptyGender",
    })
    .expectStatus(422)
    .expectJsonLike([
      {
        field: "gender",
        message: "can't be blank, can be male of female",
      },
    ]);
});

it("POST Create User - Email Invalid", async () => {
  await spec()
    .post("/")
    .withHeaders("Authorization", `Bearer ${token}`)
    .withJson({
      "@DATA:TEMPLATE@": "invalidEmail",
    })
    .expectStatus(422)
    .expectJsonLike([
      {
        field: "email",
        message: "is invalid",
      },
    ]);
});

it("POST Create User - Status Invalid", async () => {
  await spec()
    .post("/")
    .withHeaders("Authorization", `Bearer ${token}`)
    .withJson({
      "@DATA:TEMPLATE@": "invalidStatus",
    })
    .expectStatus(422)
    .expectJsonLike([
      {
        field: "status",
        message: "can't be blank",
      },
    ]);
});

it("POST Create User - Gender Invalid", async () => {
  await spec()
    .post("/")
    .withHeaders("Authorization", `Bearer ${token}`)
    .withJson({
      "@DATA:TEMPLATE@": "invalidGender",
    })
    .expectStatus(422)
    .expectJsonLike([
      {
        field: "gender",
        message: "can't be blank, can be male of female",
      },
    ]);
});

it("POST Create User", async () => {
  await spec()
    .post("/")
    .withHeaders("Authorization", `Bearer ${token}`)
    .withJson({
      "@DATA:TEMPLATE@": "user",
    })
    .expectStatus(201)
    .expectJsonLike(
      {
        email: "test1111.random.email@test.com",
        name: "morpheus",
        gender: "male",
        status: "active",
      },
    )
    .stores('userId', 'id');
});

it("POST Create Multiple Users", async () => {
  await spec()
    .post("/")
    .withHeaders("Authorization", `Bearer ${token}`)
    .withJson({
      "@DATA:TEMPLATE@": "multipleUsers",
    })
    .expectStatus(422)
    .expectJsonLike(
      [
        {
          "field": "email",
          "message": "can't be blank"
        },
        {
          "field": "name",
          "message": "can't be blank"
        },
        {
          "field": "gender",
          "message": "can't be blank, can be male of female"
        },
        {
          "field": "status",
          "message": "can't be blank"
        }
      ],
    );
});

it("PUT Update User - Email Empty", async () => {
  await spec()
    .put("/{id}")
    .withHeaders("Authorization", `Bearer ${token}`)
    .withPathParams('id', '$S{userId}')
    .withJson({
      "@DATA:TEMPLATE@": "emptyEmail",
    })
    .expectStatus(422)
    .expectJsonLike(
      [{
        "field": "email",
        "message": "can't be blank"
    }],
    );
});

it("PUT Update User - Email Invalid", async () => {
  await spec()
    .put("/{id}")
    .withHeaders("Authorization", `Bearer ${token}`)
    .withPathParams('id', '$S{userId}')
    .withJson({
      "@DATA:TEMPLATE@": "invalidEmail",
    })
    .expectStatus(422)
    .expectJsonLike(
      [{
        "field": "email",
        "message": "is invalid"
    }],
    );
});

it("PUT Update User - Email Taken", async () => {
  await spec()
    .put("/{id}")
    .withHeaders("Authorization", `Bearer ${token}`)
    .withPathParams('id', '$S{userId}')
    .withJson({
      "@DATA:TEMPLATE@": "takenEmail",
    })
    .expectStatus(422)
    .expectJsonLike(
      [{
        "field": "email",
        "message": "has already been taken"
    }],
    );
});

it("PUT Update User - Gender Empty", async () => {
  await spec()
    .put("/{id}")
    .withHeaders("Authorization", `Bearer ${token}`)
    .withPathParams('id', '$S{userId}')
    .withJson({
      "@DATA:TEMPLATE@": "emptyGender",
    })
    .expectStatus(422)
    .expectJsonLike(
      [{
        "field": "gender",
        "message": "can't be blank, can be male of female"
    }],
    );
});

it("PUT Update User - Gender Invalid", async () => {
  await spec()
    .put("/{id}")
    .withHeaders("Authorization", `Bearer ${token}`)
    .withPathParams('id', '$S{userId}')
    .withJson({
      "@DATA:TEMPLATE@": "invalidGender",
    })
    .expectStatus(422)
    .expectJsonLike(
      [{
        "field": "gender",
        "message": "can't be blank, can be male of female"
    }],
    );
});

it("PUT Update User - Status Empty", async () => {
  await spec()
    .put("/{id}")
    .withHeaders("Authorization", `Bearer ${token}`)
    .withPathParams('id', '$S{userId}')
    .withJson({
      "@DATA:TEMPLATE@": "emptyStatus",
    })
    .expectStatus(422)
    .expectJsonLike(
      [{
        "field": "status",
        "message": "can't be blank"
    }],
    );
});

it("PUT Update User - Status Invalid", async () => {
  await spec()
    .put("/{id}")
    .withHeaders("Authorization", `Bearer ${token}`)
    .withPathParams('id', '$S{userId}')
    .withJson({
      "@DATA:TEMPLATE@": "invalidStatus",
    })
    .expectStatus(422)
    .expectJsonLike(
      [{
        "field": "status",
        "message": "can't be blank"
    }],
    );
});

it("PUT Update User - Positive Flow", async () => {
  await spec()
    .put("/{id}")
    .withHeaders("Authorization", `Bearer ${token}`)
    .withPathParams('id', '$S{userId}')
    .withJson({
      "@DATA:TEMPLATE@": "user",
    })
    .expectStatus(200)
    .expectJsonLike(
       {
    "name": "morpheus",
    "email": "test1111.random.email@test.com",
    "gender": "male",
    "status": "active"
},
    );
});

it("PATCH Update User - Email Empty", async () => {
  await spec()
    .patch("/{id}")
    .withHeaders("Authorization", `Bearer ${token}`)
    .withQueryParams('email', "")
    .withPathParams('id', '$S{userId}')
    .expectStatus(422)
    .expectJsonLike(
      [{
        "field": "email",
        "message": "can't be blank"
    }],
    );
});

it("PATCH Update User - Email Empty", async () => {
  await spec()
    .patch("/{id}")
    .withHeaders("Authorization", `Bearer ${token}`)
    .withQueryParams('email', "aaa@gmail.com")
    .withPathParams('id', '$S{userId}')
    .expectStatus(422)
    .expectJsonLike(
      [{
        "field": "email",
        "message": "has already been taken"
    }],
    );
});

it("PATCH Update User - Gender Empty", async () => {
  await spec()
    .patch("/{id}")
    .withHeaders("Authorization", `Bearer ${token}`)
    .withQueryParams('gender', "")
    .withPathParams('id', '$S{userId}')
    .expectStatus(422)
    .expectJsonLike(
      [{
        "field": "gender",
        "message": "can't be blank, can be male of female"
    }],
    );
});

it("PATCH Update User - Gender Invalid", async () => {
  await spec()
    .patch("/{id}")
    .withHeaders("Authorization", `Bearer ${token}`)
    .withQueryParams('gender', "non-binary")
    .withPathParams('id', '$S{userId}')
    .expectStatus(422)
    .expectJsonLike(
      [{
        "field": "gender",
        "message": "can't be blank, can be male of female"
    }],
    );
});

it("PATCH Update User - Status Empty", async () => {
  await spec()
    .patch("/{id}")
    .withHeaders("Authorization", `Bearer ${token}`)
    .withQueryParams('status', "")
    .withPathParams('id', '$S{userId}')
    .expectStatus(422)
    .expectJsonLike(
      [{
        "field": "status",
        "message": "can't be blank"
    }],
    );
});

it("PATCH Update User - Status Invalid", async () => {
  await spec()
    .patch("/{id}")
    .withHeaders("Authorization", `Bearer ${token}`)
    .withQueryParams('status', "1")
    .withPathParams('id', '$S{userId}')
    .expectStatus(422)
    .expectJsonLike(
      [{
        "field": "status",
        "message": "can't be blank"
    }],
    );
});

it("PATCH Update User - Positive Flow", async () => {
  await spec()
    .patch('/{id}')
    .withHeaders("Authorization", `Bearer ${token}`)
    .withQueryParams('gender', 'female')
    .withPathParams('id', '$S{userId}')
    .expectStatus(200)
    .expectJsonLike(
      {
        "gender": "female"
    },
    );
});

it("DELETE Delete User - Invalid ID", async () => {
  await spec()
    .delete("/0")
    .withHeaders("Authorization", `Bearer ${token}`)
    .withQueryParams('gender', "female")
    .expectStatus(404);
});

it("DELETE Delete User - Positive Flow", async () => {
  await spec()
    .delete('/{id}')
    .withHeaders("Authorization", `Bearer ${token}`)
    .withPathParams('id', '$S{userId}')
    .expectStatus(204);
});