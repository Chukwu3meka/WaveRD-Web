"use client";

import { CategoriesView } from ".";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "interfaces/redux-store/store.interface";
import { CategoriesContainerProps, Category } from "interfaces/components/apihub.interface";

const CategoriesContainer = (props: CategoriesContainerProps) => {
  const [categories, setCategories] = useState<Category[]>([]),
    [displayHeader, setDisplayHeader] = useState(!!props.displayHeader),
    [showTopCategories, setShowTopCategories] = useState((props.deviceWidth || 0) > 900);

  useEffect(() => {
    setCategories(props.categories);
  }, [props.categories]);

  useEffect(() => {
    setShowTopCategories(props.deviceWidth > 1200);
  }, [props.deviceWidth]);

  useEffect(() => {
    setDisplayHeader(props.displayHeader);
  }, [props.displayHeader]);

  return <CategoriesView showTopCategories={showTopCategories} categories={categories} displayHeader={displayHeader} />;
};

const mapStateToProps = (state: RootState) => ({
    deviceWidth: state.layout.width,
    displayHeader: state.layout.displayHeader,
  }),
  mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesContainer);
