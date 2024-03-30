'use client';

import type { NextPage } from "next";
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from "react";
import Container from "../../components/Container";
import { getAuthorizationUrl } from '../actions/login';

const Login: NextPage = () => {
  const router = useRouter();
  const [state, setState] = useState({
    email: "",
  });

  const handleChange = (e: FormEvent<HTMLInputElement>): void => {
    const { name, value } = e.currentTarget;
    setState({
      ...state,
      [name]: value,
    });
  };

  const loginUser = async (event: FormEvent) => {
    event.preventDefault();
    const url = await getAuthorizationUrl(state.email);
    router.push(url);
  };

  return (
    <Container title="Sign in">
      <div className="flex flex-col py-20 max-w-md mx-auto">
        <h2 className="text-center text-3xl mt-5">Log in to App</h2>
        <p className="text-center mt-4 font-medium text-gray-500">
          Click `Continue with SAML SSO` and you will be redirected to your third-party
          authentication provider to finish authenticating.
        </p>
        <div className="mt-3 mx-auto w-full max-w-sm">
          <div className="bg-white py-6 px-6 rounded">
            <form className="space-y-6" onSubmit={loginUser}>
              <div>
                <label htmlFor="email" className="block text-sm text-gray-600">
                  Work Email
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="username@scalekit.com"
                    className="appearance-none text-sm block w-full border border-gray-300 rounded placeholder-gray-400 focus:outline-none focus:ring-indigo-500"
                    value={state.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="px-4 py-2 w-full border border-transparent rounded text-sm font-medium text-white bg-indigo-600 focus:outline-none"
                >
                  Continue with SAML SSO
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Login;
