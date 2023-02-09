import fetcher from "@utils/fetcher";
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

export const loginHandler = async ({ setValues, values, enqueueSnackbar }: any) => {
  setValues((values: any) => ({ ...values, buttonLoading: true })); // activate botton loading

  const email = values.email.trim();
  const password = values.password.trim();

  try {
    validator({ value: email, type: "email" });
    validator({ value: password, type: "password" });
  } catch (error) {
    await sleep(0.2);
    setValues((values: any) => ({ ...values, buttonLoading: false })); // deactivate botton loading
    return enqueueSnackbar("Invalid Email/Password", { variant: "error" }); // <=  Don't inform user of regex error
  }

  await fetcher({
    api: "accounts",
    method: "POST",
    endpoint: "/personal/auth",
    payload: { email, password },
  })
    .then(({ payload: { token } }) => {
      // console.log(token);

      // setCookie("SoccerMASS", token, {
      //   path: "/",
      //   httpOnly: true,
      //   domain: ".localhost:5000",
      //   secure: process.env.NODE === "production", // Setting a cookie without Secure will be rejected.
      //   sameSite: process.env.NODE === "production" ? "strict" : "lax", // <= SameSite=None must be secure
      //   expires: new Date(new Date().getTime() + 3600000 * 24 * 120), // <= expires in 120 days,
      // secure: false,

      // // domain: req.headers.origin?.replace("http://", ".")?.replace("https://", ".")?.replace(/:\d+/, ""),
      // domain: req.headers.origin?.replace("http://", "")?.replace("https://", "")?.replace(/:\d+/, ""),

      // // domain: `.${process.env.SERVER_DOMAIN}`,
      // expires: nTimeFromNowFn({ context: "days", interval: 120 }),
      // httpOnly: true,
      // // signed: true,
      // });

      // set redux auth store
      enqueueSnackbar("Authenticated Successfully", { variant: "success" });
    })
    .catch(() => enqueueSnackbar("Invalid Email/Password", { variant: "error" }))
    .finally(() => setValues((values: any) => ({ ...values, buttonLoading: false }))); // deactivate botton loading
};

export const onInputChange = (e: React.FocusEvent<HTMLInputElement>, setValues: Function) => {
  const { value, id } = e.target;
  setValues((values: any) => ({ ...values, [id]: value }));
};
