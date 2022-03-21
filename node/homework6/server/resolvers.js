const resolvers = {
    Query: {
        allParrots: (_, __, { dataSources }) => dataSources.parrotsAPI.getAllParrots(),
        parrot: (_, { parrotId }, { dataSources }) => dataSources.parrotsAPI.getParrotById({ parrotId }),
    },
    Mutation: {
        addNewParrot: async (_, { newParrot }, { dataSources }) => {
            const parrots = await dataSources.parrotsAPI.addNewParrot({ newParrot });
        
            if (!parrots) {
                return {
                    success: false,
                    message: 'failed to add a new parrot',
                };
            }
    
            return {
              success: true,
              message: 'the parrot is added',
              parrots,
            };
        },
        updateParrot: async (_, { args: { parrotId, newData } }, { dataSources }) => {
            const parrots = await dataSources.parrotsAPI.updateParrot({ parrotId, newData });
        
            if (!parrots) {
                return {
                    success: false,
                    message: 'failed to update the parrot',
                };
            }
    
            return {
              success: true,
              message: 'the parrot is updated',
              parrots,
            };
        },
        deleteParrot: async (_, { parrotId }, { dataSources }) => {
            const parrots = await dataSources.parrotsAPI.deleteParrotById({ parrotId });
        
            if (!parrots) {
                return {
                    success: false,
                    message: 'failed to delete the parrot',
                };
            }
    
            return {
              success: true,
              message: 'the parrot is deleted',
              parrots,
            };
        },
    },

    
};

module.exports = resolvers;