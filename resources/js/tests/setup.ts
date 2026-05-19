import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock Ziggy's route function
const routeMock: any = vi.fn((name) => {
    if (!name) {
        return {
            current: vi.fn(() => false),
        };
    }
    const routes: Record<string, string> = {
        'dashboard': '/dashboard',
        'login': '/login',
        'register': '/register',
        'projects.index': '/projects',
        'projects.create': '/projects/create',
        'projects.show': '/projects/1',
        'projects.edit': '/projects/1/edit',
        'profile.edit': '/profile',
        'logout': '/logout',
    };
    return routes[name] || name;
});

routeMock.current = vi.fn(() => false);

vi.stubGlobal('route', routeMock);

// Mock URL for jsdom
vi.stubGlobal('URL', class extends URL {
    constructor(url: string | URL, base?: string | URL) {
        try {
            super(url, base || 'http://localhost');
        } catch (e) {
            super('http://localhost' + url, 'http://localhost');
        }
    }
});
