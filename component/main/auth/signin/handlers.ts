export const signinFormMouseMoveCapture = () => {
  const signin = document.getElementById("signin")!; // <= ! tell typescript its always defined

  const mouse = {
    _x: 0,
    _y: 0,
    x: 0,
    y: 0,
    updatePosition: function (event: MouseEvent) {
      let e = event || window.event;
      this.x = (e.clientX - this._x) * 1.2;
      this.y = (e.clientY - this._y) * -1.2;
    },
    setOrigin: function (e: any) {
      this._x = e.offsetLeft + Math.floor(e.offsetWidth / 2);
      this._y = e.offsetTop + Math.floor(e.offsetHeight / 2);
    },
    show: function () {
      return "(" + this.x + ", " + this.y + ")";
    },
  };

  mouse.setOrigin(signin); // <= Track the mouse position relative to the center of the formContainer.

  let counter = 0;
  let updateRate = 10;

  const isTimeToUpdate = () => counter++ % updateRate === 0;

  const onMouseEnterHandler = (event: MouseEvent) => update(event);

  const onMouseLeaveHandler = () => signin.setAttribute("style", "");

  const onMouseMoveHandler = function (event: MouseEvent) {
    if (isTimeToUpdate()) {
      update(event);
    } else {
      updateTransformStyle((0).toFixed(2), (0).toFixed(2)); // => reset div
    }
  };

  const update = function (event: MouseEvent) {
    mouse.updatePosition(event);
    updateTransformStyle((mouse.y / signin.offsetHeight / 2).toFixed(2), (mouse.x / signin.offsetWidth / 2).toFixed(2));
  };

  const updateTransformStyle = async function (x: any, y: any) {
    const style = "rotateX(" + x + "deg) rotateY(" + y + "deg)";
    signin.style.transform = style;
  };

  signin.onmouseenter = onMouseEnterHandler;
  signin.onmouseleave = onMouseLeaveHandler;
  signin.onmousemove = onMouseMoveHandler;
};
