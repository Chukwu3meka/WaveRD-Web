"use client";

import validator from "utils/validator";
import ConsoleService from "services/console.service";

import { connect } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ObjectEntries, capitalize } from "utils/helpers";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import { EndpointForm, InvalidEndpoint, SuccessDialog } from ".";
import { RootState } from "interfaces/redux-store/store.interface";
import { ENDPOINTS_SNIPPETS, INIT_PROFILE } from "utils/constants";
import { Theme } from "interfaces/components/others/layouts.interface";
import { ConsoleEndpointContainerProps, ConsoleEndpointProps } from "interfaces/components/console/apihub.interface";

const snippets = ENDPOINTS_SNIPPETS.map((title) => ({ title, code: "" }));

const consoleService = new ConsoleService(),
  initConsoleEndpointForm: ConsoleEndpointProps["formData"] = {
    path: { value: "", valid: true, info: "API Path cannot be empty" },
    method: { value: "", valid: true, info: "Method cannot be empty" },
    snippet: { value: "", valid: true, info: "Snippet cannot be empty" },
    category: { value: "", valid: true, info: "Category cannot be empty" },
    description: { value: "", valid: true, info: "Description cannot be empty" },
    title: { value: "", valid: true, info: "Title cannot be empty", validating: false },
    options: { response: null, composing: false, snippets, latency: "0.00", saving: false },
  };

