export type Member = {
    userId: string
    teamId: string
    role: "owner" | "member"
    name: string
}