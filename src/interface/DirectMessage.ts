export default interface DirectMessage {
    id: number,
    user_id: number,
    action_user_id: number,
    content: string,
    created_at: string,
    read: boolean
}