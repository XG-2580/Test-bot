"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Discord = require('discord.js');

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed,
    MessageAttachment = _require.MessageAttachment;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

var fetch = require("node-fetch");

var WIDTH = 15;
var HEIGHT = 15;
var gameBoard = [];
var apple = {
  x: 1,
  y: 1
};
var serverid;
var message;
var curplayer;
var eatable = ["🍏", "🍐", "🍊", "🍋", "🍌", "🍇", "🍒", "🍍", "🥪", "🌯", "🍆", "🍔", "🧄", "🥑", "🌭", "🥫", "🍑"];
var randomemoji;

var SnakeGame =
/*#__PURE__*/
function () {
  function SnakeGame() {
    _classCallCheck(this, SnakeGame);

    this.snake = [{
      x: 5,
      y: 5
    }];
    this.snakeLength = 1;
    this.score = 0;
    this.gameEmbed = null;
    this.inGame = false;

    for (var y = 0; y < HEIGHT; y++) {
      for (var x = 0; x < WIDTH; x++) {
        gameBoard[y * WIDTH + x] = "➕";
      }
    }
  }

  _createClass(SnakeGame, [{
    key: "gameBoardToString",
    value: function gameBoardToString() {
      var str = "";

      for (var y = 0; y < HEIGHT; y++) {
        for (var x = 0; x < WIDTH; x++) {
          if (x == apple.x && y == apple.y) {
            str += randomemoji;
            continue;
          }

          var flag = true;

          for (var s = 0; s < this.snake.length; s++) {
            if (x == this.snake[s].x && y == this.snake[s].y) {
              str += "🟥";
              flag = false;
            }
          }

          if (flag) str += gameBoard[y * WIDTH + x];
        }

        str += "\n";
      }

      return str;
    }
  }, {
    key: "isLocInSnake",
    value: function isLocInSnake(pos) {
      return this.snake.find(function (sPos) {
        return sPos.x == pos.x && sPos.y == pos.y;
      });
    }
  }, {
    key: "newAppleLoc",
    value: function newAppleLoc() {
      var newApplePos = {
        x: 0,
        y: 0
      };

      do {
        newApplePos = {
          x: parseInt(Math.random() * WIDTH),
          y: parseInt(Math.random() * HEIGHT)
        };
      } while (this.isLocInSnake(newApplePos));

      randomemoji = eatable[Math.floor(Math.random() * eatable.length)];
      apple.x = newApplePos.x;
      apple.y = newApplePos.y;
    }
  }, {
    key: "newGame",
    value: function newGame(msg) {
      var _this = this;

      if (this.inGame) return;
      message = msg;
      this.inGame = true;
      this.score = 0;
      this.client = msg.client;
      this.snakeLength = 1;
      this.snake = [{
        x: 5,
        y: 5
      }];
      this.newAppleLoc();
      serverid = msg.guild.id;
      curplayer = msg.author.id;
      var temEmbed = new Discord.MessageEmbed().setColor("#2f3136").setDescription("Preparing Game...").setAuthor('Snake Minigame', "https://imgur.com/1ioYOA0.png", "https://discord.gg/FQGXbypRf8").setTimestamp();
      var embed = new Discord.MessageEmbed().setColor("#2f3136").setAuthor('Snake Minigame', "https://imgur.com/1ioYOA0.png", "https://discord.gg/FQGXbypRf8").setDescription(this.gameBoardToString());
      msg.channel.send(temEmbed).then(function _callee(emsg) {
        return regeneratorRuntime.async(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return regeneratorRuntime.awrap(emsg);

              case 2:
                _this.gameEmbed = _context.sent;
                _context.next = 5;
                return regeneratorRuntime.awrap(_this.gameEmbed.react('⬅️'));

              case 5:
                _context.next = 7;
                return regeneratorRuntime.awrap(_this.gameEmbed.react('➡️'));

              case 7:
                _context.next = 9;
                return regeneratorRuntime.awrap(_this.gameEmbed.react('⬆️'));

              case 9:
                _context.next = 11;
                return regeneratorRuntime.awrap(_this.gameEmbed.react('⬇️'));

              case 11:
                _context.next = 13;
                return regeneratorRuntime.awrap(_this.gameEmbed.edit(embed));

              case 13:
                _context.next = 15;
                return regeneratorRuntime.awrap(_this.waitForReaction());

              case 15:
              case "end":
                return _context.stop();
            }
          }
        });
      });
    }
  }, {
    key: "step",
    value: function step() {
      if (apple.x == this.snake[0].x && apple.y == this.snake[0].y) {
        this.score += 1;
        this.snakeLength++;
        this.newAppleLoc();
      }

      var editEmbed = new Discord.MessageEmbed().setColor("#2f3136").setAuthor('Snake Minigame', "https://imgur.com/1ioYOA0.png", "https://discord.gg/FQGXbypRf8").setDescription(this.gameBoardToString());
      this.gameEmbed.edit(editEmbed);
      this.waitForReaction();
    }
  }, {
    key: "gameOver",
    value: function gameOver() {
      this.inGame = false;
      if (!this.score || this.score === undefined) this.score = 0;
      var client = this.client;
      client.stats.ensure(serverid, {
        "snake": {
          "highscore": 0,
          "by": "unknown"
        }
      });
      client.stats.ensure("snake_global", {
        "highscore": 0,
        "by": "unknown"
      });
      var serverhighscore = client.stats.get(serverid, "snake");

      if (!serverhighscore || !serverhighscore.highscore || this.score > serverhighscore.highscore) {
        serverhighscore = this.score;
        client.stats.set(serverid, this.score, "snake.highscore");
        client.stats.set(serverid, curplayer, "snake.by");
      }

      var gobalhighscore = client.stats.get("snake_global");

      if (!(!gobalhighscore || !gobalhighscore.highscore) || this.score > gobalhighscore.highscore) {
        gobalhighscore = this.score;
        client.stats.set("snake_global", this.score, "highscore");
        client.stats.set("snake_global", curplayer, "by");
      }

      var editEmbed = new Discord.MessageEmbed().setColor('RED').setAuthor('Snake Minigame', "https://imgur.com/1ioYOA0.png", "https://discord.gg/FQGXbypRf8").addField("__GAME OVER!__", "**SCORE:**\n `" + this.score + "`").addField("Serverhighscore:", "`" + serverhighscore.highscore + "`\nby: <@" + serverhighscore.by + ">").addField("Globalscore:", "`" + gobalhighscore.highscore + "`\nby: <@" + gobalhighscore.by + ">");
      this.gameEmbed.edit(editEmbed);
      this.gameEmbed.reactions.removeAll();
    }
  }, {
    key: "filter",
    value: function filter(reaction, user) {
      return ['⬅️', '➡️', '⬇️', '⬆️'].includes(reaction.emoji.name) && user.id == curplayer;
    }
  }, {
    key: "waitForReaction",
    value: function waitForReaction() {
      var _this2 = this;

      this.gameEmbed.awaitReactions(function (reaction, user) {
        return _this2.filter(reaction, user);
      }, {
        max: 1,
        time: 30000,
        errors: ['time']
      }).then(function (collected) {
        var reaction = collected.first();
        var snakeHead = _this2.snake[0];
        var nextPos = {
          x: snakeHead.x,
          y: snakeHead.y
        };

        if (reaction.emoji.name === '⬅️') {
          var nextX = snakeHead.x - 1;
          if (nextX < 0) nextX = WIDTH - 1;
          nextPos.x = nextX;
        } else if (reaction.emoji.name === '⬆️') {
          var nextY = snakeHead.y - 1;
          if (nextY < 0) nextY = HEIGHT - 1;
          nextPos.y = nextY;
        } else if (reaction.emoji.name === '⬇️') {
          var _nextY = snakeHead.y + 1;

          if (_nextY >= HEIGHT) _nextY = 0;
          nextPos.y = _nextY;
        } else if (reaction.emoji.name === '➡️') {
          var _nextX = snakeHead.x + 1;

          if (_nextX >= WIDTH) _nextX = 0;
          nextPos.x = _nextX;
        }

        reaction.users.remove(reaction.users.cache.filter(function (user) {
          return user.id !== _this2.gameEmbed.author.id;
        }).first().id).then(function () {
          if (_this2.isLocInSnake(nextPos)) {
            _this2.gameOver();
          } else {
            _this2.snake.unshift(nextPos);

            if (_this2.snake.length > _this2.snakeLength) _this2.snake.pop();

            _this2.step();
          }
        })["catch"](function (Error) {
          _this2.gameOver();

          message.channel.send("I dont have permission to remove Reactions");
        });
      })["catch"](function (collected) {
        _this2.gameOver();
      });
    }
  }]);

  return SnakeGame;
}();

module.exports = {
  name: "snake",
  aliases: [""],
  category: "🎮 MiniGames",
  description: "Allows you to play a Game of Snake",
  usage: "snake --> Play the Game",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, _require2, Snake;

    return regeneratorRuntime.async(function run$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");

            if (client.settings.get(message.guild.id, "MINIGAMES")) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("THIS COMMAND IS CURRENTLY DISABLED").setDescription("An Admin can enable it with: `".concat(prefix, "setup-commands`"))));

          case 3:
            _require2 = require('weky'), Snake = _require2.Snake;
            new Snake({
              message: message,
              embed: {
                title: 'Snake',
                //embed title
                color: "#2f3136",
                //embed color
                gameOverTitle: "Game Over" //game over embed title

              },
              emojis: {
                empty: '⬛',
                //zone emoji
                snakeBody: '♿',
                //snake
                food: '🍔',
                //food emoji
                //control
                up: '⬆️',
                right: '⬅️',
                down: '⬇️',
                left: '➡️'
              }
            }).start();
            return _context2.abrupt("return");

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    });
  }
};