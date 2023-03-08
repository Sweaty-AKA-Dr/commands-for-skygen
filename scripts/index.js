import { system, world } from "@minecraft/server";

const prefix = "+";

console.warn("Importing Scripts");

world.events.beforeChat.subscribe((data) => {
  const player = data.sender;
  const message = data.message;

  if (message.startsWith(prefix)) {
    data.cancel = true;
    switch (message.slice(1).toLowerCase()) {
      case "gmc":
        if (player.hasTag("Admin")) {
          player.runCommandAsync("gamemode creative");
        } else {
          player.tell("§cMissing permissions [Admin]");
        }
        break;
      case "gms":
        if (player.hasTag("Admin")) {
          player.runCommandAsync("gamemode survival");
        } else {
          player.tell("§cMissing permissions [Admin]");
        }
        break;
      case "gma":
        if (player.hasTag("Admin")) {
          player.runCommandAsync("gamemode adventure");
        } else {
          player.tell("§cMissing permissions [Admin]");
        }
        break;
      case "gmspec":
        if (player.hasTag("Admin")) {
          player.runCommandAsync("gamemode spectator");
        } else {
          player.tell("§cMissing permissions [Admin]");
        }
        break;
      case "vip":
        if (player.hasTag("vip") && !player.hasTag("in_combat")) {
          player.runCommandAsync("tag @s add vipsell");
        } else if (player.hasTag("vip") && player.hasTag("in_combat")) {
          player.tell("§cYou Must Be Out Of Combat");
        } else if (!player.hasTag("vip"))
          player.tell("§cMissing permissions [vip]");
        break;
      case "spawn":
        if (!player.hasTag("in_combat")) {
          player.addTag("spawn");
        } else if (player.hasTag("in_combat")) {
          player.tell("You must be out of combat to use this command.");
        }
        break;
      case "shop":
        if (!player.hasTag("in_combat")) {
          player.addTag("shop");
        } else if (player.hasTag("in_combat")) {
          player.tell("You must be out of combat to use this command.");
        }
        break;
      case "sell":
        if (!player.hasTag("in_combat")) {
          player.addTag("sell");
        } else if (player.hasTag("in_combat")) {
          player.tell("You must be out of combat to use this command.");
        }
        break;
      case "plots":
        if (!player.hasTag("in_combat")) {
          player.addTag("plots");
        } else if (player.hasTag("in_combat")) {
          player.tell("You must be out of combat to use this command.");
        }
        break;
      case "donation":
        if (!player.hasTag("in_combat")) {
          player.addTag("dono");
        } else if (player.hasTag("in_combat")) {
          player.tell("You must be out of combat to use this command.");
        }
        break;
      case "dono":
        if (!player.hasTag("in_combat")) {
          player.addTag("dono");
        } else if (player.hasTag("in_combat")) {
          player.tell("You must be out of combat to use this command.");
        }
        break;
      case "enchants":
        if (!player.hasTag("in_combat")) {
          player.addTag("ench");
        } else if (player.hasTag("in_combat")) {
          player.tell("You must be out of combat to use this command.");
        }
        break;
      case "customcrafting":
        if (!player.hasTag("in_combat")) {
          player.addTag("ccrafting");
        } else if (player.hasTag("in_combat")) {
          player.tell("You must be out of combat to use this command.");
        }
        break;
      case "cc":
        if (!player.hasTag("in_combat")) {
          player.addTag("ccrafting");
        } else if (player.hasTag("in_combat")) {
          player.tell("You must be out of combat to use this command.");
        }
        break;
      case "misc":
        if (!player.hasTag("in_combat")) {
          player.addTag("misc");
        } else if (player.hasTag("in_combat")) {
          player.tell("You must be out of combat to use this command.");
        }
        break;
      case "help":
        player.runCommandAsync(`tag @s add help`);
        break;
      case "rules":
        player.runCommandAsync(`tag @s add rules`);
        break;
      case "credits":
        player.runCommandAsync(`tag @s add credits`);
        break;
      case "nightvision":
        if (!player.hasTag("nightvision")) {
          player.addTag("nightvision");
          player.tell("§b§lNight Vision§r §dEnabled");
        } else if (player.hasTag("nightvision")) {
          player.removeTag("nightvision");
        }
        break;
      case "nv":
        if (!player.hasTag("nightvision")) {
          player.addTag("nightvision");
          player.tell("§b§lNight Vision§r §dEnabled");
        } else if (player.hasTag("nightvision")) {
          player.removeTag("nightvision");
        }
        break;
      case "feed":
        player.runCommandAsync("effect @s saturation 1 255 true");
        player.tell("§l§eHunger Is Full");
        break;
      case "f":
        player.runCommandAsync("effect @s saturation 1 255 true");
        player.tell("§l§eHunger Is Full");
        break;
      case "adminchat":
        if (player.hasTag("admin") && !player.hasTag("adminchat")) {
          player.addTag("adminchat");
          player.tell("§8[§6Skygen§8] §7You have enabled the §4Admin §7chat.");
        } else if (player.hasTag("admin") && player.hasTag("adminchat")) {
          player.removeTag("adminchat");
          player.tell("§8[§6Skygen§8] §7You have disabled the §4Admin §7chat.");
        } else
          player.tell(
            "§8[§6Skygen§8] §cYou don't have permission to be using this command."
          );
        break;

      default:
        player.tell(
          `§c§l'${message}'§f§r is an unavailable command!\n§bTry '+help' For More Information`
        );
        break;
    }
  }
});

