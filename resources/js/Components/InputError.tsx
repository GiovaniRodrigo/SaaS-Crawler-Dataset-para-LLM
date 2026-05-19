import InputErrorAtom from './atoms/InputError';
import { HTMLAttributes } from 'react';

export default function InputError(props: HTMLAttributes<HTMLParagraphElement> & { message?: string }) {
    return <InputErrorAtom {...props} />;
}
