import supertest from "supertest";
import app from "../src/app.js";

describe("User API Endpoints", () => {
  test("Create User", async () => {
    await supertest(app)
      .post("/v1/users")
      .send({ username: "newuser", email: "newuser@example.com" })
      .expect("Content-Type", /json/)
      .expect(201)
      .then((response) => {
        expect(response.body.message).toMatch("User created successfully");
      })
      .catch((error) => {
        throw new Error(error);
      });
  });
  test("Get All Users", async () => {
    await supertest(app)
      .get("/v1/users")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.message).toMatch("Users retrieved successfully");
      })
      .catch((error) => {
        throw new Error(error);
      });
  });
  test("Get User By Id", async () => {
    await supertest(app)
      .get("/v1/users/1")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.message).toMatch("User retrieved successfully");
      })
      .catch((error) => {
        throw new Error(error);
      });
  });
  test("Update User By Id", async () => {
    await supertest(app)
      .put("/v1/users/1")
      .send({ username: "updateduser" })
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.message).toMatch("User updated successfully");
      })
      .catch((error) => {
        throw new Error(error);
      });
  });
  test("Delete User By Id", async () => {
    await supertest(app)
      .delete("/v1/users/1")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.message).toMatch("User deleted successfully");
      })
      .catch((error) => {
        throw new Error(error);
      });
  });
  test("Update User Profile Picture", async () => {
    await supertest(app)
      .put("/v1/users/1/profile-picture")
      .send({ imageUrl: "http" })
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.message).toMatch(
          "Profile picture updated successfully"
        );
      })
      .catch((error) => {
        throw new Error(error);
      });
  });
  test("Toggle User Password", async () => {
    await supertest(app)
      .put("/v1/users/1/password-toggle")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.message).toMatch(
          "User password toggled successfully"
        );
      })
      .catch((error) => {
        throw new Error(error);
      });
  });
  test("Toggle User Ban", async () => {
    await supertest(app)
      .put("/v1/users/1/ban")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.message).toMatch("User ban toggled successfully");
      })
      .catch((error) => {
        throw new Error(error);
      });
  });
  test("Toggle User Lock", async () => {
    await supertest(app)
      .put("/v1/users/1/lock")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.message).toMatch("User Lock toggled successfully");
      })
      .catch((error) => {
        throw new Error(error);
      });
  });
  test("Update User password", async () => {
    await supertest(app)
      .put("/v1/users/1/password")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.message).toMatch("Password updated successfully");
      })
      .catch((error) => {
        throw new Error(error);
      });
  });
  test("Toggle Two factor authentication", async () => {
    await supertest(app)
      .put("/v1/users/1/2fa")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.message).toMatch(
          "Two-factor authentication toggled successfully"
        );
      })
      .catch((error) => {
        throw new Error(error);
      });
  });
});
