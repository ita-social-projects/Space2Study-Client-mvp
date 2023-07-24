import { ThemeProvider } from "@mui/material/styles";
import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { ConfirmationDialogProvider } from "~/context/confirm-context";
import { ModalProvider } from "~/context/modal-context";
import { SnackBarProvider } from "~/context/snackbar-context";
import reducer from "~/redux/reducer";
import { theme } from "~/styles/app-theme/custom-mui.styles";

import MockAdapter from "axios-mock-adapter";
import { vi } from "vitest";
import { axiosClient } from "~/plugins/axiosClient";

export const renderWithProviders = (
  ui,
  {
    initialEntries = "/",
    preloadedState,
    store = configureStore({ reducer: { appMain: reducer }, preloadedState }),
    ...renderOptions
  } = {}
) => {
  const Wrapper = ({ children }) => (
    <Provider store={store}>
      <MemoryRouter initialEntries={[initialEntries]}>
        <ThemeProvider theme={theme}>
          <SnackBarProvider>
            <ConfirmationDialogProvider>
              <ModalProvider>{children}</ModalProvider>
            </ConfirmationDialogProvider>
          </SnackBarProvider>
        </ThemeProvider>
      </MemoryRouter>
    </Provider>
  );
  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

export const getFakeTestEvent = (key, value) => ({
  preventDefault: vi.fn(),
  target: { [key]: value },
});

export const mockAxiosClient = new MockAdapter(axiosClient);
