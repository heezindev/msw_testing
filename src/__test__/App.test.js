/**
 * @jest-environment jsdom
 */

import { render, screen, waitFor } from "@testing-library/react";
import App from "../App";

describe("Test", () => {
  test("테스트", async () => {
    render(<App />);

    await waitFor(
      async () => {
        const element = await screen.findByText(/장희진/i);

        expect(element).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });
});
