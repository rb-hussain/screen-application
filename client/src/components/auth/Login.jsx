import { useState, useEffect } from "react";
import axios from 'axios';
export default function Login() {

    const [form, setForm] = useState({
        email: "",
        password: "",
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
        formData.append('email', form.email);
        formData.append('password', form.password);

        //const user = { ...form };
        try {
          let response = await fetch("http://localhost:5050/login", {
            method: "POST",
            body: formData,
          });
            
        } catch (error) {
            
        }

    }


    return (
        <>
        <h3 className="text-lg font-semibold p-4">Register Here ...</h3>
        <form
            onSubmit={onSubmit}
            className="border rounded-lg overflow-hidden p-4"
        >

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
          value="Login"
          className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3 cursor-pointer mt-4"
        />

        </form>

        </>
    );
}