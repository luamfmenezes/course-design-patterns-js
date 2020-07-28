(function (win, $) {
  Rectangle1 = function () {
    var test = 3;
    this.setTest = function () {
      this.test = 4;
    };
  };

  class Rectangle2 {
    test = 3;
    setTest() {
      this.test = 4;
    }
  }

  // function equivalent
  function createCircle() {
    const test = {
      status: "unselected",
    };
    function select() {
      test.status = "selected";
    }
    function getCircle() {
      return circle;
    }
    return {
      test,
      select,
    };
  }

  $(win.document).ready(function () {
    const circle1 = createCircle();
    const circle2 = createCircle();
    circle1.select();
    console.log(circle1.test, circle2.test);
    // seted , unseted

    const rectangle21 = new Rectangle2();
    const rectangle22 = new Rectangle2();
    rectangle22.setTest(4);
    console.log(rectangle21.test, rectangle22.test);
    console.log(rectangle21);
    // 3 , 4
  });
})(window, jQuery);
