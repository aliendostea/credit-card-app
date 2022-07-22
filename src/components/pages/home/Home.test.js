import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { jest } from "@jest/globals";

import Home from "./Home";

const fakeResponse = {
  fullName: "3",
  cardNumber: "4",
  expirationMonth: "5",
  expirationYear: "6",
  cvv: "7",
};

const testFetch = jest.fn((url, options) => {
  return new Promise((resolve, reject) => {
    const testResponse = {
      ok: true,
      json() {
        return new Promise((resolve, reject) => {
          resolve({ success: true });
        });
      },
    };
    resolve(testResponse);
  });
});

/* jest.stubGlobal("fetch", testFetch); */

/* const server = setupServer(
  rest.post("http://localhost:3100/data-creditcard", (req, res, ctx) => {
    console.log("req----", req);
  })
);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

*/
beforeEach(() => render(<Home />));

describe("Home Component", () => {
  it("there must be a create product form", () => {
    const form = screen.getByRole("form");
    expect(form).toBeInTheDocument();
  });

  it("should exists the fields: fullName, cardNumber, expirationMonth, expirationYear, CVV", () => {
    expect(screen.getByLabelText(/fullName/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Card number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Expiration month/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Expiration year/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/CVV/i)).toBeInTheDocument();
  });

  it("there must be a Button submit ", () => {
    const submitBtn = screen.getByRole("button", { name: /submit/i });

    expect(submitBtn).toBeInTheDocument();
    expect(submitBtn).not.toBeDisabled();
  });

  it("when the user submits the form without values ", async () => {
    expect(
      screen.queryByText(/fullName is a required field/i)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/cardNumber is a required field/i)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/expirationMonth is a required field/i)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/expirationYear is a required field/i)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/cvv is a required field/i)
    ).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() =>
      expect(
        screen.queryByText(/fullName is a required field/i)
      ).toBeInTheDocument()
    );

    await waitFor(() =>
      expect(
        screen.queryByText(/cardNumber is a required field/i)
      ).toBeInTheDocument()
    );

    await waitFor(() =>
      expect(
        screen.queryByText(/expirationMonth is a required field/i)
      ).toBeInTheDocument()
    );

    await waitFor(() =>
      expect(
        screen.queryByText(/expirationYear is a required field/i)
      ).toBeInTheDocument()
    );

    await waitFor(() =>
      expect(
        screen.queryByText(/cvv is a required field/i, { exact: true })
      ).toBeInTheDocument()
    );
  });
});

describe("when the user blurs an empty field", () => {
  it("onBlur inputs should display validation error message", async () => {
    expect(
      screen.queryByText(/fullName is a required field/i)
    ).not.toBeInTheDocument();

    fireEvent.blur(screen.getByLabelText(/fullName/i), {
      target: { name: "fullName", value: "" },
    });

    await waitFor(() =>
      expect(
        screen.queryByText(/fullName is a required field/i)
      ).toBeInTheDocument()
    );

    expect(
      screen.queryByText(/cardNumber is a required field/i)
    ).not.toBeInTheDocument();

    fireEvent.blur(screen.getByLabelText(/Card number/i), {
      target: { name: "cardNumber", value: "" },
    });

    await waitFor(() =>
      expect(
        screen.queryByText(/cardNumber is a required field/i)
      ).toBeInTheDocument()
    );
  });
});

describe("when the user submits the form", () => {
  it("button submit change text to Submitted", async () => {
    const fullName = screen.getByLabelText(/fullName/i);
    const cardNumber = screen.getByLabelText(/Card number/i);
    const expirationMonth = screen.getByLabelText(/Expiration month/i);
    const expirationYear = screen.getByLabelText(/Expiration year/i);
    const cvv = screen.getByLabelText(/CVV/i);

    fireEvent.change(fullName, {
      target: { name: "fullName", value: "My name" },
    });

    fireEvent.change(cardNumber, {
      target: { name: "cardNumber", value: "0000000000000000" },
    });

    fireEvent.change(expirationMonth, {
      target: { name: "expirationMonth", value: "01" },
    });

    fireEvent.change(expirationYear, {
      target: { name: "expirationYear", value: "2022" },
    });

    fireEvent.change(cvv, {
      target: { name: "cvv", value: "888" },
    });

    const submitBtn = screen.getByRole("button", { name: /Submit/i });
    fireEvent.click(submitBtn);

    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () => {
        success: true;
      },
    });
    expect(window.fetch).toHaveBeenCalledWith(
      "http://localhost:3100/data-creditcard"
    );
    await waitFor(() => expect(submitBtn).not.toBeInTheDocument());
    await waitFor(() => expect(screen.getByRole("button")).toBeDisabled());
  });
});
