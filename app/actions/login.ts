'use server'
import { scalekit } from '@/service/auth';

type Option = {
  email?: string,
  organizationId?: string,
  connectionId?: string
}
export async function getAuthorizationUrl(option: Option) {
  const { email, ...rest } = option;

  return scalekit.getAuthorizationUrl(
    process.env.AUTH_REDIRECT_URI!,
    {
      domainHint: email,
      ...rest
    }
  );
}