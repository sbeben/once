import { createEffect, sample } from "effector";
import { authRoute, homeRoute } from "@/shared/lib/routes";
import { webSocketConnectionFailed } from "./conversations";

export type FilesData = { files?: File[] };
export type ReqData = Record<string, string> & FilesData;
export type BaseRequest = {
  path: string;
  data?: ReqData;
  method: string;
  hasFiles?: boolean;
};

export type FetchSettings = RequestInit & { path?: string; data?: ReqData };

export const backendRequestFx = createEffect<
  BaseRequest,
  unknown,
  {
    message: string;
    info: string;
    status: number;
  }
>(async ({ path, data, method, hasFiles = false }) => {
  const fetchSettings: FetchSettings = {
    method,
    credentials: "include",
    headers: {
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Origin": "http://localhost:3000",
    },
  };
  if (data) {
    if (hasFiles) {
      const { files, ...fields } = data;
      const formData = new FormData();
      for (const name in fields) {
        formData.append(name, fields[name]);
      }
      files.forEach((file: File) => {
        formData.append("files", file, file.name);
      });
      fetchSettings.body = formData;
    } else {
      fetchSettings.body = JSON.stringify(data);
    }
  }
  if (!hasFiles) {
    fetchSettings.headers["Content-Type"] = "application/json";
  }
  const res = await fetch(
    `${import.meta.env.VITE_HOST_LINK}${path}`,
    fetchSettings
  );
  const result = await res.json();
  if (result.error) {
    throw {
      message: result.error || "",
      info: result.additionalInfo || "",
      status: res.status,
    };
  }
  return result;
});

backendRequestFx.finally.watch((v) => console.log("Backend request", v));

sample({
  clock: backendRequestFx.failData,
  filter: ({ status }) => status === 401,
  target: authRoute.open,
});

sample({
  clock: webSocketConnectionFailed,
  target: authRoute.open,
});

sample({
  clock: homeRoute.opened,
  target: authRoute.navigate,
});
