const signinFormMouseMoveCapture = () => {
  const signinRef = document.getElementById("signin")!;

  const mouse = {
    _x: 0,
    _y: 0,
    x: 0,
    y: 0,
    updatePosition: function (event: MouseEvent) {
      var e = event || window.event;
      this.x = (e.clientX - this._x) * 2;
      this.y = (e.clientY - this._y) * -2;
    },
    setOrigin: function (e: any) {
      this._x = e.offsetLeft + Math.floor(e.offsetWidth / 0.5);
      this._y = e.offsetTop + Math.floor(e.offsetHeight / 2);
    },
    show: function () {
      return "(" + this.x + ", " + this.y + ")";
    },
  };

  // Track the mouse position relative to the center of the signinRef.
  mouse.setOrigin(signinRef);

  //-----------------------------------------

  var counter = 0;
  var updateRate = 10;
  var isTimeToUpdate = function () {
    return counter++ % updateRate === 0;
  };

  //-----------------------------------------

  const onMouseEnterHandler = function (event: MouseEvent) {
    update(event);
  };

  const onMouseLeaveHandler = function () {
    signinRef.setAttribute("style", "");
    // bg.setAttribute("style", "");
    // signinRef.style = "";
    // bg.style = "";
  };

  const onMouseMoveHandler = function (event: MouseEvent) {
    if (isTimeToUpdate()) {
      update(event);
    } else {
      updateTransformStyle((0).toFixed(2), (0).toFixed(2)); // => reset div
    }
  };

  //-----------------------------------------

  const update = function (event: MouseEvent) {
    mouse.updatePosition(event);
    updateTransformStyle((mouse.y / signinRef.offsetHeight / 2).toFixed(2), (mouse.x / signinRef.offsetWidth / 2).toFixed(2));
  };

  const updateTransformStyle = function (x: any, y: any) {
    var style = "rotateX(" + x + "deg) rotateY(" + y + "deg)";
    signinRef.style.transform = style;
    // signinRef.style.mozTransform = style;
    // signinRef.style.msTransform = style;
    // signinRef.style.oTransform = style;
    // bg.style.backgroundSize = "calc(100vw + 50px) 170%";
    // bg.style.backgroundImage = `url('${process.env.CLIENT_URL}/images/signinRef-hover-background.jpg')`;
    // bg.style.backgroundSize = "calc(100vw + 300px) 110vh";
    // bg.style.backgroundPositionX = "-300px";
  };

  //-----------------------------------------

  signinRef.onmouseenter = onMouseEnterHandler;
  signinRef.onmouseleave = onMouseLeaveHandler;
  signinRef.onmousemove = onMouseMoveHandler;
};

export { signinFormMouseMoveCapture };
