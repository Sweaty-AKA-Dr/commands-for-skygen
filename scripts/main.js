import { world } from "@minecraft/server";

const prefix = "+";

world.events.beforeChat.subscribe((eventData) => {
  const player = data.sender;
  const message = data.message;

  if (message.startsWith(prefix)) {
    data.cancel = true;
    switch (message.slice(1).toLowerCase()) {
      case "gmc":
        if (player.hasTag("Admin")) {
          player.runCommandAsync("gamemode creative");
        } else {
          player.tell("§cMissing permissions");
        }
        break;
      case "gms":
        if (player.hasTag("Admin")) {
          player.runCommandAsync("gamemode survival");
        } else {
          player.tell("§cMissing permissions");
        }
        break;
      case "gma":
        if (player.hasTag("Admin")) {
          player.runCommandAsync("gamemode adventure");
        } else {
          player.tell("§cMissing permissions");
        }
        break;
      case "gmspec":
        if (player.hasTag("Admin")) {
          player.runCommandAsync("gamemode spectator");
        } else {
          player.tell("§cMissing permissions");
        }
        break;
      case "spawn":
        player.runCommandAsync(`tag @s add spawn`);
        break;
      case "shop":
        player.runCommandAsync(`tag @s add shop`);
        break;
      case "sell":
        player.runCommandAsync(`tag @s add sell`);
        break;
      case "plots":
        player.runCommandAsync(`tag @s add plots`);
        break;
      case "donation":
        player.runCommandAsync(`tag @s add dono`);
        break;
      case "enchants":
        player.runCommandAsync(`tag @s add ench`);
        break;
      case "customcrafting":
        player.runCommandAsync(`tag @s add ccrafting`);
        break;
      case "help":
        player.runCommandAsync(`tag @s add help`);
        break;
      default:
        player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§c§l'${message}'§f§r is an unavailable command!\n§bTry '+help' For More Information"}]}`);
        break;
    }
  }
});
