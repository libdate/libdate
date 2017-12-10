import Router from 'koa-router';
import NpmController from './../../controllers/NpmController';

const npmController = new NpmController();

export function initializeNpmRoutes() {
    const router = new Router({
        prefix: '/npm'
    });
    
    router.get('/version-times/:library', npmController.getLibraryVersionTimes);
    router.get('/latest/:library', npmController.getLatestVersion);
    router.get('/:library/:property?', npmController.getLibraryData);
    
    return router;
}