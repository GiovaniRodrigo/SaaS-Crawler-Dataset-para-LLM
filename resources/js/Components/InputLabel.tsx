import InputLabelAtom from './atoms/InputLabel';
import { LabelHTMLAttributes } from 'react';

export default function InputLabel(props: LabelHTMLAttributes<HTMLLabelElement> & { value?: string }) {
    return <InputLabelAtom {...props} />;
}
