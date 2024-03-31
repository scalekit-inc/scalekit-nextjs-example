'use server'
import { scalekit } from '@/service/auth';

export async function getAuthorizationUrl(strategyOptions: any) {
  if(strategyOptions.email){
    return scalekit.getAuthorizationUrl(
      process.env.AUTH_REDIRECT_URI!,
      {
  
        domainHint: strategyOptions.email,
      }
    );
  }
  if(strategyOptions.organization_id){
    return scalekit.getAuthorizationUrl(
      process.env.AUTH_REDIRECT_URI!,
      {
  
        organizationId: strategyOptions.organization_id,
      }
    );
  }
  if(strategyOptions.connection_id){
    return scalekit.getAuthorizationUrl(
      process.env.AUTH_REDIRECT_URI!,
      {
  
        connectionId: strategyOptions.connection_id,
      }
    );
  }
  
  return "/";
  
}