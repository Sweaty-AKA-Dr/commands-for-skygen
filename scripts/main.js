import { world } from "@minecraft/server";

const prefix = "+";

world.events.beforeChat.subscribe((eventData) => {
  const player = data.sender;
  const message = data.message;

  if (message.startsWith(prefix)) {
    data.cancel = true;
    switch (message.slice(1).toLowerCase()) {
      case "gmc":
        player.runCommandAsync(`gamemode creative`);
        break;
      case "gms":
        player.runCommandAsync(`gamemode survival`);
        break;
      case "gma":
        player.runCommandAsync(`gamemode adventure`);
        break;
      case "gmspec":
        player.runCommandAsync(`gamemode spectator`);
        break;
      case "warp spawn":
        player.runCommandAsync(`tag @s add spawn`);
        break;
      case "warp shop":
        player.runCommandAsync(`tag @s add shop`);
        break;
      case "warp sell":
        player.runCommandAsync(`tag @s add sell`);
        break;
      case "warp plots":
        player.runCommandAsync(`tag @s add plots`);
        break;
      case "warp donation":
        player.runCommandAsync(`tag @s add dono`);
        break;
      case "warp enchants":
        player.runCommandAsync(`tag @s add ench`);
        break;
      case "warp spawn":
        player.runCommandAsync(`tag @s add `);
        break;
      default:
        player.tell(`Unavailable command!`);
        break;
    }
  }
});
