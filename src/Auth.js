import React, { useState } from "react";
import * as Components from "./Components";
import axios from "axios";

function App() {
  const [signIn, toggle] = React.useState(true);
  const [authFields, setAuthFields] = useState({
    name: "",
    email: "",
    password: "",
  });

  async function handleRegisterBtn() {
    const URL = "https://heatwaves.onrender.com/api/v1/users/register";
    // console.log(authFields);

    await axios
      .post(URL, {
        email: authFields.email,
        name: authFields.name,
        password: authFields.password,
      })
      .then((res) => {
        if (res.status === 201) {
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async function hangleLoginBtn() {
    const URL = "https://heatwaves.onrender.com/api/v1/users/login";

    // console.log(authFields);
    await axios
      .post(URL, {
        email: authFields.email,
        password: authFields.password,
      })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("token", res.data.accessToken);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <Components.Container>
      <Components.SignUpContainer signinIn={signIn}>
        <Components.Form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Components.Title>Create Account</Components.Title>
          <Components.Input
            type="text"
            placeholder="Name"
            onChange={(v) => {
              setAuthFields({ ...authFields, name: v.target.value });
            }}
          />
          <Components.Input
            type="email"
            placeholder="Email"
            onChange={(v) => {
              setAuthFields({ ...authFields, email: v.target.value });
            }}
          />
          <Components.Input
            type="password"
            placeholder="Password"
            onChange={(v) => {
              setAuthFields({ ...authFields, password: v.target.value });
            }}
          />
          <Components.Button onClick={handleRegisterBtn}>
            Sign Up
          </Components.Button>
        </Components.Form>
      </Components.SignUpContainer>

      <Components.SignInContainer signinIn={signIn}>
        <Components.Form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Components.Title>Sign in</Components.Title>
          <Components.Input
            type="email"
            placeholder="Email"
            onChange={(v) => {
              setAuthFields({ ...authFields, email: v.target.value });
            }}
          />
          <Components.Input
            type="password"
            placeholder="Password"
            onChange={(v) => {
              setAuthFields({ ...authFields, password: v.target.value });
            }}
          />
          <Components.Anchor href="#">Forgot your password?</Components.Anchor>
          <Components.Button onClick={hangleLoginBtn}>
            Sigin In
          </Components.Button>
        </Components.Form>
      </Components.SignInContainer>

      <Components.OverlayContainer signinIn={signIn}>
        <Components.Overlay signinIn={signIn}>
          <Components.LeftOverlayPanel signinIn={signIn}>
            <Components.Title>Welcome Back!</Components.Title>
            <Components.Paragraph>
              To keep connected with us please login with your personal info
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(true)}>
              Sign In
            </Components.GhostButton>
          </Components.LeftOverlayPanel>

          <Components.RightOverlayPanel signinIn={signIn}>
            <Components.Title>Hello, Friend!</Components.Title>
            <Components.Paragraph>
              Enter Your personal details and start journey with us
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(false)}>
              Sigin Up
            </Components.GhostButton>
          </Components.RightOverlayPanel>
        </Components.Overlay>
      </Components.OverlayContainer>
    </Components.Container>
  );
}

export default App;
