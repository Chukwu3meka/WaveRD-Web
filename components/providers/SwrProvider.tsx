"use client";

import { SWRConfig, SWRConfiguration } from "swr";
import { ReactChildren } from "interfaces/components/shared.interface";

const swrConfigOptions: SWRConfiguration = {};

const SwrProvider = ({ children }: ReactChildren) => <SWRConfig value={swrConfigOptions}>{children}</SWRConfig>;

export default SwrProvider;
