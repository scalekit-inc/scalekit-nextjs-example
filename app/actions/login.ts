'use server'
import { scalekit } from '@/service/auth';

type Option = {
  email?: string,
  organizationId?: string,
  connectionId?: string
}
export async function getAuthorizationUrl(option: Option) {
  const { connectionId } = option;

  return scalekit.getAuthorizationUrl(
    process.env.AUTH_REDIRECT_URI!,
    {
      connectionId: connectionId ? connectionId : process.env.AUTH_CONNECTION_ID!
    }
  );
}