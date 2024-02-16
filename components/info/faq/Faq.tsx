"use client";

import ComingSoonContainer from "components/shared/coming-soon";
import { useStoreContext } from "components/providers/StoreProvider";

export default function FAQ() {
  const {
    deviceSize: { width: deviceWidth },
  } = useStoreContext().layout;

  return <ComingSoonContainer minHeight={`calc(var(--visibleScreen) - var(--headerHeight) - ${deviceWidth >= 1200 ? "0px" : "90px"})`} />;
}
