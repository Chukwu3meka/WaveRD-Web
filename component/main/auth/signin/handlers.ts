export const signinFormMouseMoveCapture = () => {
  const signinRef = document.getElementById("signin")!;

  const mouse = {
    _x: 0,
    _y: 0,
    x: 0,
    y: 0,
    updatePosition: function (event: MouseEvent) {
      var e = event || window.event;
      this.x = (e.clientX - this._x) * 0.5;
      this.y = (e.clientY - this._y) * -1;
    },
    setOrigin: function (e: any) {
      this._x = e.offsetLeft + Math.floor(e.offsetWidth / 0.5);
      this._y = e.offsetTop + Math.floor(e.offsetHeight / 1.7);
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
