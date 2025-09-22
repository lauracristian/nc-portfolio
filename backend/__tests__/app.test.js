const request = require("supertest");
const seed = require("../db/seed");
const db = require("../db/connection");
const app = require("../app");
require("jest-sorted");

beforeEach(() => seed());
afterAll(() => db.end());

describe("app", () => {
  describe("Invalid URL Errors", () => {
    test("status 404: invalid endpoint responds with error message", async () => {
      const { body } = await request(app).get("/invalid-url").expect(404);
      expect(body.msg).toBe("URL not found");
    });
  });
  describe("GET /api/properties", () => {
    test("status 200: get request to /api/properties returns an array of properties", async () => {
      const { body } = await request(app).get("/api/properties").expect(200);
      const propertiesArr = body.properties;

      expect(Array.isArray(propertiesArr)).toBe(true);
      expect(propertiesArr.length).toBeGreaterThan(0);

      propertiesArr.forEach((property) => {
        expect(property.hasOwnProperty("property_id")).toBe(true);
        expect(property.hasOwnProperty("property_name")).toBe(true);
        expect(property.hasOwnProperty("location")).toBe(true);
        expect(property.hasOwnProperty("price_per_night")).toBe(true);
        expect(property.hasOwnProperty("host")).toBe(true);
      });
    });

    test("status 200: properties are ordered by most favourited to least", async () => {
      const { body } = await request(app).get("/api/properties").expect(200);
      const propertiesArr = body.properties;
      expect(propertiesArr).toBeSortedBy("favourite_count", {
        descending: true,
      });
    });

    describe("Queries - Price", () => {
      test("status 200: responds with an array of properties filtered by max price", async () => {
        const { body } = await request(app)
          .get(`/api/properties?maxprice=90.0`)
          .expect(200);

        const propertiesArr = body.properties;
        expect(Array.isArray(propertiesArr)).toBe(true);
        expect(propertiesArr.length).toBeGreaterThan(0);

        propertiesArr.forEach((property) => {
          expect(+property.price_per_night).toBeLessThanOrEqual(90.0);
        });
      });

      test("status 200: responds with an array of properties filtered by min price", async () => {
        const { body } = await request(app)
          .get("/api/properties?minprice=90.0")
          .expect(200);

        const propertiesArr = body.properties;
        expect(Array.isArray(propertiesArr)).toBe(true);
        expect(propertiesArr.length).toBeGreaterThan(0);

        propertiesArr.forEach((property) => {
          expect(+property.price_per_night).toBeGreaterThanOrEqual(90.0);
        });
      });

      test("status 200: responds with empty array for no properties matching the query", async () => {
        const { body } = await request(app)
          .get("/api/properties?maxprice=5")
          .expect(200);

        expect(body.msg).toBe("No matching properties");
      });

      describe("Errors", () => {
        test("status 400: Wrong data type message for maxprice", async () => {
          const { body } = await request(app)
            .get("/api/properties?maxprice=five")
            .expect(400);
          expect(body.msg).toBe("Wrong data type");
        });

        test("status 400: Wrong data type message for minprice", async () => {
          const { body } = await request(app)
            .get("/api/properties?minprice=five")
            .expect(400);
          expect(body.msg).toBe("Wrong data type");
        });
      });
    });

    describe("Queries - Property Type", () => {
      test("status 200: responds with array of house properties", async () => {
        const { body } = await request(app)
          .get("/api/properties?property_type=House")
          .expect(200);

        const propertiesArr = body.properties;
        expect(Array.isArray(propertiesArr)).toBe(true);
        expect(propertiesArr.length).toBeGreaterThan(0);
      });

      test("status 200: valid but incorrect property_type responds with empty array", async () => {
        const { body } = await request(app)
          .get("/api/properties?property_type=flat")
          .expect(200);
        expect(body.msg).toBe("No matching properties");
      });

      describe("Errors", () => {
        test("status 400: invalid property_type responds with error message", async () => {
          const { body } = await request(app)
            .get("/api/properties?property_type=1")
            .expect(400);
          expect(body.msg).toBe("Wrong data type");
        });
      });
    });
  });

  describe("GET /api/properties/:id", () => {
    test("status 200: get request to /api/properties/:id returns a property object", async () => {
      const { body: property } = await request(app)
        .get("/api/properties/3")
        .expect(200);

      expect(typeof property).toBe("object");
      expect(property).toEqual({
        property_id: 3,
        property_name: "Chic Studio Near the Beach",
        location: "Brighton, UK",
        price_per_night: "90",
        description: "Description of Chic Studio Near the Beach.",
        host: "Alice Johnson",
        host_avatar: "https://example.com/images/alice.jpg",
        favourite_count: "1",
      });
    });

    describe("Queries - User ID", () => {
      test.skip("status 200: indicates whether the user has favourited the property", async () => {
        const { body: property } = await request(app)
          .get("/api/properties/3?user_id=2")
          .expect(200);

        expect(typeof property).toBe("object");
        expect(property).toEqual({
          property_id: 3,
          property_name: "Chic Studio Near the Beach",
          location: "Brighton, UK",
          price_per_night: "90",
          description: "Description of Chic Studio Near the Beach.",
          host: "Alice Johnson",
          host_avatar: "https://example.com/images/alice.jpg",
          favourite_count: "1",
          favourited: true,
        });
      });
    });

    describe("Errors", () => {
      test("status 400: Wrong data type for incorrect id format", async () => {
        const { body } = await request(app)
          .get("/api/properties/banana")
          .expect(400);

        expect(body.msg).toBe("Wrong data type");
      });

      test("status 404: Property not found for valid but non-existent id", async () => {
        const { body } = await request(app)
          .get("/api/properties/999")
          .expect(404);

        expect(body.msg).toBe("Property not found");
      });
    });
  });

  describe("GET /api/properties/:id/reviews", () => {
    test("status 200: responds with reviews and average rating", async () => {
      const { body } = await request(app)
        .get("/api/properties/1/reviews")
        .expect(200);

      expect(body.hasOwnProperty("reviews")).toBe(true);
      expect(body.hasOwnProperty("average_rating")).toBe(true);
      expect(typeof body.average_rating).toBe("number");

      const reviewsArr = body.reviews;
      expect(Array.isArray(reviewsArr)).toBe(true);
      expect(reviewsArr.length).toBeGreaterThan(0);

      reviewsArr.forEach((review) => {
        expect(review.hasOwnProperty("review_id")).toBe(true);
        expect(review.hasOwnProperty("comment")).toBe(true);
        expect(review.hasOwnProperty("rating")).toBe(true);
        expect(review.hasOwnProperty("created_at")).toBe(true);
        expect(review.hasOwnProperty("guest")).toBe(true);
        expect(review.hasOwnProperty("guest_avatar")).toBe(true);
      });
    });

    describe("Errors", () => {
      test("status 400: Wrong data type for incorrect id format", async () => {
        const { body } = await request(app)
          .get("/api/properties/banana/reviews")
          .expect(400);

        expect(body.msg).toBe("Wrong data type");
      });
    });
  });

  describe("GET /api/users/:id", () => {
    test("status 200: returns the user details", async () => {
      const { body } = await request(app).get("/api/users/1").expect(200);
      const user = body.user;

      expect(typeof user).toBe("object");

      expect(user.hasOwnProperty("user_id")).toBeTruthy();
      expect(user.hasOwnProperty("first_name")).toBeTruthy();
      expect(user.hasOwnProperty("surname")).toBeTruthy();
      expect(user.hasOwnProperty("email")).toBeTruthy();
      expect(user.hasOwnProperty("phone_number")).toBeTruthy();
      expect(user.hasOwnProperty("avatar")).toBeTruthy();
      expect(user.hasOwnProperty("created_at")).toBeTruthy();
    });

    describe("Errors", () => {
      test("status 400: Wrong data type for incorrect id format", async () => {
        const { body } = await request(app)
          .get("/api/users/banana")
          .expect(400);
        expect(body.msg).toBe("Wrong data type");
      });

      test("status 404: Results not found for valid but non-existent id", async () => {
        const { body } = await request(app).get("/api/users/999").expect(404);
        expect(body.msg).toBe("Results not found");
      });
    });
  });
  describe("POST /api/properties/:id/reviews", () => {
    test("status 201: inserts reviews into properties", async () => {
      const { body: review } = await request(app)
        .post("/api/properties/3/reviews")
        .send({ guest_id: 6, rating: 5, comment: "Splendid location" })
        .expect(201);

      expect(review.hasOwnProperty("review_id")).toBe(true);
      expect(review.hasOwnProperty("property_id")).toBe(true);
      expect(review.hasOwnProperty("guest_id")).toBe(true);
      expect(review.hasOwnProperty("rating")).toBe(true);
      expect(review.hasOwnProperty("comment")).toBe(true);
      expect(review.hasOwnProperty("created_at")).toBe(true);
    });
    describe("Errors", () => {
      test("status 400: missing required fields comes up with error message", async () => {
        const { body } = await request(app)
          .post("/api/properties/3/reviews")
          .send({ rating: 2 })
          .expect(400);

        expect(body.msg).toBe("Missing required fields");
      });
      test("status 400: wrong data type in fields comes up with error message", async () => {
        const { body } = await request(app)
          .post("/api/properties/3/reviews")
          .send({
            guest_id: 6,
            rating: "Splendid",
            comment: "Splendid location",
          })
          .expect(400);

        expect(body.msg).toBe("Wrong data type");
      });
      test("status 404: wrong data type in fields comes up with error message", async () => {
        const { body } = await request(app)
          .post("/api/properties/999/reviews")
          .send({ guest_id: 6, rating: 5, comment: "Splendid location" })
          .expect(404);

        expect(body.msg).toBe("Property not found");
      });
    });
  });

  describe("GET /api/users", () => {
    test("status 200: get request to /api/users returns an array of users", async () => {
      const { body } = await request(app).get("/api/users").expect(200);
      const usersArr = body.users;

      expect(Array.isArray(usersArr)).toBe(true);
      expect(usersArr.length).toBeGreaterThan(0);

      usersArr.forEach((user) => {
        expect(user.hasOwnProperty("user_id")).toBe(true);
        expect(user.hasOwnProperty("first_name")).toBe(true);
        expect(user.hasOwnProperty("surname")).toBe(true);
        expect(user.hasOwnProperty("email")).toBe(true);
        expect(user.hasOwnProperty("phone_number")).toBe(true);
        expect(user.hasOwnProperty("is_host")).toBe(true);
        expect(user.hasOwnProperty("avatar")).toBe(true);
        expect(user.hasOwnProperty("created_at")).toBe(true);
      });
    });
  });
  describe("GET /api/images", () => {
    test("status 200: get request to /api/images returns an array of images", async () => {
      const { body } = await request(app).get("/api/images").expect(200);
      const imagesArr = body.images;

      expect(Array.isArray(imagesArr)).toBe(true);
      expect(imagesArr.length).toBeGreaterThan(0);

      imagesArr.forEach((image) => {
        expect(image.hasOwnProperty("image_id")).toBe(true);
        expect(image.hasOwnProperty("property_id")).toBe(true);
        expect(image.hasOwnProperty("image_url")).toBe(true);
        expect(image.hasOwnProperty("alt_text")).toBe(true);
      });
    });
  });
});
