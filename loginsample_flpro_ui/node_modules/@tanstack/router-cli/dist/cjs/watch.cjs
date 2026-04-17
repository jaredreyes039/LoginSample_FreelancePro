"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const chokidar = require("chokidar");
const routerGenerator = require("@tanstack/router-generator");
function watch(root) {
  const configPath = routerGenerator.resolveConfigPath({
    configDirectory: root
  });
  const configWatcher = chokidar.watch(configPath);
  let watcher = new chokidar.FSWatcher({});
  const generatorWatcher = () => {
    const config = routerGenerator.getConfig();
    const generator = new routerGenerator.Generator({ config, root });
    watcher.close();
    console.info(`TSR: Watching routes (${config.routesDirectory})...`);
    watcher = chokidar.watch(config.routesDirectory);
    watcher.on("ready", async () => {
      const handle = async () => {
        try {
          await generator.run();
        } catch (err) {
          console.error(err);
          console.info();
        }
      };
      await handle();
      watcher.on("all", (event, path) => {
        let type;
        switch (event) {
          case "add":
            type = "create";
            break;
          case "change":
            type = "update";
            break;
          case "unlink":
            type = "delete";
            break;
        }
        if (type) {
          return generator.run({ path, type });
        }
        return generator.run();
      });
    });
  };
  configWatcher.on("ready", generatorWatcher);
  configWatcher.on("change", generatorWatcher);
}
exports.watch = watch;
//# sourceMappingURL=watch.cjs.map
