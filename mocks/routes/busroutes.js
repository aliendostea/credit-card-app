const BUS_ROUTES = [
  {
    routeId: "0590",
    line: "59",
    "text-ca": "imminent",
    "t-in-s": 5,
    destination: "Pl. Reina Maria Cristina",
    "t-in-min": 0,
  },
];

module.exports = [
  {
    id: "post-creditcard",
    url: "/data-creditcard",
    method: "POST",
    variants: [
      {
        id: "success",
        response: {
          status: 200,
          body: { success: true },
        },
      },
      {
        id: "error",
        response: {
          status: 400,
          body: {
            message: "Error",
          },
        },
      },
    ],
  },
];
