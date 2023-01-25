const signinFormMouseMoveCapture = () => {
  const signin = document.getElementById("signin")!;
  // signin = document.getElementById("signin")!; // <= ! tell typescript its always defined
  // bg = document.getElementById("bg")!;

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
      this._x = e.offsetLeft + Math.floor(e.offsetWidth / 2);
      this._y = e.offsetTop + Math.floor(e.offsetHeight / 2);
    },
    show: function () {
      return "(" + this.x + ", " + this.y + ")";
    },
  };

  // Track the mouse position relative to the center of the signin.
  mouse.setOrigin(signin);

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
    signin.setAttribute("style", "");
    // bg.setAttribute("style", "");
    // signin.style = "";
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
    updateTransformStyle((mouse.y / signin.offsetHeight / 2).toFixed(2), (mouse.x / signin.offsetWidth / 2).toFixed(2));
  };

  const updateTransformStyle = function (x: any, y: any) {
    var style = "rotateX(" + x + "deg) rotateY(" + y + "deg)";
    signin.style.transform = style;
    // signin.style.mozTransform = style;
    // signin.style.msTransform = style;
    // signin.style.oTransform = style;
    // bg.style.backgroundSize = "calc(100vw + 50px) 170%";
    // bg.style.backgroundImage = `url('${process.env.CLIENT_URL}/images/signin-hover-background.jpg')`;
    // bg.style.backgroundSize = "calc(100vw + 300px) 110vh";
    // bg.style.backgroundPositionX = "-300px";
  };

  //-----------------------------------------

  signin.onmouseenter = onMouseEnterHandler;
  signin.onmouseleave = onMouseLeaveHandler;
  signin.onmousemove = onMouseMoveHandler;
};

export { signinFormMouseMoveCapture };
