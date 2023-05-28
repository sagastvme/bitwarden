//router.js

import { createRouter, createWebHistory } from 'vue-router';
import TheTest from "./components/TheTest.vue";
import App from "./App.vue";
import TheLogin from "./components/TheLogin.vue";
import {useStore} from "vuex";



const router = createRouter({


    history: createWebHistory(),
    linkActiveClass: 'active',
    linkExactActiveClass: 'active',
    routes:[
        { path: '/', component: TheLogin },
        {
            path: '/info',
            component: TheTest,
            meta: { requiresAuth: true } // Add meta field for route metadata
        },
        { path: '/:notFound(.*)', redirect: '/'}
    ]
});

// Add a navigation guard
router.beforeEach((to, from, next) => {
    // Check if the route requires authentication
    if (to.meta.requiresAuth) {
        // Check if the user is authenticated (e.g., by checking if a token exists)
        const isAuthenticated = checkAuthentication(); // Implement your own authentication check logic

        if (isAuthenticated) {
            // User is authenticated, allow navigation to the protected route
            next();
        } else {
            // User is not authenticated, redirect to the login page or display an error
            next('/');
        }
    } else {
        // Route does not require authentication, allow navigation
        next();
    }
});

// Helper function to check if the user is authenticated
function checkAuthentication() {
   const store = useStore();
    // Implement your own logic to check if the user is authenticated
    // For example, you can check if a token exists in local storage or if the user is logged in
    // Return true if authenticated, false otherwise
    // Replace this with your own authentication check logic

    return !!(localStorage.getItem('loggedIn') === '1' || store.getters.log);



}





// Helper function to check if the user is authenticated

export default router;