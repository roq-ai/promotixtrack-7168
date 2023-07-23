import axios from 'axios';
import queryString from 'query-string';
import {
  DigitalMarketingAgencyInterface,
  DigitalMarketingAgencyGetQueryInterface,
} from 'interfaces/digital-marketing-agency';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getDigitalMarketingAgencies = async (
  query?: DigitalMarketingAgencyGetQueryInterface,
): Promise<PaginatedInterface<DigitalMarketingAgencyInterface>> => {
  const response = await axios.get('/api/digital-marketing-agencies', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createDigitalMarketingAgency = async (digitalMarketingAgency: DigitalMarketingAgencyInterface) => {
  const response = await axios.post('/api/digital-marketing-agencies', digitalMarketingAgency);
  return response.data;
};

export const updateDigitalMarketingAgencyById = async (
  id: string,
  digitalMarketingAgency: DigitalMarketingAgencyInterface,
) => {
  const response = await axios.put(`/api/digital-marketing-agencies/${id}`, digitalMarketingAgency);
  return response.data;
};

export const getDigitalMarketingAgencyById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(
    `/api/digital-marketing-agencies/${id}${query ? `?${queryString.stringify(query)}` : ''}`,
  );
  return response.data;
};

export const deleteDigitalMarketingAgencyById = async (id: string) => {
  const response = await axios.delete(`/api/digital-marketing-agencies/${id}`);
  return response.data;
};
