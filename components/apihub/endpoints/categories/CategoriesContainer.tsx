"use client";

import { CategoriesView } from ".";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "interfaces/redux-store/store.interface";
import { CategoriesContainerProps, Category } from "interfaces/components/apihub/endpoints.interface";
import { setEndpointsParamAction } from "redux-store/actions";

const CategoriesContainer = (props: CategoriesContainerProps) => {
  const { setEndpointsParamAction } = props,
    [selected, setSelected] = useState(""),
    [categories, setCategories] = useState<Category[]>([]),
    [displayHeader, setDisplayHeader] = useState(!!props.displayHeader),
    [showTopCategories, setShowTopCategories] = useState((props.deviceWidth || 0) > 900);

  useEffect(() => {
    if (props.endpoints && props.endpoints.filter === "category") {
      setSelected(props.endpoints.phrase);
    }
  }, [props.endpoints]);

  useEffect(() => {
    setCategories(props.categories);
  }, [props.categories]);

  useEffect(() => {
    setShowTopCategories(props.deviceWidth > 1200);
  }, [props.deviceWidth]);

  useEffect(() => {
    setDisplayHeader(props.displayHeader);
  }, [props.displayHeader]);

  const switchCategory = (category: string) => () => {
    if (setEndpointsParamAction) setEndpointsParamAction({ filter: "category", phrase: category });
  };

  return (
    <CategoriesView
      selected={selected}
      categories={categories}
      displayHeader={displayHeader}
      switchCategory={switchCategory}
      showTopCategories={showTopCategories}
    />
  );
};

const mapStateToProps = (state: RootState) => ({
    endpoints: state.endpoints,
    deviceWidth: state.layout.width,
    displayHeader: state.layout.displayHeader,
  }),
  mapDispatchToProps = { setEndpointsParamAction };

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesContainer);
