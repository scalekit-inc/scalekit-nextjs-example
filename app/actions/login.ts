'use server'
import { scalekit } from '@/service/auth';

export async function getAuthorizationUrl(email: string) {
  const domain = email.split("@")[1]
  return scalekit.getAuthorizationUrl(
    process.env.AUTH_REDIRECT_URI!,
    {
      domainHint: domain,
    }
  );
}