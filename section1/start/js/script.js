// Module Patter - the variables are no acessable from outside of the module
// underscore is used to define what should be private
var chatModuleReveal = (function () {
  var _leadself = "Me: ",
    _leadcomputer = "PC: ",
    _aSaid = ["This is a Cyber Chat"],
    _msgYes = "Yes, that's a great idea.",
    _msgNo = "No, that must be a mistake.",
    _aSassyStuff = [
      "Like mold on books, grow myths on history.",
      "She moved like a poem and smiled like a sphinx.",
      "As long as we don’t die, this is gonna be one hell of a story.",
      "She laughed, and the desert sang.",
      "You’ve got about as much charm as a dead slug.",
    ];

  function _echo(msg) {
    _aSaid.push("<div>" + msg + "</div>");

    var out = _aSaid.slice(-6).join("");

    $(".advert").html(out);

    $("#talk span").text(msg);
  }

  function talk(msg) {
    _echo(_leadself + msg);
  }

  function replayYesNo() {
    var msg = Math.random() > 0.5 ? _msgYes : _msgNo;
    _echo(_leadcomputer + msg);
  }

  function saySassyStuff() {
    var msg = _aSassyStuff[Math.floor(Math.random() * _aSassyStuff.length)];
    _echo(msg);
  }

  return {};
})();

// Module Patter - the variables are no acessable from outside of the module
var chatModule = (function () {
  var leadself = "Me: ",
    leadcomputer = "PC: ",
    aSaid = ["This is a Cyber Chat"],
    msgYes = "Yes, that's a great idea.",
    msgNo = "No, that must be a mistake.",
    aSassyStuff = [
      "Like mold on books, grow myths on history.",
      "She moved like a poem and smiled like a sphinx.",
      "As long as we don’t die, this is gonna be one hell of a story.",
      "She laughed, and the desert sang.",
      "You’ve got about as much charm as a dead slug.",
    ];

  function echo(msg) {
    aSaid.push("<div>" + msg + "</div>");

    var out = aSaid.slice(-6).join("");

    $(".advert").html(out);

    $("#talk span").text(msg);
  }

  return {
    talk: function (msg) {
      echo(leadself + msg);
    },
    replayYesNo: function () {
      var msg = Math.random() > 0.5 ? msgYes : msgNo;
      echo(leadcomputer + msg);
    },
    saySassyStuff: function () {
      var msg = aSassyStuff[Math.floor(Math.random() * aSassyStuff.length)];
      echo(msg);
    },
  };
})();

// Object literal
var chatLiteralObj = {
  leadself: "Me: ",
  leadcomputer: "PC: ",
  aSaid: ["This is a Cyber Chat"],
  msgYes: "Yes, that's a great idea.",
  msgNo: "No, that must be a mistake.",
  aSassyStuff: [
    "Like mold on books, grow myths on history.",
    "She moved like a poem and smiled like a sphinx.",
    "As long as we don’t die, this is gonna be one hell of a story.",
    "She laughed, and the desert sang.",
    "You’ve got about as much charm as a dead slug.",
  ],
  talk: function (msg) {
    this.echo(this.leadself + msg);
  },
  replayYesNo: function () {
    var msg = Math.random() > 0.5 ? this.msgYes : this.msgNo;
    this.echo(msg);
  },
  saySassyStuff: function () {
    var msg = this.aSassyStuff[
      Math.floor(Math.random() * this.aSassyStuff.length)
    ];
    this.echo(this.leadcomputer + msg);
  },
  echo: function (msg) {
    this.aSaid.push("<div>" + msg + "</div>");

    var out = this.aSaid.slice(-6).join("");

    $(".advert").html(out);

    $("#talk span").text(msg);
  },
};

$(document).ready(function () {
  chatModule.talk("This is great");
});
