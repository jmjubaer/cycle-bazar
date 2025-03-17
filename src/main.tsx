import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes.tsx";
import { Toaster } from "sonner";
import { ConfigProvider } from "antd";
import Aos from "aos";
Aos.init({
    offset: 0,
    duration: 600,
    easing: "linear",
    delay: 100,
});
createRoot(document.getElementById("root")!).render(
    <StrictMode>
        {/* Ant design provider */}
        <ConfigProvider
            theme={{
                token: {
                    fontWeightStrong: 800,
                },
            }}>
            {/* Redux provider */}
            <Provider store={store}>
                {/* React router provider */}
                <RouterProvider router={router} />
            </Provider>
            {/* Sonner toast */}
            <Toaster />
        </ConfigProvider>
    </StrictMode>
);
