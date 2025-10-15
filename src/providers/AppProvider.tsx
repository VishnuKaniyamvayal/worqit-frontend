import { ConfigProvider } from "antd";
import type { PropsWithChildren } from "react";
import AuthProvider from "./AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type AppProviderProps = PropsWithChildren

export default function AppProvider({ children }: AppProviderProps) {
    const qc = new QueryClient();
    const theme = {
        token: {
            // Seed Token
            // colorPrimary: '#00b96b',
            borderRadius: 6,
            // Alias Token
            // colorBgContainer: '#f6ffed',
        },
    }

    return (
        <AuthProvider>
            <QueryClientProvider  client={qc}>

                <ConfigProvider
                    theme={theme}
                >
                    {children}
                </ConfigProvider>
            </QueryClientProvider>
        </AuthProvider>
    )
}