function setTickTimeout(callback, tick, loop = false) {
  let cT = 0;
  const tE = world.events.tick.subscribe((data) => {
    if (cT === 0) cT = data.currentTick + tick;
    if (cT <= data.currentTick) {
      try {
        callback();
      } catch (e) {
        console.warn(`${e} : ${e.stack}`);
      }
      if (loop) cT += tick;
      else world.events.tick.unsubscribe(tE);
    }
  });
}

world.events.entityHurt.subscribe((data) => {
  let attacker = data.damageSource.damagingEntity;
  let attacked = data.hurtEntity;
  if (
    attacker.typeId === "minecraft:player" &&
    attacked.typeId === "minecraft:player"
  ) {
    attacker.addTag("in_combat");
    attacked.addTag("in_combat");
    setTickTimeout(() => {
      attacker.removeTag("in_combat");
      attacked.removeTag("in_combat");
    }, 200);
  } else if (
    attacker.typeId === "minecraft:player" &&
    attacked.typeId === "minecraft:player" &&
    attacked.getComponent("minecraft:health").current <= 0
  ) {
    attacker.removeTag("in_combat");
    attacked.removeTag("in_combat");
  } else return;
});

world.events.playerSpawn.subscribe((data) => {
  let player = data.player;
  if (data.initialSpawn) {
    player.teleport(
      { x: 0.5, y: 251, z: 0.5 },
      player.dimension,
      player.rotation.x,
      player.rotation.y
    );
    player.runCommandAsync("gamemode adventure");
  } else if (data.initialSpawn && player.hasTag("in_combat")) {
    player.addTag("warn");
    player.tell("§l§cYou have been warned for Combat Logging!");
  }
});

function getScore(target, value, useZero = true) {
  try {
    const objective = world.scoreboard.getObjective(value);
    if (typeof target == "string")
      return objective.getScore(
        objective
          .getParticipants()
          .find((player) => player.displayName == target)
      );
    return objective.getScore(target.scoreboard);
  } catch {
    return useZero ? 0 : NaN;
  }
}

function metricNumbers(value) {
  const types = ["", "k", "M", "B"];
  const selectType = (Math.log10(value) / 3) | 0;
  if (selectType == 0) return value;
  let scaled = value / Math.pow(10, selectType * 3);
  return scaled.toFixed(2) + types[selectType];
}

system.runSchedule(() => {
  [...world.getPlayers()].forEach((player) => {
    const name = player.name;
    const balance = metricNumbers(getScore(player, "money"));
    const time = metricNumbers(getScore(player, "hr"));
    const kills = metricNumbers(getScore(player, "Kills"));
    const deaths = metricNumbers(getScore(player, "Deaths"));
    const kdr = getScore(player, "KDR");
    const kdr_decimals = getScore(player, "KDR-Decimals");

    player.runCommandAsync(
      `titleraw @s title {"rawtext":[{"text":" §fName §c-\n§b ${name}\n §fBalance §c-\n §a$§b${balance}\n §fTime Played §c-\n §b${time} Hours\n §fKills §c-\n §b${kills}\n §fDeaths §c-\n §b${deaths}\n/ §fK/D §c-\n §b${kdr}.${kdr_decimals}%\n §f---------------\n §bRealm Info\n§f ---------------\n §fRealm Code §c-\n §8[§bJG8rwHwx3_s§8]\n §fDiscord Code §c-\n §8[§bceQPkvrJpr§8]"}]}`
    );
  });
});

const overworld = world.getDimension("overworld");

const rank_prefix = "rank:";
const default_rank = "§fMember";

