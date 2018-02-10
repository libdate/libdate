import MessagingService from '../../services/MessagingService';
export default class RegistredLibrariesResolver {
    constructor() {
        this.messagingService = new MessagingService;
        this.add = this.add.bind(this);
    }

    add({libraryName, userId}) {
        let result;
        try {
            result = this.messagingService.subscribe(libraryName, userId);
        }
        catch(error) {
            console.error(error);
            throw error;
        }
        
        return result;
    }

    delete({libraryName, userId}) {
        return this.messagingService.unsubscribe(libraryName, userId);
    }
}