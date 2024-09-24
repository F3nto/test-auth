import React from "react";
import MainRoute from "./Routes/Routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { persistor, store } from "./redux/app/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <MainRoute />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
