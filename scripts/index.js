import { system, world } from "@minecraft/server";

const prefix = "+";

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
        } else if (player.hasTag("nightvision")) {
          player.removeTag("nightvision");
        }
        break;
      case "nv":
        if (!player.hasTag("nightvision")) {
          player.addTag("nightvision");
        } else if (player.hasTag("nightvision")) {
          player.removeTag("nightvision");
        }
        break;
      case "feed":
        player.runCommandAsync("effect @s saturation 1 255 true");
        break;
      case "f":
        player.runCommandAsync("effect @s saturation 1 255 true");
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

world.events.entityHit.subscribe((data) => {
  const attacker = data.entity;
  const attacked = data.hitEntity;
  if (attacker.typeId == "minecraft:player") {
    if (attacked.typeId == "minecraft:player") {
      attacker.addTag("in_combat");
      attacked.addTag("in_combat");
      setTickTimeout(() => {
        attacker.removeTag("in_combat");
        attacked.removeTag("in_combat");
      }, 200);
    }
  }
});

world.events.playerSpawn.subscribe((event) => {
  const player = event.player;

  if (event.initialSpawn) {
    player.teleport(
      { x: 0, y: 251, z: 0 },
      player.dimension,
      player.rotation.x,
      player.rotation.y
    );
    player.runCommandAsync("gamemode adventure");
  } else if (player.hasTag("in_combat")) {
    player.addTag("warn");
    player.runCommandAsync(
      `tellraw @a {"rawtext":[{"text":"§c§lYou Have Been Warned For Combat Logging"}]}`
    );
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
      `titleraw @s title {"rawtext":[{"text":" §fName §c-\n§b ${name}\n §fBalance §c-\n §a$§b${balance}\n §fTime Played §c-\n §b${time} Hours\n §fKills §c-\n §b${kills}\n §fDeaths §c-\n §b${deaths}\n/ §fK/D §c-\n §b${kdr}.${kdr_decimals}%\n §fPvP Status §c-\n §8[§bPeace Period§8]\n §f---------------\n §bRealm Info\n§f ---------------\n §fRealm Code §c-\n §8[§bJG8rwHwx3_s§8]\n §fDiscord Code §c-\n §8[§bDtm7JPbRx3§8]"}]}`
    );
  });
});
