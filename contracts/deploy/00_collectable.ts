module.exports = async ({getNamedAccounts, deployments}: any) => {
    const {deploy} = deployments;
    const {deployer} = await getNamedAccounts();
    await deploy('Collectable', {
      from: deployer,
      args: ["ARWeaveCollectable", true], // first arg: should anyone mint
      log: true,
    });
  };
  module.exports.tags = ['Collectable'];