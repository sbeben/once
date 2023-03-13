import { combine, createEffect, createEvent, createStore } from "effector";
import { backendRequestFx } from "../";
import { FetchedUser } from "../contracts";
import { Login, Register, Role, UserInfo } from "./types";

export const USER_ROLE = "userRole";
export const USER_NAME = "userName";
export const USER_APPROVED = "approved";
export const USER_AVATAR = "userAvatar";

export const $authPageState = createStore<"login" | "register">("login");
export const changeAuthPageState = createEvent<"login" | "register">();
export const $signInEmail = createStore<string>("");
export const $signInPassword = createStore<string>("");

export const $loginForm = combine({
  email: $signInEmail,
  password: $signInPassword,
});

export const signInEmailChanged = createEvent<string>();
export const signInPasswordChanged = createEvent<string>();

export const loginClicked = createEvent<void>();
export const loginFx = createEffect<Login, UserInfo>(async (data) => {
  return (await backendRequestFx({
    data,
    method: "POST",
    path: "login",
  })) as UserInfo;
});

export const logout = createEvent<void>();
export const logoutFx = createEffect<void, void>(async () => {
  localStorage.removeItem(USER_ROLE);
  localStorage.removeItem(USER_NAME);
  //localStorage.removeItem(IS_MENU_MANUALLY_CLOSED);
  //localStorage.removeItem(USER_APPROVED);
  return (await backendRequestFx({
    method: "POST",
    path: "authorization/logout",
  })) as void;
});

export const registerFormChanged = createEvent<{ [key: string]: string }>();
export const $registerForm = createStore<Register>({
  name: "",
  email: "",
  password: "",
  role: "client",
});
export const setNewUserRole = createEvent<Role>();
export const $registerRole = createStore<Role | null>(null);
export const registerClicked = createEvent<void>();

export const registerFx = createEffect<Register & { role: Role }, FetchedUser>(
  async (data) => {
    return (await backendRequestFx({
      data,
      method: "POST",
      path: "register",
    })) as FetchedUser;
  }
);

export const writeUserFx = createEffect<UserInfo, void>((user) => {
  localStorage.setItem(USER_ROLE, user.role);
  localStorage.setItem(USER_NAME, user.name);
  //   localStorage.setItem(USER_APPROVED, user.status);
  //   localStorage.setItem(USER_AVATAR, user.avatar);
});

// export const requestNewPassword = createEvent<string>();
// export const requestNewPasswordFx = createEffect<string, void>(
//   async (email) => {
//     return (await backendRequestFx({
//       data: { email },
//       method: "POST",
//       path: "reset-password",
//     })) as void;
//   }
// );

// export const requestAuthorizationCode = createEvent<void>();
// export const requestAuthorizationCodeFx = createEffect<void, Code>(async () => {
//   return (await backendRequestFx({
//     method: "GET",
//     path: "authorization/code",
//   })) as Code;
// });
// export const $authorizationCode = createStore<string>("");

export const signUpClick = createEvent<void>();
export const signInClick = createEvent<void>();

export const $userInfo = createStore<UserInfo | null>(null);

export const $isAuthorized = $userInfo.map((user) =>
  user && user.name.length > 0 && user.role.length > 0 ? true : false
);

export const $userRole = $userInfo.map((user) =>
  user && user.role.length > 0 ? user.role : ""
);

export const $isShop = $userInfo.map((user) =>
  user && user.role && user.role.toLowerCase() === "shop" ? true : false
);
export const $isClient = $userInfo.map((user) =>
  user && user.role && user.role.toLowerCase() === "client" ? true : false
);

export const $userName = $userInfo.map((user) =>
  user && user.name.length > 0 ? user.name : "User"
);

export const checkUserFx = createEffect<void, UserInfo>(() => {
  const role = localStorage.getItem(USER_ROLE) || "";
  const name = localStorage.getItem(USER_NAME) || "";
  //const status = localStorage.getItem(USER_APPROVED) || "";
  //const avatar = localStorage.getItem(USER_AVATAR) || "";
  return { role, name } as UserInfo;
});

export const clearLocalStorageFx = createEffect<void, void>(() => {
  localStorage.removeItem(USER_ROLE);
  localStorage.removeItem(USER_NAME);
  //localStorage.removeItem(IS_MENU_MANUALLY_CLOSED);
  //localStorage.removeItem(USER_APPROVED);
});
