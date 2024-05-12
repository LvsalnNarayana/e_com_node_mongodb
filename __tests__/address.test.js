import supertest from "supertest";
import app from "../src/app.js";

describe("Address Endpoints", () => {
  test("Create Address", async () => {
    await supertest(app)
      .post("/v1/address")
      .send({})
      .expect("Content-Type", /json/)
      .expect(201)
      .then((response) => {
        expect(response.body.message).toMatch("Address created successfully");
      })
      .catch((error) => {
        throw new Error(error);
      });
  });
  test("Get Address By Id", async () => {
    await supertest(app)
      .get("/v1/address/1")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.message).toMatch("Address retrieved successfully");
      })
      .catch((error) => {
        throw new Error(error);
      });
  });
  test("Get User Address", async () => {
    await supertest(app)
      .get("/v1/address/user/1")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.message).toMatch(
          "All addresses retrieved successfully"
        );
      })
      .catch((error) => {
        throw new Error(error);
      });
  });
  test("Delete Address", async () => {
    await supertest(app)
      .delete("/v1/address/1")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.message).toMatch("Address deleted successfully");
      })
      .catch((error) => {
        throw new Error(error);
      });
  });
  test("Update Address", async () => {
    await supertest(app)
      .put("/v1/address/1")
      .send({})
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.message).toMatch("Address updated successfully");
      })
      .catch((error) => {
        throw new Error(error);
      });
  });
});
