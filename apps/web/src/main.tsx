import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "@context/index";

import {BrowserRouter, Routes, Route} from "react-router-dom";
import {ProjectsPage, ProjectPage, NotFoundPage, RouteFocus} from "./components/project-pages";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      retry: 2,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <BrowserRouter>
          <RouteFocus />
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/project" element={<ProjectsPage />} />
            <Route path="/project/:projectName" element={<ProjectPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