function getRanks(player) {
  const ranks = player
    .getTags()
    .map((v) => {
      if (!v.startsWith(rank_prefix)) return null;
      return v.substring(rank_prefix.length);
    })
    .filter((x) => x);
  return ranks.length == 0 ? [default_rank] : ranks;
}

world.events.beforeChat.subscribe((data) => {
  data.sendToTargets = true;
  data.targets = [];
});

world.events.chat.subscribe((data) => {
  function metricNumbers(value) {
    const types = ["", "k", "M", "B"];
    const selectType = (Math.log10(value) / 3) | 0;
    if (selectType == 0) return value;
    let scaled = value / Math.pow(10, selectType * 3);
    return scaled.toFixed(2) + types[selectType];
  }

  system.runSchedule(() => {
    [...world.getPlayers()].forEach((player) => {
      const name = player.name;
      const balance = metricNumbers(getScore(player, "money"));
      const time = metricNumbers(getScore(player, "hr"));

      const player = data.sender;
      const message = data.message;

      const ranks = getRanks(player);
      const hours = String(getScore(player, "hr") + "H");

      if (player.hasTag("adminchat")) {
        overworld.runCommandAsync(
          `tellraw @a[tag=admin] {"rawtext":[{"text":"§8[§4Admin§8] §7${player.name}: §f${message}"}]}`
        );
      } else
        world.say(
          `§8[§a${hours}§r, §a$§f${balance}§8] §8[${ranks}§r§8] §7${player.name}: §f${message}`
        );
    });
  });

  world.events.tick.subscribe(() => {
    [...world.getPlayers()].forEach((player) => {
      if (
        Math.abs(player.velocity.x) == 0 &&
        Math.abs(player.velocity.z) == 0
      ) {
        player.runCommandAsync("scoreboard players add @s afkTimer 1");
      } else player.runCommandAsync("scoreboard players set @s afkTimer 0");

      if (getScore(player, "afkTimer") == 3000) {
        player.tell(`You Will Be Kicked in 2 and a half minutes`);
      }

      if (getScore(player, "afkTimer") == 5900) {
        player.tell(`You Will Be Kicked in 5`);
      }

      if (getScore(player, "afkTimer") == 5920) {
        player.tell(`You Will Be Kicked in 4`);
      }

      if (getScore(player, "afkTimer") == 5940) {
        player.tell(`You Will Be Kicked in 3`);
      }

      if (getScore(player, "afkTimer") == 5960) {
        player.tell(`You Will Be Kicked in 2`);
      }

      if (getScore(player, "afkTimer") == 5980) {
        player.tell(`You Will Be Kicked in 1`);
      }

      if (getScore(player, "afkTimer") == 5999) {
        world.say(`${player.name} has been kicked for being AFK.`);
      }

      if (getScore(player, "afkTimer") == 6000) {
        player.runCommandAsync(`kick ${player.name}`);
      }
      if (getScore(player, "afkTimer") > 6000) {
        player.runCommandAsync("scoreboard players set @s afkTimer 0");
      }
    });
  });

  world.events.playerSpawn.subscribe((data) => {
    let first_spawn = data.initialSpawn;
    if (first_spawn && player.hasTag("banned")) {
      world.say(
        `§4${player.name}§f tried joining the Realm while they're banned.`
      );
      player.runCommandAsync("kick ${player.name} You Are Banned");
    }
  });
});

function getScore(target, value, useZero = true) {
  try {
    const objective = world.scoreboard.getObjective(value);
    if (typeof target == "string")
      return objective.getScore(
        objective
          .getParticipants()
          .find((player) => player.displayName == target)
      );
    return objective.getScore(target.scoreboard);
  } catch {
    return useZero ? 0 : NaN;
  }
}

function metricNumbers(value) {
  const types = ["", "k", "M", "B"];
  const selectType = (Math.log10(value) / 3) | 0;
  if (selectType == 0) return value;
  let scaled = value / Math.pow(10, selectType * 3);
  return scaled.toFixed(2) + types[selectType];
}

system.runSchedule(() => {
  [...world.getPlayers()].forEach((player) => {
    const members = metricNumbers(getScore(player, "Members"));
    const players = getScore(player, "POnline");

    player.runCommandAsync(
      `/titleraw @s actionbar {"rawtext":[{"text":"§l§c§c§f Total Members §c-§b ${members} \n§c §fPlayers Online§c - §b ${players}/11§e\n Game Version 1.10.0\n(Anti C-Log)\n§7§oDo +help to see the \ncommand list"}]}`
    );
  });
});
