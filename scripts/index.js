import { world } from "@minecraft/server";

const rank_prefix = "rank:";
const default_rank = "§6Member";
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
  data.cancel = true
  data.sendToTargets = true;
  data.targets() = [];
  const ranks = getRanks(player);
  if (player.hasTag("adminchat")) {
    overworld.runCommandAsync(
      `tellraw @a[tag=admin] {"rawtext":[{"text":"§8[§4Admin§8] §7${player.name}: §f${message}"}]}`
    );
  } else
    world.sendMessage(
      `§8[§f${ranks}§8] §7${player.name}: §f${message}`
    );
});
