"use strict";

function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

var _require2 = require("erela.js"),
    TrackUtils = _require2.TrackUtils;

var _require3 = require("../../handlers/functions"),
    format = _require3.format,
    delay = _require3.delay,
    swap_pages = _require3.swap_pages,
    swap_pages2 = _require3.swap_pages2,
    shuffle = _require3.shuffle;

module.exports = {
  name: "savedqueue",
  category: "\u269C\uFE0F Custom Queue(s)",
  aliases: ["savequeue", "customqueue", "savedqueue"],
  description: "Saves the Current Queue onto a Name",
  usage: "savedqueue <Type> <Name> [Options]`\n\n**Types**:\n> `create`, `addcurrenttrack`, `addcurrentqueue`, `removetrack`, `removedupes`, `showall`, `showdetails`, `createsave`, `delete`, `play`, `shuffle`\n**Name**:\n> `Can be anything with maximum of 10 Letters`\n**Options**:\n> `pick the track which you want to remove",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, Type, Name, Options, player, track, oldtracks, _player, tracks, _oldtracks, newtracks, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _track, newqueue, _tracks, deletetrack, _oldtracks2, _newtracks, _oldtracks3, counter, _newtracks2, i, exists, queues, description, item, _player2, _tracks2, _oldtracks4, _newtracks3, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _track2, _newqueue, channel, mechannel, _player3, playercreate, tempmsg, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, _track3, unresolvedTrack, res, _tracks3, array;

    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");

            if (client.settings.get(message.guild.id, "MUSIC")) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("THIS COMMAND IS CURRENTLY DISABLED").setDescription("An Admin can enable it with: `".concat(prefix, "setup-commands`"))));

          case 3:
            _context.prev = 3;
            Type = args[0];
            Name = args[1];
            Options = args.slice(2).join(" ");

            if (Type) {
              _context.next = 9;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("You didn't entered a TYPE").setDescription("Usage: `".concat(prefix, "savedqueue <Type> <Name> [Options]`\nAvailable Types:\n`create`, `addcurrenttrack`, `addcurrentqueue`, `removetrack`, `removedupes`, `showall`, `createsave`, `delete`, `showdetails`, `play`, `shuffle`"))));

          case 9:
            _context.t0 = Type.toLowerCase();
            _context.next = _context.t0 === "create" ? 12 : _context.t0 === "addcurrenttrack" ? 21 : _context.t0 === "addcurrentqueue" ? 39 : _context.t0 === "removetrack" ? 78 : _context.t0 === "removesong" ? 78 : _context.t0 === "shuffle" ? 95 : _context.t0 === "mix" ? 95 : _context.t0 === "removedupes" ? 108 : _context.t0 === "removeduplicates" ? 108 : _context.t0 === "showall" ? 138 : _context.t0 === "listall" ? 138 : _context.t0 === "show" ? 138 : _context.t0 === "queue" ? 138 : _context.t0 === "list" ? 138 : _context.t0 === "createsave" ? 152 : _context.t0 === "cs" ? 152 : _context.t0 === "save" ? 152 : _context.t0 === "delete" ? 191 : _context.t0 === "remove" ? 191 : _context.t0 === "del" ? 191 : _context.t0 === "play" ? 200 : _context.t0 === "load" ? 200 : _context.t0 === "p" ? 200 : _context.t0 === "add" ? 200 : _context.t0 === "paly" ? 200 : _context.t0 === "showdetails" ? 258 : _context.t0 === "showdetail" ? 258 : _context.t0 === "details" ? 258 : 269;
            break;

          case 12:
            if (Name) {
              _context.next = 14;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("You didn't entered a Saved-Queue-Name").setDescription("Usage: `".concat(prefix, "savedqueue <Type> <Name>`\nName Information:\n`Can be anything with maximum of 10 Letters`"))));

          case 14:
            if (!(Name.length > 10)) {
              _context.next = 16;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(client.user.username, ee.footericon).setTitle("Your Saved-Queue-Name is too long!").setDescription("Maximum Length is `10`")));

          case 16:
            if (!client.queuesaves.get(message.author.id, "".concat(Name))) {
              _context.next = 18;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.wrongcolor).setTitle("Your Queue already exists!").setDescription("Delete it: `".concat(prefix, "savedqueue delete ").concat(Name, "`\nShow its content: `").concat(prefix, "savedqueue showdetails ").concat(Name))));

          case 18:
            client.queuesaves.set(message.author.id, {
              "TEMPLATEQUEUEINFORMATION": ["queue", "sadasd"]
            }, "".concat(Name)); //return susccess message

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setTitle("Created ".concat(Name)).setDescription("Add the current **Queue** onto it: `".concat(prefix, "savedqueue addcurrentqueue ").concat(Name, "`\nAdd the current **Track** onto it: `").concat(prefix, "savedqueue addcurrenttrack ").concat(Name, "`")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)));

          case 21:
            if (Name) {
              _context.next = 23;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("You didn't entered a Saved-Queue-Name").setDescription("Usage: `".concat(prefix, "savedqueue <Type> <Name>`\nName Information:\n`Can be anything with maximum of 10 Letters`"))));

          case 23:
            if (!(Name.length > 10)) {
              _context.next = 25;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(client.user.username, ee.footericon).setTitle("Your Saved-Queue-Name is too long!").setDescription("Maximum Length is `10`")));

          case 25:
            if (client.queuesaves.get(message.author.id, "".concat(Name))) {
              _context.next = 27;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.wrongcolor).setTitle("Your Queue does not exists yet!").setDescription("Create it with: `".concat(prefix, "savedqueue create ").concat(Name, "`"))));

          case 27:
            //get the player instance
            player = client.manager.players.get(message.guild.id); //if no player available return error | aka not playing anything

            if (player) {
              _context.next = 30;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(client.user.username, ee.footericon).setTitle("There is nothing playing")));

          case 30:
            //get the current track
            track = player.queue.current; //if there are no other tracks, information

            if (track) {
              _context.next = 33;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.wrongcolor).setTitle("There is nothing playing!")));

          case 33:
            oldtracks = client.queuesaves.get(message.author.id, "".concat(Name));
            if (!Array.isArray(oldtracks)) oldtracks = []; //add the track

            oldtracks.push({
              "title": track.title,
              "url": track.uri
            }); //save it in the db

            client.queuesaves.set(message.author.id, oldtracks, "".concat(Name)); //return susccess message

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setTitle("Added ".concat(track.title, " onto the Queue `").concat(Name, "`").substr(0, 256)).setDescription("There are now: `".concat(client.queuesaves.get(message.author.id, "".concat(Name)).length, " Tracks`\n\nPlay it with: `").concat(prefix, "savedqueue play ").concat(Name, "`")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)));

          case 39:
            if (Name) {
              _context.next = 41;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("You didn't entered a Saved-Queue-Name").setDescription("Usage: `".concat(prefix, "savedqueue <Type> <Name>`\nName Information:\n`Can be anything with maximum of 10 Letters`"))));

          case 41:
            if (!(Name.length > 10)) {
              _context.next = 43;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(client.user.username, ee.footericon).setTitle("Your Saved-Queue-Name is too long!").setDescription("Maximum Length is `10`")));

          case 43:
            if (client.queuesaves.get(message.author.id, "".concat(Name))) {
              _context.next = 45;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.wrongcolor).setTitle("Your Queue does not exists yet!").setDescription("Create it with: `".concat(prefix, "savedqueue create ").concat(Name, "`"))));

          case 45:
            //get the player instance
            _player = client.manager.players.get(message.guild.id); //if no player available return error | aka not playing anything

            if (_player) {
              _context.next = 48;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(client.user.username, ee.footericon).setTitle("There is nothing playing")));

          case 48:
            //get all tracks
            tracks = _player.queue; //if there are no other tracks, information

            if (tracks.length) {
              _context.next = 51;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.wrongcolor).setTitle("The Queue is Empty!")));

          case 51:
            //get the old tracks from the Name
            _oldtracks = client.queuesaves.get(message.author.id, "".concat(Name));
            if (!Array.isArray(_oldtracks)) _oldtracks = [];
            newtracks = [];
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 57;

            for (_iterator = tracks[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              _track = _step.value;
              newtracks.push({
                "title": _track.title,
                "url": _track.uri
              });
            }

            _context.next = 65;
            break;

          case 61:
            _context.prev = 61;
            _context.t1 = _context["catch"](57);
            _didIteratorError = true;
            _iteratorError = _context.t1;

          case 65:
            _context.prev = 65;
            _context.prev = 66;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 68:
            _context.prev = 68;

            if (!_didIteratorError) {
              _context.next = 71;
              break;
            }

            throw _iteratorError;

          case 71:
            return _context.finish(68);

          case 72:
            return _context.finish(65);

          case 73:
            if (_player.queue.current) newtracks.push({
              "title": _player.queue.current.title,
              "url": _player.queue.current.uri
            }); //define the new customqueue by adding the newtracks to the old tracks

            newqueue = _oldtracks.concat(newtracks); //save the newcustomqueue into the db

            client.queuesaves.set(message.author.id, newqueue, "".concat(Name)); //return susccess message

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setTitle("Added ".concat(tracks.length, " Tracks onto the Queue `").concat(Name, "`")).setDescription("There are now: `".concat(newqueue.length, " Tracks`\n\nPlay it with: `").concat(prefix, "savedqueue play ").concat(Name, "`")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)));

          case 78:
            if (Name) {
              _context.next = 80;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("You didn't entered a Saved-Queue-Name").setDescription("Usage: `".concat(prefix, "savedqueue removetrack <Name> [Options]`\nName Information:\n`Can be anything with maximum of 10 Letters`"))));

          case 80:
            if (!(Name.length > 10)) {
              _context.next = 82;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(client.user.username, ee.footericon).setTitle("Your Saved-Queue-Name is too long!").setDescription("Maximum Length is `10`")));

          case 82:
            if (Options) {
              _context.next = 84;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("You didn't entered an Option (the Track you want to remove (ID OF IT))").setDescription("See all your Tracks: `".concat(prefix, "savedqueue showdetails ").concat(Name, "`Usage: `").concat(prefix, "savedqueue removetrack ").concat(Name, " <Song number>`"))));

          case 84:
            if (client.queuesaves.get(message.author.id, "".concat(Name))) {
              _context.next = 86;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.wrongcolor).setTitle("Your Queue is not existing!").setDescription("Create it with: `".concat(prefix, "savedqueue create ").concat(Name, "`"))));

          case 86:
            _tracks = client.queuesaves.get(message.author.id, "".concat(Name));

            if (!(Number(Options) >= _tracks.length || Number(Options) < 0)) {
              _context.next = 89;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Your provided Option is out of Range (`0` - `".concat(_tracks.length - 1, "`)")).setDescription("See all your Tracks: `".concat(prefix, "savedqueue showdetails ").concat(Name, "`Usage: `").concat(prefix, "savedqueue removetrack ").concat(Name, " <Song number>`"))));

          case 89:
            deletetrack = _tracks[Number(Options)]; //delete it

            delete _tracks[Number(Options)]; //remove empty spaces

            _tracks = _tracks.filter(function (entry) {
              return /\S/.test(entry);
            }); //save it on the db again

            client.queuesaves.set(message.author.id, _tracks, "".concat(Name)); //return susccess message

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setTitle("Deleted ".concat(deletetrack.title, " of the Queue `").concat(Name, "`").substr(0, 256)).setDescription("There are now: `".concat(client.queuesaves.get(message.author.id, "".concat(Name)).length, " Tracks`\n\nPlay it with: `").concat(prefix, "savedqueue play ").concat(Name, "`")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)));

          case 95:
            if (Name) {
              _context.next = 97;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("You didn't entered a Saved-Queue-Name").setDescription("Usage: `".concat(prefix, "savedqueue <Type> <Name>`\nName Information:\n`Can be anything with maximum of 10 Letters`"))));

          case 97:
            if (!(Name.length > 10)) {
              _context.next = 99;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(client.user.username, ee.footericon).setTitle("Your Saved-Queue-Name is too long!").setDescription("Maximum Length is `10`")));

          case 99:
            if (client.queuesaves.get(message.author.id, "".concat(Name))) {
              _context.next = 101;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.wrongcolor).setTitle("Your Queue is not existing!").setDescription("Create it with: `".concat(prefix, "savedqueue create ").concat(Name, "`"))));

          case 101:
            _oldtracks2 = client.queuesaves.get(message.author.id, "".concat(Name));

            if (Array.isArray(_oldtracks2)) {
              _context.next = 104;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.wrongcolor).setTitle("Your Saved-Queue ".concat(Name, " is Empty!")).setDescription("Add the current **Queue** onto it: `".concat(prefix, "savedqueue addcurrentqueue ").concat(Name, "`\nAdd the current **Track** onto it: `").concat(prefix, "savedqueue addcurrenttrack ").concat(Name, "`"))));

          case 104:
            _newtracks = shuffle(_oldtracks2); //save it in the db

            client.queuesaves.set(message.author.id, _newtracks, "".concat(Name)); //return susccess message

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setTitle("Shuffled ".concat(_newtracks.length, " Tracks of the Queue `").concat(Name, "`").substr(0, 256)).setDescription("There are now: `".concat(client.queuesaves.get(message.author.id, "".concat(Name)).length, " Tracks`\n\nPlay it with: `").concat(prefix, "savedqueue play ").concat(Name, "`")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)));

          case 108:
            if (Name) {
              _context.next = 110;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("You didn't entered a Saved-Queue-Name").setDescription("Usage: `".concat(prefix, "savedqueue <Type> <Name>`\nName Information:\n`Can be anything with maximum of 10 Letters`"))));

          case 110:
            if (!(Name.length > 10)) {
              _context.next = 112;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(client.user.username, ee.footericon).setTitle("Your Saved-Queue-Name is too long!").setDescription("Maximum Length is `10`")));

          case 112:
            if (client.queuesaves.get(message.author.id, "".concat(Name))) {
              _context.next = 114;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.wrongcolor).setTitle("Your Queue is not existing!").setDescription("Create it with: `".concat(prefix, "savedqueue create ").concat(Name, "`"))));

          case 114:
            _oldtracks3 = client.queuesaves.get(message.author.id, "".concat(Name));

            if (Array.isArray(_oldtracks3)) {
              _context.next = 117;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.wrongcolor).setTitle("Your Saved-Queue ".concat(Name, " is Empty!")).setDescription("Add the current **Queue** onto it: `".concat(prefix, "savedqueue addcurrentqueue ").concat(Name, "`\nAdd the current **Track** onto it: `").concat(prefix, "savedqueue addcurrenttrack ").concat(Name, "`"))));

          case 117:
            //make a new array of each single song which is not a dupe
            counter = 0;
            _newtracks2 = [];
            i = 0;

          case 120:
            if (!(i < _oldtracks3.length)) {
              _context.next = 135;
              break;
            }

            exists = false;
            j = 0;

          case 123:
            if (!(j < _newtracks2.length)) {
              _context.next = 131;
              break;
            }

            if (!(_oldtracks3[i].url === _newtracks2[j].url)) {
              _context.next = 128;
              break;
            }

            exists = true;
            counter++;
            return _context.abrupt("break", 131);

          case 128:
            j++;
            _context.next = 123;
            break;

          case 131:
            if (!exists) {
              _newtracks2.push(_oldtracks3[i]);
            }

          case 132:
            i++;
            _context.next = 120;
            break;

          case 135:
            //save it in the db
            client.queuesaves.set(message.author.id, _newtracks2, "".concat(Name)); //return susccess message

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setTitle("Removed ".concat(counter, " Tracks from the Queue `").concat(Name, "`").substr(0, 256)).setDescription("There are now: `".concat(client.queuesaves.get(message.author.id, "".concat(Name)).length, " Tracks`\n\nPlay it with: `").concat(prefix, "savedqueue play ").concat(Name, "`")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)));

          case 138:
            queues = client.queuesaves.get(message.author.id);

            if (!(Object.size(queues) <= 1)) {
              _context.next = 141;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("You don't have any Queues saved yet").setDescription("Create one with: `".concat(prefix, "savedqueue create <SavedQueueName>`"))));

          case 141:
            description = "";
            _context.t2 = regeneratorRuntime.keys(queues);

          case 143:
            if ((_context.t3 = _context.t2()).done) {
              _context.next = 150;
              break;
            }

            item = _context.t3.value;

            if (!(item === "TEMPLATEQUEUEINFORMATION")) {
              _context.next = 147;
              break;
            }

            return _context.abrupt("continue", 143);

          case 147:
            description += "**\u276F ".concat(item, "** | `").concat(queues[item].length, " Tracks`\n");
            _context.next = 143;
            break;

          case 150:
            return _context.abrupt("return", swap_pages(client, message, description, "Your Saved Queues"));

          case 152:
            if (Name) {
              _context.next = 154;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("You didn't entered a Saved-Queue-Name").setDescription("Usage: `".concat(prefix, "savedqueue <Type> <Name>`\nName Information:\n`Can be anything with maximum of 10 Letters`"))));

          case 154:
            if (!(Name.length > 10)) {
              _context.next = 156;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(client.user.username, ee.footericon).setTitle("Your Saved-Queue-Name is too long!").setDescription("Maximum Length is `10`")));

          case 156:
            if (!client.queuesaves.get(message.author.id, "".concat(Name))) {
              _context.next = 158;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.wrongcolor).setTitle("Your Queue already exists!").setDescription("Delete it: `".concat(prefix, "savedqueue delete ").concat(Name, "`\nShow its content: `").concat(prefix, "savedqueue showdetails ").concat(Name))));

          case 158:
            //get the player instance
            _player2 = client.manager.players.get(message.guild.id); //if no player available return error | aka not playing anything

            if (_player2) {
              _context.next = 161;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(client.user.username, ee.footericon).setTitle("There is nothing playing")));

          case 161:
            //get all tracks
            _tracks2 = _player2.queue; //if there are no other tracks, information

            if (_tracks2.length) {
              _context.next = 164;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.wrongcolor).setTitle("The Queue is Empty!")));

          case 164:
            //get the old tracks from the Name
            _oldtracks4 = client.queuesaves.get(message.author.id, "".concat(Name));
            if (!Array.isArray(_oldtracks4)) _oldtracks4 = [];
            _newtracks3 = [];

            if (_player2.queue.current) {
              _newtracks3.push({
                "title": _player2.queue.current.title,
                "url": _player2.queue.current.uri
              });
            }

            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context.prev = 171;

            for (_iterator2 = _tracks2[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              _track2 = _step2.value;

              _newtracks3.push({
                "title": _track2.title,
                "url": _track2.uri
              });
            } //define the new customqueue by adding the newtracks to the old tracks


            _context.next = 179;
            break;

          case 175:
            _context.prev = 175;
            _context.t4 = _context["catch"](171);
            _didIteratorError2 = true;
            _iteratorError2 = _context.t4;

          case 179:
            _context.prev = 179;
            _context.prev = 180;

            if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
              _iterator2["return"]();
            }

          case 182:
            _context.prev = 182;

            if (!_didIteratorError2) {
              _context.next = 185;
              break;
            }

            throw _iteratorError2;

          case 185:
            return _context.finish(182);

          case 186:
            return _context.finish(179);

          case 187:
            _newqueue = _oldtracks4.concat(_newtracks3); //save the newcustomqueue into the db

            client.queuesaves.set(message.author.id, _newqueue, "".concat(Name)); //return susccess message

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setTitle("Created ".concat(Name, " and Added ").concat(_tracks2.length, " Tracks to it")).setDescription("Play it with: `".concat(prefix, "savedqueue play ").concat(Name, "`\nAdd the current **Queue** onto it: `").concat(prefix, "savedqueue addcurrentqueue ").concat(Name, "`\nAdd the current **Track** onto it: `").concat(prefix, "savedqueue addcurrenttrack ").concat(Name, "`")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)));

          case 191:
            if (Name) {
              _context.next = 193;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("You didn't entered a Saved-Queue-Name").setDescription("Usage: `".concat(prefix, "savedqueue <Type> <Name>`\nName Information:\n`Can be anything with maximum of 10 Letters`"))));

          case 193:
            if (!(Name.length > 10)) {
              _context.next = 195;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(client.user.username, ee.footericon).setTitle("Your Saved-Queue-Name is too long!").setDescription("Maximum Length is `10`")));

          case 195:
            if (client.queuesaves.get(message.author.id, "".concat(Name))) {
              _context.next = 197;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.wrongcolor).setTitle("Your Queue does not exists yet!").setDescription("Create it with: `".concat(prefix, "savedqueue create ").concat(Name, "`"))));

          case 197:
            //delete it
            client.queuesaves["delete"](message.author.id, "".concat(Name)); //return susccess message

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setTitle("Deleted the Queue `".concat(Name, "`")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)));

          case 200:
            if (Name) {
              _context.next = 202;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("You didn't entered a Saved-Queue-Name").setDescription("Usage: `".concat(prefix, "savedqueue <Type> <Name>`\nName Information:\n`Can be anything with maximum of 10 Letters`"))));

          case 202:
            if (!(Name.length > 10)) {
              _context.next = 204;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(client.user.username, ee.footericon).setTitle("Your Saved-Queue-Name is too long!").setDescription("Maximum Length is `10`")));

          case 204:
            //get the channel instance from the Member
            channel = message.member.voice.channel; //if the member is not in a channel, return

            if (channel) {
              _context.next = 207;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(client.user.username, ee.footericon).setTitle("You need to join a voice channel.")));

          case 207:
            mechannel = message.guild.me.voice.channel; //get the player instance

            _player3 = client.manager.players.get(message.guild.id);
            playercreate = false;

            if (!_player3) {
              _player3 = (_readOnlyError("player"), client.manager.create({
                guild: message.guild.id,
                voiceChannel: message.member.voice.channel.id,
                textChannel: message.channel.id,
                selfDeafen: config.settings.selfDeaf
              }));

              _player3.connect();

              _player3.set("message", message);

              _player3.set("playerauthor", message.author.id);

              playercreate = true;
            } //if not in the same channel as the player, return Error


            if (!(_player3 && channel.id !== _player3.voiceChannel)) {
              _context.next = 213;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.wrongcolor).setTitle("You need to be in my voice channel to use this command!").setDescription("Channelname: `".concat(message.guild.channels.cache.get(_player3.voiceChannel).name, "`"))));

          case 213:
            //If there is no player, then kick the bot out of the channel, if connected to
            if (!_player3 && mechannel) {
              message.guild.me.voice.kick()["catch"](function (e) {
                return console.log("This prevents a Bug");
              });
            } //if not in the same channel --> return


            if (!(mechannel && channel.id !== mechannel.id)) {
              _context.next = 216;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("You need to be in my voice channel to use this command!").setDescription("Channelname: `\uD83D\uDD08 ".concat(mechannel.name, "`"))));

          case 216:
            if (client.queuesaves.get(message.author.id, "".concat(Name))) {
              _context.next = 218;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.wrongcolor).setTitle("Your Queue does not exists Yet!").setDescription("Create it with: `".concat(prefix, "savedqueue create ").concat(Name, "`"))));

          case 218:
            _context.next = 220;
            return regeneratorRuntime.awrap(message.channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setAuthor("Attempting to Load ".concat(client.queuesaves.get(message.author.id, "".concat(Name)).length, " Tracks"), "https://cdn.discordapp.com/emojis/763781458417549352.gif").setDescription("It might take around about `".concat(Math.ceil(client.queuesaves.get(message.author.id, "".concat(Name)).length / 2), " Seconds`"))));

          case 220:
            tempmsg = _context.sent;
            _iteratorNormalCompletion3 = true;
            _didIteratorError3 = false;
            _iteratorError3 = undefined;
            _context.prev = 224;
            _iterator3 = client.queuesaves.get(message.author.id, "".concat(Name))[Symbol.iterator]();

          case 226:
            if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
              _context.next = 241;
              break;
            }

            _track3 = _step3.value;
            _context.prev = 228;
            // Advanced way using the title, author, and duration for a precise search.
            unresolvedTrack = TrackUtils.buildUnresolved({
              title: _track3.title,
              url: _track3.url
            }, message.author);

            _player3.queue.add(unresolvedTrack);

            _context.next = 237;
            break;

          case 233:
            _context.prev = 233;
            _context.t5 = _context["catch"](228);
            console.log(String(_context.t5.stack).red);
            return _context.abrupt("continue", 238);

          case 237:
            res = void 0;

          case 238:
            _iteratorNormalCompletion3 = true;
            _context.next = 226;
            break;

          case 241:
            _context.next = 247;
            break;

          case 243:
            _context.prev = 243;
            _context.t6 = _context["catch"](224);
            _didIteratorError3 = true;
            _iteratorError3 = _context.t6;

          case 247:
            _context.prev = 247;
            _context.prev = 248;

            if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
              _iterator3["return"]();
            }

          case 250:
            _context.prev = 250;

            if (!_didIteratorError3) {
              _context.next = 253;
              break;
            }

            throw _iteratorError3;

          case 253:
            return _context.finish(250);

          case 254:
            return _context.finish(247);

          case 255:
            //return susccess message - by editing the old temp msg
            tempmsg.edit(new MessageEmbed().setTitle("Loaded ".concat(client.queuesaves.get(message.author.id, "".concat(Name)).length, " Tracks onto the current Queue")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon));
            if (playercreate) _player3.play();
            return _context.abrupt("break", 271);

          case 258:
            if (Name) {
              _context.next = 260;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("You didn't entered a Saved-Queue-Name").setDescription("Usage: `".concat(prefix, "savedqueue <Type> <Name>`\nName Information:\n`Can be anything with maximum of 10 Letters`"))));

          case 260:
            if (!(Name.length > 10)) {
              _context.next = 262;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(client.user.username, ee.footericon).setTitle("Your Saved-Queue-Name is too long!").setDescription("Maximum Length is `10`")));

          case 262:
            if (client.queuesaves.get(message.author.id, "".concat(Name))) {
              _context.next = 264;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.wrongcolor).setTitle("Your Queue is not existing!").setDescription("Create it with: `".concat(prefix, "savedqueue create ").concat(Name, "`"))));

          case 264:
            //get all tracks
            _tracks3 = client.queuesaves.get(message.author.id, "".concat(Name)); //return susccess message

            array = [];

            _tracks3.map(function (track, index) {
              return array.push("**".concat(index, ")** [").concat(track.title.split("]").join("}").split("[").join("{").substr(0, 60), "](").concat(track.url, ")"));
            }).join("\n");

            return _context.abrupt("return", swap_pages(client, message, array, "Detailed Information about: `".concat(Name, "` [").concat(_tracks3.length, " Tracks]")));

          case 269:
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("You didn't entered a **valid** TYPE").setDescription("Usage: `".concat(prefix, "savedqueue <Type> <Name>`\nValid Types:\n`create`, `addcurrenttrack`, `addcurrentqueue`, `removetrack`, `removedupes`, `showall`, `createsave`, `delete`, `showdetails`, `play`, `shuffle`"))));

          case 271:
            _context.next = 277;
            break;

          case 273:
            _context.prev = 273;
            _context.t7 = _context["catch"](3);
            console.log(String(_context.t7.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t7)).substr(0, 2000), "```"))));

          case 277:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[3, 273], [57, 61, 65, 73], [66,, 68, 72], [171, 175, 179, 187], [180,, 182, 186], [224, 243, 247, 255], [228, 233], [248,, 250, 254]]);
  }
};

Object.size = function (obj) {
  var size = 0,
      key;

  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }

  return size;
};