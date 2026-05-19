import { forwardRef } from 'react';
import Input, { InputProps } from './atoms/Input';

export default forwardRef(function TextInput(props: InputProps, ref) {
    return <Input {...props} ref={ref as any} />;
});
