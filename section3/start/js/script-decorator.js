(function (win, $) {
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

  class StageAdapter {
    constructor(id) {
      this.index = 0;
      this.context = $(id);
      this.signaturePrefix = "stageItem_";
    }
    add(item) {
      ++this.index;
      item.addClass(this.signaturePrefix + this.index);
      this.context.append(item);
    }
    remove(index) {
      this.context.remove("." + this.signaturePrefix + index);
    }
  }

  class Rectangle extends Circle {
    item = $('<div class="rect"></div>');
  }

  function selfDestructDecorator(object) {
    object.item.click(function () {
      object.kill();
    });
    object.kill = function () {
      object.item.remove();
    };
  }

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
      selfDestructDecorator(rectangle);
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

  class CompositeController {
    constructor(items) {
      this.items = items;
    }

    action(act) {
      var args = Array.prototype.slice.call(arguments);
      args.shift();

      for (var item in this.items) {
        this.items[item][act].apply(this.items[item], args);
      }
    }
  }

  class ShapeGeneratorSingleton {
    instance;
    _init() {
      var _aCircle = [];
      var _stage;
      var _sf = new ShapeFactory();
      var _compositeController = new CompositeController(_aCircle);

      function registerShape(name, Shape) {
        _sf.register(name, Shape);
      }

      function create(left, top, type) {
        var circle = _sf.create(type);
        circle.move(left, top);
        return circle;
      }

      function tintAll(color) {
        _compositeController.action("color", color);
      }

      function moveAll(left, top) {
        _compositeController.action("move", left, top);
      }

      const setStage = (stg) => {
        _stage = stg;
      };

      function add(circle) {
        _stage.add(circle.get());
        _aCircle.push(circle);
      }

      function index() {
        return _aCircle.length;
      }

      return { index, create, add, registerShape, setStage, tintAll, moveAll };
    }

    // public
    getInstance = () => {
      if (!this._instance) {
        this._instance = this._init();
      }
      return this._instance;
    };
  }

  $(win.document).ready(function () {
    var shapeGeneratorSingleton = new ShapeGeneratorSingleton().getInstance();
    shapeGeneratorSingleton.registerShape("red", RedCircleBuilder);
    shapeGeneratorSingleton.registerShape("blue", BlueCircleBuilder);
    shapeGeneratorSingleton.setStage(new StageAdapter(".advert"));

    $(".advert").click(function (e) {
      var circle = shapeGeneratorSingleton.create(
        e.pageX - 25,
        e.pageY - 25,
        "red"
      );
      shapeGeneratorSingleton.add(circle);
    });

    $(document).keypress(function (e) {
      if (e.key === "a") {
        var circle = shapeGeneratorSingleton.create(
          Math.floor(Math.random() * 600),
          Math.floor(Math.random() * 600),
          "blue"
        );

        shapeGeneratorSingleton.add(circle);
      } else if (e.key === "t") {
        shapeGeneratorSingleton.tintAll("black");
      } else if (e.key === "j") {
        shapeGeneratorSingleton.moveAll("+=5px", "+=0px");
      } else if (e.key === "k") {
        shapeGeneratorSingleton.moveAll("-=5px", "+=0px");
      }
    });
  });
})(window, jQuery);
