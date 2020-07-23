(function (win, $) {
  var RedCircle = function () {
    this.item = $('<div class="circle"/>');
  };
  var BlueCircle = function () {
    this.item = $('<div class="circle" style="background:blue"/>');
  };
  // var CircleFactory = function () {
  //   this.create = function (color) {
  //     if (color === "blue") {
  //       return new BlueCircle();
  //     } else {
  //       return new RedCircle();
  //     }
  //   };
  // };
  class CircleFactory {
    create(color) {
      if (color === "blue") {
        return new BlueCircle();
      } else {
        return new RedCircle();
      }
    }
  }

  var CircleGeneratorSingleton = (function () {
    var instance;

    function init() {
      var _aCircle = [];
      var _stage = $(".advert");
      var _cf = new CircleFactory();

      console.log("function init was been called only one time");

      function _position(circle, left, top) {
        circle.css("left", left);
        circle.css("top", top);
      }

      function create(left, top, color) {
        var circle = _cf.create(color).item;
        _position(circle, left, top);
        return circle;
      }

      function add(circle) {
        _stage.append(circle);
        _aCircle.push(circle);
      }

      function index() {
        return _aCircle.length;
      }

      return {
        index,
        create,
        add,
      };
    }

    return {
      getInstance: function () {
        if (!instance) {
          instance = init();
        }
        return instance;
      },
    };
  })();

  $(win.document).ready(function () {
    $(".advert").click(function (e) {
      var cg = CircleGeneratorSingleton.getInstance();
      var circle = cg.create(e.pageX - 25, e.pageY - 25, "red");
      cg.add(circle);
      // Same that c = new CircleGenerator();
    });
    $(document).keypress(function () {
      //same object
      var cg = CircleGeneratorSingleton.getInstance();
      var circle = cg.create(
        Math.floor(Math.random() * 600),
        Math.floor(Math.random() * 600),
        "blue"
      );
      console.log(cg.index());
      // here it's possible see that the index is changed by the 2 objects
      cg.add(circle);
    });
  });
})(window, jQuery);

// Enable us have more control on constomizing an item
