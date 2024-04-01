'use client';

import type { NextPage } from "next";
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from "react";
import Container from "../../components/Container";
import { getAuthorizationUrl } from '../actions/login';

const Login: NextPage = () => {
  const router = useRouter();
  const [state, setState] = useState({ email: "", organizationId: "", connectionId: "" });

  const handleChange = (e: FormEvent<HTMLInputElement>): void => {
    const { name, value } = e.currentTarget;
    setState({
      ...state,
      [name]: value,
    });
  };

  const initiateAuth = async (event: FormEvent) => {
    event.preventDefault();
    const url = await getAuthorizationUrl({ ...state });
    router.push(url);
  };

  return (
    <Container title="Sign in">
      <h1 className="text-4xl p-20">Choose one of the SSO Strategies to login</h1>
      <div className="grid grid-cols-3 gapx-20 ">
        <div className="flex flex-col p-4 max-w-md mx-auto  border-solid border-2">
          <h2 className="text-center text-3xl mt-5">Login with Org ID</h2>
          <p className="text-left mt-4 font-medium text-gray-500">
            Unique Organization ID that the user belongs to. Scalekit will choose the first active SSO Connection configured for this organization to initiate the SSO.
          </p>
          <div className="mt-3 mx-auto w-full max-w-sm">
            <div className="bg-white py-6 px-6 rounded">
              <form className="space-y-6" onSubmit={initiateAuth}>
                <div>
                  <label htmlFor="organizationId" className="block text-sm text-gray-600">
                    Organization ID
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="organizationId"
                      id="organizationId"
                      placeholder="org_1234412"
                      className="text-black block w-full border border-gray-300 rounded placeholder-gray-400 focus:outline-none focus:ring-indigo-500"
                      value={state.organizationId}
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

        <div className="flex flex-col p-4 max-w-md mx-auto  border-solid border-2">
          <h2 className="text-center text-3xl mt-5">Login with Connection ID</h2>
          <p className="text-left mt-4 font-medium text-gray-500">
            Unique Connection ID of the specific SSO connection.<br></br>
            Ideally, you would use this strategy only when you know the specific connection id.
          </p>
          <div className="mt-3 mx-auto w-full max-w-sm">
            <div className="bg-white py-6 px-6 rounded">
              <form className="space-y-6" onSubmit={initiateAuth}>
                <div>
                  <label htmlFor="connectionId" className="block text-sm text-gray-600">
                    Connection ID
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="connectionId"
                      id="connectionId"
                      placeholder="conn_12434243"
                      className="text-black block w-full border border-gray-300 rounded placeholder-gray-400 focus:outline-none focus:ring-indigo-500"
                      value={state.connectionId}
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

        <div className="flex flex-col p-4 max-w-md mx-auto  border-solid border-2">
          <h2 className="text-center text-3xl mt-5">Login with Email</h2>
          <p className="text-left mt-4 font-medium text-gray-500">
            If you have configured that your application will enforce Single Sign-on for all users from a single email domain, this attribute is used to detect the appropriate SSO connection.
          </p>
          <div className="mt-3 mx-auto w-full max-w-sm">
            <div className="bg-white py-6 px-6 rounded">
              <form className="space-y-6" onSubmit={initiateAuth}>
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
                      className="text-black block w-full border border-gray-300 rounded placeholder-gray-400 focus:outline-none focus:ring-indigo-500"
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
      </div>

    </Container>
  );
};

export default Login;
