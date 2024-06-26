'use server'
import { scalekit } from '@/service/auth';
import { cookies } from 'next/headers'
import { v4 } from "uuid";


type Option = {
  email?: string,
  organizationId?: string,
  connectionId?: string
}
export async function getAuthorizationUrl(option: Option) {
  const { connectionId } = option;
  const state = v4();
  cookies().set({
    name: 'state',
    value: state,
    httpOnly: true,
    path: '/',
  })
  return scalekit.getAuthorizationUrl(
    process.env.AUTH_REDIRECT_URI!,
    {
      state: state, // CSRF protection or any other state you want to pass
      connectionId: connectionId ? connectionId : process.env.AUTH_CONNECTION_ID!
    }
  );
}