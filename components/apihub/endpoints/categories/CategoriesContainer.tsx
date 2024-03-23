"use client";

import { CategoriesView } from ".";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "interfaces/redux-store/store.interface";
import { CategoriesContainerProps, Category } from "interfaces/components/apihub.interface";

const CategoriesContainer = (props: CategoriesContainerProps) => {
  const [categories, setCategories] = useState<Category[]>([]),
    [showMenu, setShowMenu] = useState((props.deviceWidth || 0) > 900),
    [displayHeader, setDisplayHeader] = useState(!!props.displayHeader);

  useEffect(() => {
    setCategories(props.categories);
  }, [props.categories]);

  useEffect(() => {
    setShowMenu(props.deviceWidth > 900);
  }, [props.deviceWidth]);

  useEffect(() => {
    setDisplayHeader(props.displayHeader);
  }, [props.displayHeader]);

  return <CategoriesView showMenu={showMenu} categories={categories} displayHeader={displayHeader} />;
};

const mapStateToProps = (state: RootState) => ({
    deviceWidth: state.layout.width,
    displayHeader: state.layout.displayHeader,
  }),
  mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesContainer);
