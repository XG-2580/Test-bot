"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var fetch = require("node-fetch");

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

module.exports = {
  name: "github",
  category: "⌨️ Programming",
  aliases: ["git", "repo", "repository", "githubrepo"],
  cooldown: 5,
  usage: "github <LINK>",
  description: "View a GitHub Repository details.",
  run: function run(client, message, args, user, text, prefix) {
    var es, repo, _repo$split, _repo$split2, username, repository, body, size, license, footer;

    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");
            _context.prev = 1;
            repo = args[0];

            if (repo) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", message.channel.send({
              embed: new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("You didn't provide a Repository").setDescription("Usage: `".concat(prefix, "github <LINK>`"))
            }));

          case 5:
            _repo$split = repo.split("/"), _repo$split2 = _slicedToArray(_repo$split, 2), username = _repo$split2[0], repository = _repo$split2[1];

            if (!(!username || !repository)) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", message.channel.send({
              embed: new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Repository must be in the form `username/repository`").setDescription("Usage: `".concat(prefix, "github <REPO-LINK>`\nExample: `").concat(prefix, "github https://github.com/Tomato6966/Codes/`"))
            }));

          case 8:
            _context.next = 10;
            return regeneratorRuntime.awrap(fetch("https://api.github.com/repos/".concat(username, "/").concat(repository)).then(function (res) {
              return res.ok && res.json();
            })["catch"](function () {
              return null;
            }));

          case 10:
            body = _context.sent;

            if (body) {
              _context.next = 13;
              break;
            }

            return _context.abrupt("return", message.channel.send({
              embed: new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Could not fetch that repo").setDescription("Are you sure it exists?")
            }));

          case 13:
            size = body.size <= 1024 ? "".concat(body.size, " KB") : Math.floor(body.size / 1024) > 1024 ? "".concat((body.size / 1024 / 1024).toFixed(2), " GB") : "".concat((body.size / 1024).toFixed(2), " MB");
            license = body.license && body.license.name && body.license.url ? "[".concat(body.license.name, "](").concat(body.license.url, ")") : body.license && body.license.name || "None";
            footer = [];
            if (body.fork) footer.push("\u276F **Forked** from [".concat(body.parent.full_name, "](").concat(body.parent.html_url, ")"));
            if (body.archived) footer.push("❯ This repository is **Archived**");
            return _context.abrupt("return", message.channel.send({
              embed: new MessageEmbed.setTitle(body.full_name).setAuthor("GitHub", "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png").setURL(body.html_url).setThumbnail(body.owner.avatar_url).setColor(es.color).setFooter(es.footertext, es.footericon).setDescription("".concat(body.description || "No Description.", "\n\n\u276F **Language:** ").concat(body.language, "\n\u276F **Forks:** ").concat(body.forks_count.toLocaleString(), "\n\u276F **License:** ").concat(license, "\n\u276F **Open Issues:** ").concat(body.open_issues.toLocaleString(), "\n\u276F **Watchers:** ").concat(body.subscribers_count.toLocaleString(), "\n\u276F **Stars:** ").concat(body.stargazers_count.toLocaleString(), "\n\u276F **Size:** ").concat(size).concat(footer.length ? "\n".concat(footer.join("\n")) : ""))
            }));

          case 21:
            _context.prev = 21;
            _context.t0 = _context["catch"](1);
            console.log(String(_context.t0.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t0)).substr(0, 2000), "```"))));

          case 25:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 21]]);
  }
};