(function (win, $) {
  //   function clone(src, out) {
  //     for (var attr in src.prototype) {
  //       out.prototype[attr] = src.prototype[attr];
  //     }
  //   }

  class Circle {
    item = $('<div class="circle"></div>');
    color(color) {
      this.item.css("background", color);
    }
    move(left, top) {
      this.item.css("left", left);
      this.item.css("top", top);
    }
    get() {
      return this.item;
    }
  }

  class Rectangle extends Circle {
    item = $('<div class="rect"></div>');
  }
  //   clone(Circle, Rectangle);

  class RedCircleBuilder {
    item;
    constructor() {
      this.item = new Circle();
      this.init();
    }
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
      this.item.color("blue");
      var rectangle = new Rectangle();
      rectangle.color("yellow");
      rectangle.move(40, 40);
      this.item.get().append(rectangle.get());
    }
    get() {
      return this.item;
    }
  }

  class ShapeFactory {
    types = {};

    create(type) {
      return new this.types[type]().get();
    }

    register(type, cls) {
      if (cls.prototype.init && cls.prototype.get) {
        this.types[type] = cls;
      }
    }
  }

  var ShapeGeneratorSingleton = (function () {
    var instance;

    function init() {
      var _aCircle = [];
      var _stage;
      var _sf = new ShapeFactory();

      function _position(circle, left, top) {
        circle.move(left, top);
      }

      function registerShape(name, Shape) {
        _sf.register(name, Shape);
      }

      function create(left, top, type) {
        var circle = _sf.create(type);
        circle.move(left, top);
        return circle;
      }

      function setStage(stg) {
        _stage = stg;
      }

      function add(circle) {
        _stage.append(circle.get());
        _aCircle.push(circle);
      }

      function index() {
        return _aCircle.length;
      }

      return { index, create, add, registerShape, setStage };
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
    var shapeGeneratorSingleton = ShapeGeneratorSingleton.getInstance();
    shapeGeneratorSingleton.registerShape("red", RedCircleBuilder);
    shapeGeneratorSingleton.registerShape("blue", BlueCircleBuilder);
    shapeGeneratorSingleton.setStage($(".advert"));

    $(".advert").click(function (e) {
      var circle = shapeGeneratorSingleton.create(
        e.pageX - 25,
        e.pageY - 25,
        "red"
      );
      shapeGeneratorSingleton.add(circle);
    });

    $(document).keypress(function (e) {
      if (e.key == "a") {
        var circle = shapeGeneratorSingleton.create(
          Math.floor(Math.random() * 600),
          Math.floor(Math.random() * 600),
          "blue"
        );

        shapeGeneratorSingleton.add(circle);
      }
    });
  });
})(window, jQuery);
