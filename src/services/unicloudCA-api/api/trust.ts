import { request } from '@/utils/request';

const PREFIX = '/trustCMS';
interface RequestTrustModel {
  phone?: number | null;
  page?: number;
  size?: number;
}

export async function GetAllTrustCA(params?: RequestTrustModel, options?: Record<string, any>) {
  return request(`${PREFIX}/getAll`, {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

export async function GetInquiryCAById(params?: { id: string }, options?: Record<string, any>) {
  return request(`/trust/getInquiryCAById`, {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

export async function GetInfoTrustDocumentOfInquiryCA(
  params?: { id: string },
  options?: Record<string, any>,
) {
  return request(`/trust/getInfoTrustDocumentOfInquiryCA`, {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}
