import resolver from './resolver';
import mutations from './mutations';

export default {
    name: 'registered_libraries',
    mutations: {
        addLibrary: new resolver().add,
    },
    mutationScheme: mutations,
};