const ConsoleEndpointContainer = (props: ConsoleEndpointContainerProps) => {
  if (!props.endpoint && props.exists) return <InvalidEndpoint />;

  const router = useRouter(),
    [theme, setTheme] = useState<Theme>(INIT_PROFILE.theme),
    [showSuccessDialog, setShowSuccessDialog] = useState(false),
    [formData, setFormData] = useState<ConsoleEndpointProps["formData"]>(initConsoleEndpointForm);

  useEffect(() => {
    if (props.endpoint) {
      onSelectChange({ target: { id: "method", value: props.endpoint.method } });
      onInputChange({ target: { id: "title", value: props.endpoint.title } }, true);
      onSelectChange({ target: { id: "category", value: props.endpoint.category } });
      onInputChange({ target: { id: "description", value: props.endpoint.description } }, true);
      onInputChange({ target: { id: "path", value: props.endpoint.path.replace(`${process.env.STABLE_VERSION}/public/`, "") } }, true);

      // get snippets already saved to this endpoint
      // map it through current list of snippets in client
      // attach db snippet to client, and set client snippets as ""
      // This will allow users add snippets to recently added sclient snippets that were not available at the time API was modified/created
      const snippets = ENDPOINTS_SNIPPETS.map((title) => {
        const propsSnippets = props.endpoint?.snippets;
        if (!propsSnippets) return { title, code: "" };

        const snippet = propsSnippets.find((snippet) => snippet.title === title);
        if (!snippet) return { title, code: "" };

        return snippet;
      });

      setFormData((formData) => ({ ...formData, options: { ...formData.options, snippets } }));
    }
  }, [props.endpoint]);

  useEffect(() => {
    if (props.theme) setTheme(props.theme);
  }, [props.theme]);

  useEffect(() => {
    // Reset latency and sample response on method/path change
    setFormData((formData) => ({ ...formData, options: { ...formData.options, latency: "0.00", response: null } }));
  }, [formData.path.value, formData.method.value]);

  const updateSnippet = (value: string, onBlur: boolean) => {
    const title = formData.snippet.value;
    if (!title && !onBlur) return enqueueSnackbar("Kindly, select a snippet type to proceed", { variant: "error" });

    setFormData((values) => ({
      ...values,
      options: {
        ...values.options,
        snippets: formData.options.snippets.map((snippet) => ({ ...snippet, code: snippet.title === title ? value : snippet.code })),
      },
    }));
  };

  // const onSelectChange = async (e: React.FocusEvent<HTMLSelectElement>) => {
  const onSelectChange = async (e: any) => {
    type FormDataValuesKey = "snippet" | "category" | "method";

    const value = e.target.value,
      id = (e.target.id || e.target.name) as FormDataValuesKey;

    setFormData((values) => ({ ...values, [id]: { ...values[id], value } }));
  };

  // const onInputChange = async (e: React.FocusEvent<HTMLInputElement>, onBlur: boolean) => {
  const onInputChange = async (e: any, onBlur: boolean) => {
    type FormDataValuesKey = "path" | "description" | "title";

    const tempValue = e.target.value,
      value = onBlur ? tempValue.trim() : tempValue,
      id = (e.target.id || e.target.name) as FormDataValuesKey;

    setFormData((values) => ({ ...values, [id]: { ...values[id], value } }));

    try {
      validator({ value, type: "comment", label: capitalize(id) });

      setFormData((values) => ({ ...values, [id]: { ...values[id], value, valid: true, info: null } }));

      closeSnackbar();

      if ("title" === id) {
        // Don't validate title if user has the title as what was on the backend
        if (value === props.endpoint?.title) {
          setFormData((values) => ({ ...values, title: { ...values.title, valid: true, info: null, validating: false } }));
        } else {
          setFormData((values) => ({ ...values, title: { ...values.title, valid: false, info: "Title validation in progress", validating: true } }));

          await consoleService.endpointTitleExists({ title: value }).then(async ({ success, message, data: { exists } }) => {
            if (success) {
              if (exists) throw { message: `Title not available, Kindly use a different Title` };
              setFormData((values) => ({ ...values, title: { ...values.title, valid: true, info: null, validating: false } }));
            } else {
              setFormData((values) => ({ ...values, title: { ...values.title, valid: false, info: message, validating: false } }));
            }
          });
        }
      }
    } catch ({ message }: any) {
      const errorMessage = message || `Could not validate ${id}`;
      setFormData((values) => ({ ...values, [id]: { value, valid: false, info: errorMessage } }));

      if (onBlur && formData[id].value) {
        // ?  Notify user if onBlur when there's an error with the value
        enqueueSnackbar(errorMessage, { variant: "error" }); // <=  Inform user of regex error

        return; // <= terminate parent function execution
      }
    }
  };

  const composeEndpoint = async () => {
    const path = formData.path.value,
      method = formData.method.value;

    try {
      if (!path) throw { message: "Path cannot be empty" };
      if (!method) throw { message: "Method cannot be empty" };
      if (path.startsWith("/")) throw { message: "API Path cannot start with slash `/`. " };

      validator({ value: path, type: "comment" });
    } catch ({ message }: any) {
      // ?  Notify user if onBlur when there's an error with the value
      enqueueSnackbar(message || "Unable to compose API", { variant: "error" }); // <=  Inform user of regex error

      return; // <= terminate parent function execution
    }

    setFormData((values) => ({ ...values, options: { ...values.options, composing: true } }));

    await consoleService
      .composeEndpoint({ method, path: `${process.env.STABLE_VERSION}/public/` + path })
      .then(async ({ success, data, message }) => {
        if (success) {
          enqueueSnackbar(message, { variant: "success" });
          setFormData((values) => ({ ...values, options: { ...values.options, composing: false, response: data.response, latency: data.latency } }));
        } else {
          enqueueSnackbar(message || "An error occurred", { variant: "error" });
          setFormData((values) => ({ ...values, options: { ...values.options, composing: false, response: null, latency: "0.00" } }));
        }
      });
  };

  const saveEndpoint = async () => {
    try {
      setFormData((values) => ({ ...values, options: { ...values.options, saving: true } }));

      if (formData.options.composing) throw { message: "Kindly wait while API is being composed" };
      if (formData.title.validating) throw { message: "Kindly wait while title is being validated" };
      if (!formData.options.response || !formData.options.latency) throw { message: "API/Endpoint not yet composed" };

      for (const [key, value] of ObjectEntries(formData)) {
        const data = value as any;

        if (!["options", "snippet"].includes(key)) {
          if (!data?.valid) throw { message: `${capitalize(key)} is invalid` };
          if (!data?.value) throw { message: `${capitalize(key)} cannot be empty` };
        }
      }

      if (!Array.isArray(formData.options.snippets)) throw { message: "Snippet is not an array" };

      // get only snippets that are visible in the client
      // remove db snippet that has been deleted from client
      // This will allow users add only snippets that are currently visible while editing
      // so if Curl snippet was saved to DB and has been deleted from Client, It wont be sent back to server to be saved again
      const snippets = ENDPOINTS_SNIPPETS.map((title) => {
        const formSnippets = formData.options.snippets;
        if (!formSnippets) return { title, code: "" };

        const snippet = formSnippets.find((snippet) => snippet.title === title);
        if (!snippet) return { title, code: "" };

        return snippet;
      }).filter((snippet) => Boolean(snippet.code));

      if (snippets.length <= 3) throw { message: "Add at least Three Snippets to proceed" };

      for (const snippet of formData.options.snippets) {
        validator({ value: snippet.code, type: "comment", label: snippet.title + " Snippet Code" });
        validator({ value: snippet.title, type: "comment", label: snippet.title + " Snippet Title" });
      }

      await consoleService
        .saveEndpoint({
          snippets,
          title: formData.title.value,
          method: formData.method.value,
          category: formData.category.value,
          description: formData.description.value,
          id: props.endpoint ? props.endpoint.id : "new",
          path: `${process.env.STABLE_VERSION}/public/` + formData.path.value,
        })
        .then(async ({ success, message }) => {
          if (success) {
            setShowSuccessDialog(true);
            setFormData(initConsoleEndpointForm);
          } else {
            throw { message: message || "An error occurred" };
          }
        });
    } catch (err: any) {
      enqueueSnackbar(err?.message || err, { variant: "error" });
      setFormData((values) => ({ ...values, options: { ...values.options, saving: false } }));
    }
  };

  const toggleShowSuccessDialog = () => {
    setShowSuccessDialog(false);
    if (props.exists) router.back();
  };

  return (
    <main>
      <EndpointForm
        theme={theme}
        formData={formData}
        exists={props.exists}
        saveEndpoint={saveEndpoint}
        onInputChange={onInputChange}
        updateSnippet={updateSnippet}
        onSelectChange={onSelectChange}
        composeEndpoint={composeEndpoint}
      />

      <SuccessDialog open={showSuccessDialog} handleClose={toggleShowSuccessDialog} exists={props.exists} />
    </main>
  );
};

const mapStateToProps = (state: RootState) => ({ theme: state.account.profile.theme }),
  mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ConsoleEndpointContainer);
