import supertest from "supertest";
import app from "../src/app.js";

describe("Email Endpoints", () => {
  test("Create Email Id", async () => {
    await supertest(app)
      .post("/v1/email")
      .send({})
      .expect("Content-Type", /json/)
      .expect(201)
      .then((response) => {
        expect(response.body.message).toMatch("Email created successfully");
      })
      .catch((error) => {
        throw new Error(error);
      });
  });
  test("Get Email By Id", async () => {
    await supertest(app)
      .get("/v1/email/1")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.message).toMatch(
          "EmailIds retrieved successfully"
        );
      })
      .catch((error) => {
        throw new Error(error);
      });
  });
  test("Get User Email IDs", async () => {
    await supertest(app)
      .get("/v1/email/user/1")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.message).toMatch("Email IDs retrieved");
      })
      .catch((error) => {
        throw new Error(error);
      });
  });
  test("Update Email Id", async () => {
    await supertest(app)
      .put("/v1/email/1")
      .send({})
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.message).toMatch("Email updated successfully");
      })
      .catch((error) => {
        throw new Error(error);
      });
  });
  test("Delete Email Id", async () => {
    await supertest(app)
      .delete("/v1/email/1")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.message).toMatch("Email deleted successfully");
      })
      .catch((error) => {
        throw new Error(error);
      });
  });
  test("Request Verification to Email", async () => {
    await supertest(app)
      .post("/v1/email/request-verification/1")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.message).toMatch("Verification mail sent");
      })
      .catch((error) => {
        throw new Error(error);
      });
  });
  test("Verify Email", async () => {
    await supertest(app)
      .post("/v1/email/verify/1")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.message).toMatch("Email verified");
      })
      .catch((error) => {
        throw new Error(error);
      });
  });
});
