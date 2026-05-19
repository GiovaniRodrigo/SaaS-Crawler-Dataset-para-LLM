import ModalOrganism, { ModalProps } from './organisms/Modal';
import { PropsWithChildren } from 'react';

export default function Modal(props: PropsWithChildren<ModalProps>) {
    return <ModalOrganism {...props} />;
}
