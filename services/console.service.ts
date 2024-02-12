import { service, baseServiceUrl } from ".";

import { ContactUsPayload } from "interfaces/services/console.interface";

const baseURL = baseServiceUrl.consoleService;

export const contactUsService = async (payload: ContactUsPayload) => {
  const response = await service.post(baseURL + "/contact-us", payload);
  return response.data;
};
