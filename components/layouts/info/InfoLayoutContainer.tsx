"use client";

import { InfoLayout } from ".";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useStoreContext } from "components/providers/StoreProvider";

import { ReactChildren } from "interfaces/components/shared.interface";

export default function InfoLayoutContainer({ children }: ReactChildren) {
  const router = useRouter(),
    { deviceSize } = useStoreContext().layout,
    [activeRoute, setActiveRoute] = useState("");

  useEffect(() => {
    autoCompleteHandler(location.pathname);
  }, []);

  const autoCompleteHandler = (path: string) => {
    if (path) {
      router.push(path);
      setActiveRoute(path);
    }
  };

  return (
    <InfoLayout activeRoute={activeRoute} deviceWidth={deviceSize.width} autoCompleteHandler={autoCompleteHandler}>
      {children}
    </InfoLayout>
  );
}
