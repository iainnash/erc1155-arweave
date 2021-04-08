module.exports = async ({getNamedAccounts, deployments}: any) => {
    const {deploy} = deployments;
    const {deployer} = await getNamedAccounts();
    const collectable = await deployments.get('Collectable');
    await deploy('Marketplace', {
      from: deployer,
      args: [collectable.address],
      log: true,
    });
  };
  module.exports.tags = ['Marketplace'];
  module.exports.dependencies = ['Collectable'];