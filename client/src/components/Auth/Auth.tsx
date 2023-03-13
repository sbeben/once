import { $isMobile } from "@/model/api";
import {
  $authPageState,
  $registerForm,
  $signInEmail,
  $signInPassword,
  changeAuthPageState,
  loginClicked,
  registerClicked,
  registerFormChanged,
  signInEmailChanged,
  signInPasswordChanged,
} from "@/model/auth";
import { Button } from "@/shared/ui/Button";
import { Description } from "@/shared/ui/Description";
import { Input } from "@/shared/ui/Input";
import { TextLink } from "@/shared/ui/TextLink";
import { useUnit } from "effector-solid";
import { Component, Match, Switch } from "solid-js";
import {
  Box,
  Container,
  Divider,
  FormSection,
  Logo,
  LogoSection,
} from "./Style";

export const Auth: Component = () => {
  const {
    show,
    switchTo,
    isMobile,
    email,
    password,
    changeEmail,
    changePassword,
    login,
    regForm,
    changeRegForm,
    register,
  } = useUnit({
    show: $authPageState,
    switchTo: changeAuthPageState,
    isMobile: $isMobile,
    email: $signInEmail,
    changeEmail: signInEmailChanged,
    password: $signInPassword,
    changePassword: signInPasswordChanged,
    login: loginClicked,
    regForm: $registerForm,
    changeRegForm: registerFormChanged,
    register: registerClicked,
  });
  return (
    <Container>
      <Box isMobile={isMobile()}>
        <LogoSection isMobile={isMobile()}>
          <Logo isMobile={isMobile()}>Once</Logo>
          <Description>Conscious communication</Description>
        </LogoSection>
        <Divider isMobile={isMobile()} />
        <FormSection>
          <Switch>
            <Match when={show() === "login"}>
              <Input
                type="email"
                value={email()}
                onInput={(e) => changeEmail(e.currentTarget.value)}
              />
              <Input
                type="password"
                value={password()}
                onInput={(e) => changePassword(e.currentTarget.value)}
              />
              <Button type="regular" onClick={() => login()}>
                Login
              </Button>
              <TextLink onClick={() => switchTo("register")}>
                Dont have an account? Register
              </TextLink>
            </Match>
            <Match when={show() === "register"}>
              <Input
                type="email"
                value={regForm().email}
                placeholder="email"
                onInput={(e) => changeRegForm({ email: e.currentTarget.value })}
              />
              <Input
                type="text"
                value={regForm().name}
                placeholder="name"
                onInput={(e) => changeRegForm({ name: e.currentTarget.value })}
              />
              <Input
                type="password"
                value={regForm().password}
                placeholder="password"
                onInput={(e) =>
                  changeRegForm({ password: e.currentTarget.value })
                }
              />
              <Button type="regular" onClick={() => register()}>
                Register
              </Button>
              <TextLink onClick={() => switchTo("login")}>
                Already have an account? Log in
              </TextLink>
            </Match>
          </Switch>
        </FormSection>
      </Box>
    </Container>
  );
};
