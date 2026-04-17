import { Generator } from "@tanstack/router-generator";
async function generate(config, root) {
  try {
    const generator = new Generator({
      config,
      root
    });
    await generator.run();
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
export {
  generate
};
//# sourceMappingURL=generate.js.map
