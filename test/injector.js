/** @var artifacts {Array} */
/** @var web3 {Web3} */
/** @function contract */
/** @function it */
/** @function before */
/** @var assert */

const {newMockContract} = require("./helper");

const Deployer = artifacts.require("Deployer");
const Governance = artifacts.require("Governance");
const Parlia = artifacts.require("Parlia");

contract("Injector", async (accounts) => {
  const [owner] = accounts
  it("migration is working fine", async () => {
    const {governance, deployer, parlia} = await newMockContract(owner);
    assert.equal(deployer.address, await deployer.getDeployer());
    assert.equal(deployer.address, await governance.getDeployer());
    assert.equal(deployer.address, await parlia.getDeployer());
    assert.equal(governance.address, await deployer.getGovernance());
    assert.equal(governance.address, await governance.getGovernance());
    assert.equal(governance.address, await parlia.getGovernance());
    assert.equal(parlia.address, await deployer.getParlia());
    assert.equal(parlia.address, await governance.getParlia());
    assert.equal(parlia.address, await parlia.getParlia());
  });
  it("consensus init is working", async () => {
    const testInjector = async (classType, ...args) => {
      const deployer = await classType.new(...args);
      await deployer.init()
      assert.equal(await deployer.getDeployer(), '0x0000000000000000000000000000000000000010')
      assert.equal(await deployer.getGovernance(), '0x0000000000000000000000000000000000000020')
      assert.equal(await deployer.getParlia(), '0x0000000000000000000000000000000000000030')
    }
    await testInjector(Deployer, [])
    await testInjector(Governance, owner, '1')
    await testInjector(Parlia, [], '0x0000000000000000000000000000000000000000', '0', '0', '0', '0', '0', '0')
  })
});
