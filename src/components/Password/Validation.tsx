import * as React from "react";

type ValueType = string | number | string[];
type ValidatorType = (value?: ValueType) => string | undefined;

interface RequireInputProps {
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    error?: string;
    value?: ValueType;
}

interface ValidatedInputProps {
    validators?: ValidatorType[];
}

interface ValidatedInputState {
    finalized: boolean;
}

export default function Validation<InputProps extends RequireInputProps>(
    InputComponent: React.ComponentType<InputProps>,
    staticValidators: ValidatorType[] = [],
    ) {
        return class InputWithValidation extends React.Component<InputProps & ValidatedInputProps & ValidatedInputState> {
            state: ValidatedInputState = {finalized: false};

            handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                this.setState({finalized: false});
            };
        };
}