export const ModalAction = {
    Edit: 'edit',
    Delete: 'delete',
} as const;

export type ModalActionType =
    typeof ModalAction[keyof typeof ModalAction];