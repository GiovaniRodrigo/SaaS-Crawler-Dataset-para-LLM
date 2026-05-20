import { useEffect } from 'react';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import useTranslation from '@/Hooks/useTranslation';
import { usePage } from '@inertiajs/react';

export default function OnboardingTour() {
    const { t } = useTranslation();
    const { url } = usePage();

    const getPageInfo = (urlPath: string) => {
        // Remove trailing slashes and query parameters/hashes
        const cleanUrl = urlPath.split('?')[0].split('#')[0];
        
        if (cleanUrl === '/dashboard') {
            return {
                key: 'dashboard',
                steps: [
                    {
                        popover: {
                            title: t('messages.onboarding.dashboard_welcome_title'),
                            description: t('messages.onboarding.dashboard_welcome_desc'),
                        }
                    },
                    { 
                        element: '#org-selector', 
                        popover: { 
                            title: t('messages.onboarding.dashboard_org_title'), 
                            description: t('messages.onboarding.dashboard_org_desc'),
                            side: "bottom",
                            align: 'start'
                        } 
                    },
                    { 
                        element: '#global-search', 
                        popover: { 
                            title: t('messages.onboarding.dashboard_search_title'), 
                            description: t('messages.onboarding.dashboard_search_desc'),
                            side: "bottom",
                            align: 'start'
                        } 
                    },
                    { 
                        element: '#nav-projects', 
                        popover: { 
                            title: t('messages.onboarding.dashboard_projects_title'), 
                            description: t('messages.onboarding.dashboard_projects_desc'),
                            side: "right",
                            align: 'start'
                        } 
                    }
                ]
            };
        }
        
        if (cleanUrl.startsWith('/projects')) {
            // Check if it is details page like /projects/1
            const isDetails = /^\/projects\/\d+$/.test(cleanUrl);
            if (isDetails) {
                return {
                    key: 'project_show',
                    steps: [
                        {
                            popover: {
                                title: t('messages.onboarding.project_show_welcome_title'),
                                description: t('messages.onboarding.project_show_welcome_desc'),
                            }
                        },
                        { 
                            element: '#project-tabs', 
                            popover: { 
                                title: t('messages.onboarding.project_show_tabs_title'), 
                                description: t('messages.onboarding.project_show_tabs_desc'),
                                side: "bottom",
                                align: 'start'
                            } 
                        },
                        { 
                            element: '#execute-crawl-btn', 
                            popover: { 
                                title: t('messages.onboarding.project_show_execute_title'), 
                                description: t('messages.onboarding.project_show_execute_desc'),
                                side: "bottom",
                                align: 'start'
                            } 
                        }
                    ]
                };
            }
            
            // Otherwise, project list page
            return {
                key: 'projects_list',
                steps: [
                    {
                        popover: {
                            title: t('messages.onboarding.projects_welcome_title'),
                            description: t('messages.onboarding.projects_welcome_desc'),
                        }
                    },
                    { 
                        element: '#create-project-btn', 
                        popover: { 
                            title: t('messages.onboarding.projects_new_title'), 
                            description: t('messages.onboarding.projects_new_desc'),
                            side: "left",
                            align: 'start'
                        } 
                    }
                ]
            };
        }
        
        if (cleanUrl.startsWith('/domains')) {
            return {
                key: 'domains',
                steps: [
                    {
                        popover: {
                            title: t('messages.onboarding.domains_welcome_title'),
                            description: t('messages.onboarding.domains_welcome_desc'),
                        }
                    },
                    { 
                        element: '#sidebar-nav', 
                        popover: { 
                            title: t('messages.onboarding.domains_how_title'), 
                            description: t('messages.onboarding.domains_how_desc'),
                            side: "right",
                            align: 'start'
                        } 
                    }
                ]
            };
        }
        
        if (cleanUrl.startsWith('/crawl-jobs')) {
            return {
                key: 'jobs',
                steps: [
                    {
                        popover: {
                            title: t('messages.onboarding.jobs_welcome_title'),
                            description: t('messages.onboarding.jobs_welcome_desc'),
                        }
                    }
                ]
            };
        }
        
        if (cleanUrl.startsWith('/review') || cleanUrl.startsWith('/documents/review')) {
            return {
                key: 'review',
                steps: [
                    {
                        popover: {
                            title: t('messages.onboarding.review_welcome_title'),
                            description: t('messages.onboarding.review_welcome_desc'),
                        }
                    },
                    { 
                        element: '#review-table', 
                        popover: { 
                            title: t('messages.onboarding.review_table_title'), 
                            description: t('messages.onboarding.review_table_desc'),
                            side: "top",
                            align: 'start'
                        } 
                    }
                ]
            };
        }
        
        if (cleanUrl.startsWith('/settings/datasets')) {
            return {
                key: 'datasets',
                steps: [
                    {
                        popover: {
                            title: t('messages.onboarding.datasets_welcome_title'),
                            description: t('messages.onboarding.datasets_welcome_desc'),
                        }
                    }
                ]
            };
        }
        
        return null;
    };

    useEffect(() => {
        let timer: any;

        const startTour = (force = false) => {
            const pageInfo = getPageInfo(url);
            if (!pageInfo) return;

            const hasCompletedPageTour = localStorage.getItem('onboarding_completed_' + pageInfo.key);
            if (!force && hasCompletedPageTour) return;

            // Safe elements validation to avoid driver.js selector errors
            const activeSteps = pageInfo.steps.filter(step => {
                if (!step.element) return true;
                return document.querySelector(step.element) !== null;
            });

            if (activeSteps.length === 0) return;

            const driverObj = driver({
                showProgress: true,
                nextBtnText: t('messages.onboarding.next'),
                prevBtnText: t('messages.onboarding.prev'),
                doneBtnText: t('messages.onboarding.done'),
                steps: activeSteps as any,
                onDestroyStarted: () => {
                    localStorage.setItem('onboarding_completed_' + pageInfo.key, 'true');
                    driverObj.destroy();
                }
            });

            driverObj.drive();
        };

        const handleForceStart = () => {
            startTour(true);
        };

        window.addEventListener('start-onboarding-tour', handleForceStart);

        // Auto-run if not completed yet
        const pageInfo = getPageInfo(url);
        if (pageInfo) {
            const hasCompletedPageTour = localStorage.getItem('onboarding_completed_' + pageInfo.key);
            if (!hasCompletedPageTour) {
                timer = setTimeout(() => {
                    startTour(false);
                }, 1000);
            }
        }

        return () => {
            window.removeEventListener('start-onboarding-tour', handleForceStart);
            if (timer) clearTimeout(timer);
        };
    }, [url, t]);

    return null;
}
