(function (win, $) {
  class Circle {
    item = "";
    constructor() {
      this.item = $('<div class="circle"/>');
    }

    tint(color) {
      this.item.css({ background: color });
    }

    move() {
      this.item.css("left", left);
      this.item.css("top", top);
    }

    get() {
      return this.item;
    }
  }

  class RedCircleBuilder {
    item = new Circle();
    init() {}
    get() {
      return this.item;
    }
  }

  class BlueCircleBuilder {
    constructor() {
      this.item = new Circle();
      this.init();
    }
    init() {
      this.item.tint("blue");
    }
    get() {
      return this.item;
    }
  }

  class CircleFactory {
    types = {};
    create(type) {
      // here is possible to make something in all circles
      return new this.types[type]().get();
    }
    register(type, cls) {
      // test if the interface is a circle
      if (cls.prototype.init && cls.prototype.get) {
        this.types[type] = cls;
      }
    }
  }

  var CircleGeneratorSingleton = (function () {
    var instance;

    function init() {
      var _aCircle = [];
      var _stage = $(".advert");
      var _cf = new CircleFactory();
      _cf.register("red", RedCircleBuilder);
      _cf.register("blue", BlueCircleBuilder);

      console.log("function init was been called only one time");

      function _position(circle, left, top) {
        circle.css("left", left);
        circle.css("top", top);
      }

      function create(left, top, type) {
        var circle = _cf.create(type).item;
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
