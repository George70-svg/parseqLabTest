import { createWebHistory, createRouter } from "vue-router";

import analyzesPage from "@/components/pages/analyzesPage/analyzesPage";
import geneticPage from "@/components/pages/geneticPage/geneticPage";
import launchesPage from "@/components/pages/launchesPage/launchesPage";

const routes = [
    {
        path: '/parseqLabTest',
        name: 'geneticPage',
        component: geneticPage
    },
    {
        path: '/analyzes',
        name: 'analyzesPage',
        component: analyzesPage
    },
    {
        path: '/launches',
        name: 'launchesPage',
        component: launchesPage
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;