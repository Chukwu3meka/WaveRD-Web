import service, { consoleServiceUrl } from ".";

import { ContactUsPayload } from "interfaces/services/console.interface";

const consoleService = {
  contactUs: async (payload: ContactUsPayload) => {
    const response = await service.post(consoleServiceUrl + "/contact-us", payload);
    return response.data;
  },
};

export default consoleService;
