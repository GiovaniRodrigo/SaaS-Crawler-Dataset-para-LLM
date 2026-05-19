import ResponsiveNavLinkMolecule from './molecules/ResponsiveNavLink';
import { InertiaLinkProps } from '@inertiajs/react';

export default function ResponsiveNavLink(props: InertiaLinkProps & { active?: boolean }) {
    return <ResponsiveNavLinkMolecule {...props} />;
}
