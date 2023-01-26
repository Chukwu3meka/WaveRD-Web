import { sleep } from "@utils/handlers";
import validator from "@utils/validator";

export const signinFormMouseMoveCapture = () => {
  const signinRef = document.getElementById("signin")!;

  const mouse = {
    _x: 0,
    _y: 0,
    x: 0,
    y: 0,
    updatePosition: function (event: MouseEvent) {
      const e = event || window.event;
      this.x = (e.clientX - this._x) * 2;
      this.y = (e.clientY - this._y) * -2;
      // this.x = e.clientX - this._x;
      // this.y = e.clientY - this._y;
    },
    setOrigin: function (e: any) {
      this._x = e.offsetLeft + Math.floor(e.offsetWidth / 2);
      this._y = e.offsetTop + Math.floor(e.offsetHeight / 2);
    },
    show: function () {
      return "(" + this.x + ", " + this.y + ")";
    },
  };

  // Track the mouse position relative to the center of the signinRef.
  mouse.setOrigin(signinRef);

  let counter = 0;
  let updateRate = 10;
  const isTimeToUpdate = () => counter++ % updateRate === 0;

  const onMouseEnterHandler = (event: MouseEvent) => update(event);

  const onMouseLeaveHandler = () => signinRef.setAttribute("style", "");

  const onMouseMoveHandler = function (event: MouseEvent) {
    if (isTimeToUpdate()) {
      update(event);
    } else {
      updateTransformStyle((0).toFixed(2), (0).toFixed(2)); // => reset div
    }
  };

  const update = function (event: MouseEvent) {
    mouse.updatePosition(event);
    updateTransformStyle((mouse.y / signinRef.offsetHeight).toFixed(2), (mouse.x / signinRef.offsetWidth).toFixed(2));
  };

  const updateTransformStyle = function (x: any, y: any) {
    console.log();
    const style = "rotateX(" + x + "deg) rotateY(" + y + "deg)";
    signinRef.style.transform = style;
  };

  signinRef.onmouseenter = onMouseEnterHandler;
  signinRef.onmouseleave = onMouseLeaveHandler;
  signinRef.onmousemove = onMouseMoveHandler;
};

export const loginHandler = async ({ setValues, values }: any) => {
  setValues((values: any) => ({ ...values, buttonLoading: true })); // activate botton loading

  const { email, password } = values;
  const notificationResponse = { variant: "", message: "" };
  // const basicAuth = Buffer.from(`${email}:${password}`).toString("base64"); // (Buffer.from("SGVsbG8gV29ybGQ=", 'base64').toString('ascii'))
  // await services
  //   .signin({ basicAuth })
  //   .then(() => {
  //     console.log("success");
  //   })
  //   .catch(() => {
  //     console.log("error");
  //   });

  // await fetch("http://172.29.72.18/travels/api/partner/email/msg?status=FAILED")
  //   .then(async (response) => {
  //     if (!response.ok) throw await response.json();
  //     const a = await response.json();
  //     console.log({ response: a });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // throw err;

  // const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/api/partner/email/msg?status=FAILED`);

  // console.log(data);

  // await apiFetcher({ endpoint: "/partner/bookings", basicAuth })
  //   ?.then((res) => {
  //     if (!res) notificationResponse.variant = "Invalid Server Response, Kindly try again later";
  //     notificationResponse.variant = "success";
  //   })
  //   .catch((err) => {
  //     notificationResponse.variant = "error";
  //     if (err.message === "Failed to fetch") {
  //       notificationResponse.message = "Server can't be reached, Kindly try again later";
  //     } else {
  //       notificationResponse.message = "Invalid Username/Password";
  //     }
  //   });

  // await fetcher("/auth/signin", { basicAuth })
  //   .then((res) => {
  //     if (res.status !== "success") notificationResponse.variant = "Invalid Server Response, Kindly try again later";
  //     notificationResponse.variant = "success";
  //   })
  //   .catch((err) => {
  //     notificationResponse.variant = "error";
  //     if (err.message === "Failed to fetch") {
  //       notificationResponse.message = "Server can't be reached, Kindly try again later";
  //     } else {
  //       notificationResponse.message = "Invalid Username/Password";
  //     }
  //   });

  // if (notificationResponse.variant === "success") {
  //   const authPersist = () => {
  //     setAuthAction({ email, basicAuth });
  //     enqueueSnackbar("Signed in successfully", { variant: "success" });
  //   };

  //   if (Router.asPath !== "/") {
  //     await sleep(1);
  //     Router.push("/").finally(() => authPersist());
  //   } else {
  //     authPersist();
  //   }
  // } else {
  //   await sleep(0.5);
  //   setValues((values: any) => ({ ...values, buttonLoading: false })); // activate botton loading
  //   enqueueSnackbar(notificationResponse.message, { variant: "error" });
  // }
  setValues((values: any) => ({ ...values, buttonLoading: false })); // activate botton loading
};

export const onBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
  const { value, id } = e.target;
  console.log({ value, id });
  // const a = e.target.
  // return "";
  // const validInput = formError[prop] === 1 ? true : false;
  // if (!validInput) enqueueSnackbar(formError.errorMessages, { variant: "error" });
};

export const onInputChange = (e: React.FocusEvent<HTMLInputElement>, setValues: Function, setFormError: Function) => {
  const { value, id } = e.target;
  setValues((values: any) => ({ ...values, [id]: value }));

  setFormError((values: any) => ({ ...values, [id]: { ...values[id], pristine: false, status: "loading" } })); // <= set component state to loading
  try {
    validator({ value, type: id as "email" | "password", label: id === "email" ? "Email Address" : "password" });
    setFormError((values: any) => ({ ...values, [id]: { status: "valid", pristine: false, message: null } }));
  } catch ({ message }) {
    console.log("222dsfdf");
    setFormError((values: any) => ({ ...values, [id]: { status: "invalid", pristine: false, message: message } }));
  }
};
