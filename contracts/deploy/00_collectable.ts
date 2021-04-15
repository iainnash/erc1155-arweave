module.exports = async ({getNamedAccounts, deployments}: any) => {
    const {deploy} = deployments;
    const {deployer} = await getNamedAccounts();
    // const balance = await deployer.getBalance();
    // console.log(balance);
    await deploy('Collectable', {
      from: deployer,
      args: ["ARWeaveCollectable", true], // first arg: should anyone mint
      log: true,
    });
  };
  module.exports.tags = ['Collectable'];