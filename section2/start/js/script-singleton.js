(function (win, $) {
  var CircleGeneratorSingleton = (function () {
    var instance;

    function init() {
      var _aCircle = [];
      var _stage = $(".advert");

      console.log("function init was been called only one time");

      function _position(circle, left, top) {
        circle.css("left", left);
        circle.css("top", top);
      }

      function create(left, top) {
        var circle = $('<div class="circle"></div>');
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
      var circle = cg.create(e.pageX - 25, e.pageY - 25);
      cg.add(circle);
      // Same that c = new CircleGenerator();
    });
    $(document).keypress(function () {
      //same object
      var cg = CircleGeneratorSingleton.getInstance();
      var circle = cg.create(50, 50);
      console.log(cg.index());
      // here it's possible see that the index is changed by the 2 objects
      cg.add(circle);
    });
  });
})(window, jQuery);

// Delayed instantiation of an object
// This object is instaciated only one time
// Constant interface
