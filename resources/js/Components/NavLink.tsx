import NavLinkMolecule from './molecules/NavLink';
import { InertiaLinkProps } from '@inertiajs/react';

export default function NavLink(props: InertiaLinkProps & { active: boolean }) {
    return <NavLinkMolecule {...props} />;
}
