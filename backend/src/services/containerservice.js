const { createContainer, asValue } = require('awilix');

const container = createContainer();

function registerDependency(name, instance) {
    container.register({
        [name]: asValue(instance)
    });
}

module.exports = {
    resolve: container.resolve.bind(container),
    registerDependency
};
