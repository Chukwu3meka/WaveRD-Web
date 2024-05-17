"use client";

import { ConsoleEndpoint } from ".";
import { useEffect, useRef, useState } from "react";
import ConsoleService from "services/console.service";
import { ConsoleEndpointsProps, ConsoleEndpointContainerProps, ConsoleEndpointProps } from "interfaces/components/console/apihub.interface";
import validator from "utils/validator";
import { CATEGORIES, ENDPOINTS_SNIPPETS, INIT_PROFILE } from "utils/constants";
import { capitalize } from "utils/helpers";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import { AxiosError } from "axios";
import { ApiResponse } from "interfaces/services/shared.interface";
import { RootState } from "interfaces/redux-store/store.interface";
import { connect } from "react-redux";
import { Theme } from "interfaces/components/others/layouts.interface";

const snippets = ENDPOINTS_SNIPPETS.map((snippet) => ({ ...snippet, snippet: "" }));

const ConsoleEndpointContainer = (props: ConsoleEndpointContainerProps) => {
  const { endpoint } = props,
    consoleService = new ConsoleService(),
    initConsoleEndpointForm: ConsoleEndpointProps["formData"] = {
      // select
      method: { value: "", valid: true, info: "Method cannot be empty" },
      snippet: { value: "", valid: true, info: "Snippet cannot be empty" },
      category: { value: "", valid: true, info: "Category cannot be empty" },

      // input
      path: { value: "", valid: true, info: "API Path cannot be empty" },
      description: { value: "", valid: true, info: "Description cannot be empty" },
      title: { value: "", valid: true, info: "Title cannot be empty", validating: false },

      options: { response: null, composing: false, snippets, latency: "0.00" },
    };

  const [theme, setTheme] = useState<Theme>(INIT_PROFILE.theme),
    [formData, setFormData] = useState<ConsoleEndpointProps["formData"]>(initConsoleEndpointForm);

  useEffect(() => {
    if (props.theme) setTheme(props.theme);
  }, [props.theme]);

  const updateSnippet = (value: string, onBlur: boolean) => {
    const id = formData.snippet.value;
    if (!id && !onBlur) return enqueueSnackbar("Kindly, select a snippet type to proceed", { variant: "error" });

    setFormData((values) => ({
      ...values,
      options: {
        ...values.options,
        snippets: formData.options.snippets.map((snippet) => ({ ...snippet, snippet: snippet.id === id ? value : snippet.snippet })),
      },
    }));

    if (onBlur) {
      try {
        validator({ value, type: "comment" });
      } catch ({ message }: any) {
        // Inform user of regex error
        enqueueSnackbar(message || "Could not validate this input", { variant: "error" });
      }
    }
  };

  const onSelectChange = async (e: React.FocusEvent<HTMLSelectElement>) => {
    type FormDataValuesKey = "snippet" | "category" | "method";

    const value = e.target.value,
      id = (e.target.id || e.target.name) as FormDataValuesKey;

    setFormData((values) => ({ ...values, [id]: { ...values[id], value } }));
  };

  const onInputChange = async (e: React.FocusEvent<HTMLInputElement>, onBlur: boolean) => {
    type FormDataValuesKey = "category" | "path" | "method" | "description" | "options" | "title";

    const tempValue = e.target.value,
      value = onBlur ? tempValue.trim() : tempValue,
      id = (e.target.id || e.target.name) as FormDataValuesKey;

    if (id === "options") return;

    // ? Don't revalidate input if user has not made change to previous value
    if (onBlur && formData[id].value) {
      // ?  Notify user if onBlur when there's an error with the value
      if (!formData[id].valid) return enqueueSnackbar(formData[id].info, { variant: "error" });

      return; // <= terminate parent function execution
    }

    // console.log({ id, value });

    setFormData((values) => ({ ...values, [id]: { ...values[id], value } }));

    try {
      validator({ value, type: "comment" });

      if ("title" === id) {
        setFormData((values) => ({
          ...values,
          ["title"]: { ...values.title, valid: false, info: `Validating ${capitalize(id)}`, validating: true },
        }));

        await consoleService
          .endpointTitleExists({ title: value })
          .then(async ({ data: { exists } }) => {
            if (exists) throw { message: `Title not available, Kindly use a different Title` };
            setFormData((values) => ({ ...values, title: { ...values.title, valid: true, info: null, validating: false } }));
          })
          .catch(({ message: apiRes }) => {
            const message = apiRes || "An error occurred";
            setFormData((values) => ({ ...values, title: { ...values["title"], valid: false, info: message, validating: false } }));

            throw { message };
          });
      } else {
        setFormData((values) => ({ ...values, title: { ...values["title"], valid: true, info: null } }));
      }

      closeSnackbar(); // <= hide any error that have been shown previously
    } catch ({ message }: any) {
      if (onBlur) enqueueSnackbar(message || "Could not validate this input", { variant: "error" }); // <=  Inform user of regex error

      setFormData((values) => ({ ...values, [id]: { ...values[id], valid: false, info: message || `Unable to validate ${id}`, validating: false } }));
    }
  };

  const composeEndpoint = async () => {
    // // ? Don't revalidate input if user has not made change to previous value
    // if (onBlur && formData[id].value) {
    //   // ?  Notify user if onBlur when there's an error with the value
    //   if (!formData[id].valid) return enqueueSnackbar(formData[id].info, { variant: "error" });

    //   return; // <= terminate parent function execution
    // }

    // // console.log({ id, value });

    const path = "v1/hub" + formData.path.value,
      method = formData.method.value;

    // setFormData((values) => ({ ...values, [id]: { ...values[id], value } }));

    // validator({ value, type: "comment" });

    await consoleService
      .endpointTitleExists({ title: value })
      .then(async ({ data: { exists } }) => {
        if (exists) throw { message: `Title not available, Kindly use a different Title` };
        setFormData((values) => ({ ...values, title: { ...values.title, valid: true, info: null, validating: false } }));
      })
      .catch(({ message: apiRes }) => {
        const message = apiRes || "An error occurred";
        setFormData((values) => ({ ...values, title: { ...values["title"], valid: false, info: message, validating: false } }));

        throw { message };
      });
  };

  // { toggleShowEndpoint } = props,
  // [id, setId] = useState(""),
  // [filter, setFilter] = useState(""),
  // [searching, setSearching] = useState(false),
  // tableRef: ConsoleEndpointsProps["tableRef"] = useRef(null);

  // useEffect(() => {
  //   // console.log();
  //   // setId
  //   console.log(props.id);
  // }, [props.id]);

  // console.log(endpoint, categories);
  // console.log(endpoint);

  return (
    <ConsoleEndpoint formData={formData} theme={theme} onInputChange={onInputChange} onSelectChange={onSelectChange} updateSnippet={updateSnippet} />
  );
};

const mapStateToProps = (state: RootState) => ({
    theme: state.account.profile.theme,
  }),
  mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ConsoleEndpointContainer);
