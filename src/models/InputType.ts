export const InputType = {
    Text: 'input',
    Textarea: 'textarea'
} as const;

export type InputType =
    typeof InputType[keyof typeof InputType];