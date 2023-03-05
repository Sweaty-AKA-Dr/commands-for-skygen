import { world } from "@minecraft/server";

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
  } else if (player.hastag("in_combat")) {
    player.addTag("warn");
    player.runCommandAsync(`tellraw @a {"rawtext":[{"text":"§c§lYou Have Been Warned For Combat Logging"}]}`);
  }
});
