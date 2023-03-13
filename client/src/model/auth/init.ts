import { sample, split } from "effector";
import {
  $isAuthorized,
  $userInfo,
  $userName,
  checkUserFx,
  loginFx,
  logout,
  logoutFx,
  registerFx,
  signUpClick,
  signInClick,
  signInEmailChanged,
  $signInEmail,
  signInPasswordChanged,
  $signInPassword,
  loginClicked,
  $loginForm,
  registerFormChanged,
  $registerForm,
  registerClicked,
  setNewUserRole,
  $registerRole,
  writeUserFx,
  changeAuthPageState,
  $authPageState,
} from "./";

import { RouteParams, RouteParamsAndQuery } from "atomic-router";

import { authRoute, chatsRoute } from "@/shared/lib/routes";
import { initWebsocketFx } from "../conversations";

sample({
  clock: changeAuthPageState,
  target: $authPageState,
});

sample({
  clock: signInEmailChanged,
  target: $signInEmail,
});

sample({
  clock: signInPasswordChanged,
  target: $signInPassword,
});

sample({
  clock: loginClicked,
  source: $loginForm,
  target: loginFx,
});

sample({
  clock: [loginFx.doneData, checkUserFx.doneData],
  target: $userInfo,
});

sample({
  clock: [loginFx.doneData, registerFx.doneData],
  target: [writeUserFx, initWebsocketFx, chatsRoute.navigate],
});

// sample({
//   clock: loginFx.failData,
//   fn: (data) => ({
//     title: "Failed to log in",
//     message: data.message,
//   }),
//   target: error,
// });

sample({
  clock: registerFormChanged,
  source: $registerForm,
  fn: (form, change) => {
    return { ...form, [Object.keys(change)[0]]: Object.values(change)[0] };
  },
  target: $registerForm,
});

sample({
  clock: setNewUserRole,
  target: $registerRole,
});

sample({
  clock: registerClicked,
  source: $registerForm,
  // source: { form: $registerForm, role: $registerRole },
  // fn: ({ form, role }) => {
  //   return { ...form, role };
  // },
  target: registerFx,
});

// sample({
//   clock: signUpClick,
//   fn: () => ({} as RouteParamsAndQuery<RouteParams>),
//   target: mainRoute.navigate,
// });

// sample({
//   clock: signInClick,
//   fn: () => ({} as RouteParamsAndQuery<RouteParams>),
//   target: loginRoute.navigate,
// });

// sample({
//   clock: registerFx.failData,
//   fn: (data) => ({
//     title: "Failed to register",
//     message: data.message,
//   }),
//   target: error,
// });

sample({
  clock: logout,
  target: logoutFx,
});

sample({
  clock: logoutFx.finally,
  fn: () => ({} as RouteParamsAndQuery<RouteParams>),
  target: authRoute.navigate,
});

checkUserFx();

sample({
  clock: checkUserFx.doneData,
  target: $userInfo,
});

$userInfo.reset(logoutFx.done);
