import { useState, useEffect } from "react";
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import Checkout from "./Checkout";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

export default function Register() {

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        avatar: null,
      });

    // These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
        return { ...prev, ...value };
        });
    }

    async function onSubmit(e) {
        e.preventDefault();

        let formData = new FormData();
        formData.append('name', form.name);
        formData.append('email', form.email);
        formData.append('password', form.password);
        formData.append('phone', form.phone);
        formData.append('avatar', form.avatar);

        //const user = { ...form };
        try {
          let response = await fetch("http://localhost:5050/register", {
            method: "POST",
            body: formData,
          });
            
        } catch (error) {
            
        }

    }

    const responseFacebook = (response) => {
      console.log(response);
    }

    const googleLogin = useGoogleLogin({
      /*onSuccess: codeResponse => console.log(codeResponse),
      flow: 'auth-code',*/

      onSuccess: async (response) => {
        try {
          const res = await axios.get(
            "https://www.googleapis.com/oauth2/v3/userinfo",
            {
              headers: {
                Authorization: `Bearer ${response.access_token}`
              }
            }
          );
          console.log(res)
        } catch (error) {
          console.log(res)
        }
      }
    });

    const initialOptions = {
      "client-id": "ARRBMjYEkYqTelEKTZmfRgVkwi-_HPnmRI8xrRYqjZrsNzrqionoJZKhAxaJHL2aYvODPaC8AILoxTJi",
      currency: "USD",
      intent: "capture",
    };


    return (
        <>
        {/*<h3 className="text-lg font-semibold p-4">Register Here ...</h3>
        <form
            onSubmit={onSubmit}
            className="border rounded-lg overflow-hidden p-4"
        >
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 ">
                <div className="sm:col-span-4">
                <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-slate-900"
                >
                    Name
                </label>
                <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                        type="text"
                        name="name"
                        id="name"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="First Last"
                        value={form.name}
                        onChange={(e) => updateForm({ name: e.target.value })}
                    />
                    </div>
                </div>
                </div>
            </div>

            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 ">
                <div className="sm:col-span-4">
                <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-slate-900"
                >
                    Email
                </label>
                <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                        type="text"
                        name="email"
                        id="email"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Email"
                        value={form.email}
                        onChange={(e) => updateForm({ email: e.target.value })}
                    />
                    </div>
                </div>
                </div>
            </div>

            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 ">
                <div className="sm:col-span-4">
                <label
                    htmlFor="phone"
                    className="block text-sm font-medium leading-6 text-slate-900"
                >
                    Phone
                </label>
                <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                        type="text"
                        name="phone"
                        id="phone"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Phone"
                        value={form.phone}
                        onChange={(e) => updateForm({ phone: e.target.value })}
                    />
                    </div>
                </div>
                </div>
            </div>


            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 ">
                <div className="sm:col-span-4">
                <label
                    htmlFor="avatar"
                    className="block text-sm font-medium leading-6 text-slate-900"
                >
                    Avatar
                </label>
                <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                        type="file"
                        name="avatar"
                        id="avatar"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Avatar"
                        onChange={(e) => updateForm({ avatar: e.target.files[0] })}
                    />
                    </div>
                </div>
                </div>
            </div>

            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 ">
                <div className="sm:col-span-4">
                <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-slate-900"
                >
                    Password
                </label>
                <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                        type="password"
                        name="password"
                        id="password"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Password"
                        value={form.password}
                        onChange={(e) => updateForm({ password: e.target.value })}
                    />
                    </div>
                </div>
                </div>
            </div>


        <input
          type="submit"
          value="Register"
          className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3 cursor-pointer mt-4"
        />

    </form>*/}


<section class="signup-login">
      <div class="container-fluid g-0">
        <div class="container-">
          <div class="row g-0 align-items-center">
            <div class="col-md-5">
              <div class="left-img">
                <img src="/src/img/left-bg.png" alt="" class="img-fluid" />
              </div>
            </div>
            <div class="col-md-5 offset-md-1">
              <div class="right-form" id="login-main" >
                <div class="logo">
                  <img src="/src/img/logo.png" alt="logo" />
                </div>
                <div class="heading">
                  <h2>Login To Your Account</h2>
                </div>
                <div class="form-container">
                  <div class="mb-3">
                    <input
                      type="email"
                      class="form-control"
                      id="exampleFormControlInput1"
                      placeholder="Email  or Username"
                    />
                  </div>
                  <div class="mb-3">
                    <input
                      type="password"
                      class="form-control"
                      id="inputPassword"
                      placeholder="Password"
                    />
                  </div>
                  <div class="col-auto">
                    <button type="submit" class="btn-form mb-3">Login</button>
                  </div>
                  <div class="row">
                    <div class="col-6">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault"
                        />
                        <label class="form-check-label" for="flexCheckDefault">
                          Remember me
                        </label>
                      </div>
                    </div>
                    <div class="col-md-6 text-end">
                      <a href="#" class="forgot-password">Forgot Password</a>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12 mb-4 text-center">
                      <span class="t-center">OR</span>
                    </div>
                  </div>
                  <div class="row justify-content-center r-gap">



                    <div class="col-md-6 text-end">

                    <button class="social-login" onClick={() => googleLogin()}>
                    <img src="https://i.ibb.co/ydLySMx/google.png"/> Log in With Google
                    </button>;
                      
                    </div>
                    <div class="col-md-6">
                      

                    <FacebookLogin
                      appId="975265490906407"
                      autoLoad
                      callback={responseFacebook}
                      fields="name,email,picture"
                      render={renderProps => (
                        <button class="social-login" onClick={renderProps.onClick}><img src="https://i.ibb.co/pnpDRC6/facebook.png"/> Log in With Facebook</button>
                      )}
                    />

                    <PayPalScriptProvider options={initialOptions}>
                        <Checkout/>
                    </PayPalScriptProvider>

                    </div>

                  </div>
                  <div class="row mt-5">
                    <div class="col-12 mb-4 text-center ">
                      <span class="t-account">Don't have an account? <a href="#" class="create-account" id="create-account">Create</a></span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="right-form" id="signup-main" >
                <div class="logo">
                  <img src="/src/img/logo.png" alt="logo" />
                </div>
                <div class="heading">
                  <h2>Create an Account</h2>
                </div>
                <div class="form-container">
                    <div class="mb-3">
                        <input
                          type="tect"
                          name="fullname"
                          class="form-control"
                          id="name"
                          placeholder="Enter Full Name" 
                        />
                      </div>
                  <div class="mb-3">
                    <input
                      type="email"
                      name="email"
                      class="form-control"
                      id="exampleFormControlInput1"
                      placeholder="Enter Your Email"
                    />
                  </div>
                  <div class="mb-3">
                    <input
                      type="number"
                      name="number"
                      class="form-control"
                      id="phoneNumber"
                      placeholder="Enter Your Number"
                    />
                  </div>
                  <div class="mb-3">
                    <input
                      type="password" name="password"
                      class="form-control"
                      id="inputPassword"
                      placeholder="Password"
                    />
                  </div>
                  <div class="col-auto">
                    <button type="submit" class="btn-form mb-3">Sign Up</button>
                  </div>
                  <div class="row">
                    <div class="col-12 mb-4 text-center">
                      <span class="t-center">OR</span>
                    </div>
                  </div>
                  <div class="row justify-content-center r-gap">
                    <div class="col-md-6 text-end">
                      <button type="button" class="social-login">
                       <img src="https://i.ibb.co/ydLySMx/google.png"/> Sign Up With Google
                      </button>
                    </div>
                    <div class="col-md-6">
                      <button type="button" class="social-login">
                        <img src="https://i.ibb.co/pnpDRC6/facebook.png"/> Sign Up With Facebook
                      </button>
                    </div>
                  </div>
                  <div class="row mt-5">
                    <div class="col-12 mb-4 text-center ">
                      <span class="t-account">Already have an account? <a href="#" class="login-account" id="login">Login</a></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

        </>
    );
}