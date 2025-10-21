import { ConfigProvider } from "antd";
import AuthProvider from "./AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function AppProvider({ children }) {
  const qc = new QueryClient();
  const theme = {
    token: {
      borderRadius: 6,
    },
  };

  return (
    <AuthProvider>
      <QueryClientProvider client={qc}>
        <ConfigProvider theme={theme}>{children}</ConfigProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}
