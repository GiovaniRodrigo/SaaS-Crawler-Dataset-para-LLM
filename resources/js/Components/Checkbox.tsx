import CheckboxAtom from './atoms/Checkbox';
import { InputHTMLAttributes } from 'react';

export default function Checkbox(props: InputHTMLAttributes<HTMLInputElement>) {
    return <CheckboxAtom {...props} />;
}
