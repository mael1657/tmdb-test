import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Router from "./router/Router";
import { CssBaseline } from "@mui/material";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <Router />
    </QueryClientProvider>
  );
}

export default App;
