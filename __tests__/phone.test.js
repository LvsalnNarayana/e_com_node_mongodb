import supertest from "supertest";
import app from "../src/app.js";

describe("Phone Number Endpoints", () => {
  test("Create Phone Number", async () => {
    await supertest(app)
      .post("/v1/phone")
      .send({})
      .expect("Content-Type", /json/)
      .expect(201)
      .then((response) => {
        expect(response.body.message).toMatch(
          "Phone number added successfully"
        );
      })
      .catch((error) => {
        throw new Error(error);
      });
  });

  test("Get Phone Number By Id", async () => {
    await supertest(app)
      .get("/v1/phone/1")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.message).toMatch("Phone number fetched");
      })
      .catch((error) => {
        throw new Error(error);
      });
  });

  test("Get User Phone Numbers", async () => {
    await supertest(app)
      .get("/v1/phone/user/1")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.message).toMatch("Phone numbers fetched");
      })
      .catch((error) => {
        throw new Error(error);
      });
  });

  test("Delete Phone Number By Id", async () => {
    await supertest(app)
      .delete("/v1/phone/1")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.message).toMatch("Phone number deleted");
      })
      .catch((error) => {
        throw new Error(error);
      });
  });

  test("Update Phone Number By Id", async () => {
    await supertest(app)
      .put("/v1/phone/1")
      .send({})
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.message).toMatch("Phone number updated");
      })
      .catch((error) => {
        throw new Error(error);
      });
  });

  test("Set Phone Number for 2fa", async () => {
    await supertest(app)
      .put("/v1/phone/1/set-2fa")
      .send({})
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.message).toMatch("Phone number set for 2fa");
      })
      .catch((error) => {
        throw new Error(error);
      });
  });

  test("Request Verification Code", async () => {
    await supertest(app)
      .post("/v1/phone/1/request-2fa-code")
      .send({})
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.message).toMatch("Verification sent");
      })
      .catch((error) => {
        throw new Error(error);
      });
  });

  test("Verify Verification Code", async () => {
    await supertest(app)
      .post("/v1/phone/1/verify-2fa")
      .send({})
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.message).toMatch("Phone number verified");
      })
      .catch((error) => {
        throw new Error(error);
      });
  });
});
