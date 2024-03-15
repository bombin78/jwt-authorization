import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { NextUIProvider } from "@nextui-org/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./app/components/ThemeProvider";
import App from "./App";
import { store } from "./app/store";
import "./index.css";
import { Auth } from "./pages/Auth";
import { Layout } from "./app/components/Layout";
import { Posts } from "./pages/Posts";
import { CurrentPost } from "./pages/CurrentPost";
import { UserProfile } from "./pages/UserProfile";
import { Followers } from "./pages/Followers";
import { Following } from "./pages/Following";

const container = document.getElementById("root");

const router = createBrowserRouter([
    {
        path: '/auth',
        element: <Auth />
    },
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '',
                element: <Posts />
            },
            {
                path: 'posts/:id',
                element: <CurrentPost />
            },
            {
                path: 'users/:id',
                element: <UserProfile />
            },
            {
                path: 'followers',
                element: <Followers />
            },
            {
                path: 'following',
                element: <Following />
            },
        ]
    }
]);

if (container) {
    const root = createRoot(container);

    root.render(
        <React.StrictMode>
            <Provider store={store}>
                <NextUIProvider>
                    <ThemeProvider>
                        <RouterProvider router={router} />
                    </ThemeProvider>
                </NextUIProvider>
            </Provider>
        </React.StrictMode>,
    )
} else {
    throw new Error(
        "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
    )
}
