const system = server.registerSystem(0, 0);

system.listenForEvent("minecraft:player_message", (eventData) => {
  const message = eventData.data.message;
  const message = eventData.data.message.toLowerCase;
  const player = eventData.data.sender;

  if (message === "-spawn") {
    system.executeCommand(`tag "${player.name}" add spawn`, () => {});
    eventData.canceled = true;
  } else if (message === "-sell") {
    system.executeCommand(`tag "${player.name}" add sell`, () => {});
    eventData.canceled = true;
  } else if (message === "-shop") {
    system.executeCommand(`tag "${player.name}" add shop`, () => {});
    eventData.canceled = true;
  } else if (message === "-plots") {
    system.executeCommand(`tag "${player.name}" add plots`, () => {});
    eventData.canceled = true;
  } else if (message === "-parkour") {
    system.executeCommand(`tag "${player.name}" add parkour`, () => {});
    eventData.canceled = true;
  } else if (message === "-misc") {
    system.executeCommand(`tag "${player.name}" add misc`, () => {});
    eventData.canceled = true;
  } else if (message === "-donoinfo") {
    system.executeCommand(`tag "${player.name}" add dono`, () => {});
    eventData.canceled = true;
  } else if (message === "-enchants") {
    system.executeCommand(`tag "${player.name}" add ench`, () => {});
    eventData.canceled = true;
  } else if (message === "-help") {
    system.executeCommand(`tag "${player.name}" add help`, () => {});
    eventData.canceled = true;
  } else if (message === "-vipsell") {
    system.executeCommand(
      `tag @a[name="${player.name}",tag=vip] add vipsell`,
      () => {}
    );
    eventData.canceled = true;
  } else if (message === "-cmds") {
    system.executeCommand(
      `tag @a[name="${player.name}",tag=Admin] add cmds`,
      () => {}
    );
    eventData.canceled = true;
  }
});
