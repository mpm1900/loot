export const characterAvatarSource = {
    beginDrag(props) {
        return {
            index: props.index,
            id: props.character.__uuid,
        }
    }
}