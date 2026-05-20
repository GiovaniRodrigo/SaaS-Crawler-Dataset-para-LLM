import { useEffect } from 'react';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import useTranslation from '@/Hooks/useTranslation';

export default function OnboardingTour() {
    const { t } = useTranslation();

    useEffect(() => {
        const startTour = () => {
            const driverObj = driver({
                showProgress: true,
                nextBtnText: t('messages.onboarding.next'),
                prevBtnText: t('messages.onboarding.prev'),
                doneBtnText: t('messages.onboarding.done'),
                steps: [
                    { 
                        element: '#sidebar-nav', 
                        popover: { 
                            title: t('messages.onboarding.sidebar_title'), 
                            description: t('messages.onboarding.sidebar_desc'),
                            side: "right",
                            align: 'start'
                        } 
                    },
                    { 
                        element: '#org-selector', 
                        popover: { 
                            title: t('messages.onboarding.org_title'), 
                            description: t('messages.onboarding.org_desc'),
                            side: "bottom",
                            align: 'start'
                        } 
                    },
                    { 
                        element: '#global-search', 
                        popover: { 
                            title: t('messages.onboarding.search_title'), 
                            description: t('messages.onboarding.search_desc'),
                            side: "bottom",
                            align: 'start'
                        } 
                    },
                    { 
                        element: '#create-project-btn', 
                        popover: { 
                            title: t('messages.onboarding.project_title'), 
                            description: t('messages.onboarding.project_desc'),
                            side: "left",
                            align: 'start'
                        } 
                    }
                ],
                onDestroyStarted: () => {
                    localStorage.setItem('onboarding_completed', 'true');
                    driverObj.destroy();
                }
            });

            driverObj.drive();
        };

        window.addEventListener('start-onboarding-tour', startTour);

        const hasCompletedTour = localStorage.getItem('onboarding_completed');
        if (!hasCompletedTour) {
            setTimeout(startTour, 1000);
        }

        return () => window.removeEventListener('start-onboarding-tour', startTour);
    }, [t]);

    return null;
}
