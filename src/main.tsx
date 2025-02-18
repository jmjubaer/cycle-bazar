import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes.tsx";
import { Toaster } from "sonner";
import { ConfigProvider } from "antd";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ConfigProvider
            theme={{
                token: {
                    // Seed Token
                    colorPrimary: "#ffae00",
                    fontWeightStrong: 800,
                    // borderRadius: 2,

                    // Alias Token
                    // colorBgContainer: "#f6ffed",
                },
            }}>
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
            <Toaster />
        </ConfigProvider>
    </StrictMode>
);
