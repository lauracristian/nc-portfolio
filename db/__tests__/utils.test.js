const { convertObjToArr, attachUserID } = require("../utils");

describe("utils", () => {
  describe("convertObjToArr", () => {
    test("converts an object inside an array into a nested array", () => {
      const testObjData = [
        {
          property_type: "Apartment",
          description: "Description of Apartment.",
        },
      ];

      const testDataArr = convertObjToArr(testObjData);

      expect(testDataArr).toEqual([["Apartment", "Description of Apartment."]]);
    });

    test("converts several nested objects inside an array into nested arrays", () => {
      const testObjData = [
        {
          property_type: "Apartment",
          description: "Description of Apartment.",
        },
        {
          property_type: "House",
          description: "Description of House.",
        },
        {
          property_type: "Studio",
          description: "Description of Studio.",
        },
      ];

      const testDataArr = convertObjToArr(testObjData);

      expect(testDataArr).toEqual([
        ["Apartment", "Description of Apartment."],
        ["House", "Description of House."],
        ["Studio", "Description of Studio."],
      ]);
    });

    test("shouldn't mutate the original data", () => {
      const testObjData = [
        {
          property_type: "Apartment",
          description: "Description of Apartment.",
        },
        {
          property_type: "House",
          description: "Description of House.",
        },
        {
          property_type: "Studio",
          description: "Description of Studio.",
        },
      ];

      const duplicatedTestObjData = [...testObjData];
      const testDataArr = convertObjToArr(testObjData);

      expect(testObjData).not.toEqual(testDataArr);
      expect(duplicatedTestObjData).toEqual(testObjData);
    });
  });

  describe("attachUserID", () => {
    test("reorders and extracts the correct properties in the resulted array", async () => {
      const testPropertiesData = [
        {
          name: "Modern Apartment in City Center",
          property_type: "Apartment",
          location: "London, UK",
          price_per_night: 120.0,
          description: "Description of Modern Apartment in City Center.",
          host_name: "Alice Johnson",
          amenities: ["WiFi", "TV", "Kitchen"],
        },
      ];
      const testPropertiesWithID = await attachUserID(testPropertiesData);

      expect(testPropertiesWithID).toEqual([
        [
          1,
          "Modern Apartment in City Center",
          "Apartment",
          "London, UK",
          120.0,
          "Description of Modern Apartment in City Center.",
        ],
      ]);
    });

    test("attaches user_id to the correct host", async () => {
      const testPropertiesData = [
        {
          name: "Cosy Family House",
          property_type: "House",
          location: "Manchester, UK",
          price_per_night: 150.0,
          description: "Description of Cosy Family House.",
          host_name: "Alice Johnson",
          amenities: ["WiFi", "Parking", "Kitchen"],
        },
        {
          name: "Chic Studio Near the Beach",
          property_type: "Studio",
          location: "Brighton, UK",
          price_per_night: 90.0,
          description: "Description of Chic Studio Near the Beach.",
          host_name: "Alice Johnson",
          amenities: ["WiFi"],
        },
        {
          name: "Elegant City Apartment",
          property_type: "Apartment",
          location: "Birmingham, UK",
          price_per_night: 110.0,
          description: "Description of Elegant City Apartment.",
          host_name: "Emma Davis",
          amenities: ["TV", "Kitchen", "Washer"],
        },
      ];

      const testPropertiesWithID = await attachUserID(testPropertiesData);

      expect(testPropertiesWithID).toEqual([
        [
          1,
          "Cosy Family House",
          "House",
          "Manchester, UK",
          150.0,
          "Description of Cosy Family House.",
        ],
        [
          1,
          "Chic Studio Near the Beach",
          "Studio",
          "Brighton, UK",
          90.0,
          "Description of Chic Studio Near the Beach.",
        ],
        [
          3,
          "Elegant City Apartment",
          "Apartment",
          "Birmingham, UK",
          110.0,
          "Description of Elegant City Apartment.",
        ],
      ]);
    });

    test("doesn't mutate the original data", async () => {
      const testPropertiesData = [
        {
          name: "Modern Apartment in City Center",
          property_type: "Apartment",
          location: "London, UK",
          price_per_night: 120.0,
          description: "Description of Modern Apartment in City Center.",
          host_name: "Alice Johnson",
          amenities: ["WiFi", "TV", "Kitchen"],
        },
      ];
      const testPropertiesWithID = await attachUserID(testPropertiesData);

      expect(testPropertiesWithID).not.toEqual(testPropertiesData);
      expect(testPropertiesData).toEqual([
        {
          name: "Modern Apartment in City Center",
          property_type: "Apartment",
          location: "London, UK",
          price_per_night: 120.0,
          description: "Description of Modern Apartment in City Center.",
          host_name: "Alice Johnson",
          amenities: ["WiFi", "TV", "Kitchen"],
        },
      ]);
    });
  });
});
