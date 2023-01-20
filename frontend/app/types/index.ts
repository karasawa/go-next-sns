export type User = {
  username: string
}

export type Chat = {
  ID: number
  CreatedAt: Date
  UpdatedAt: Date
  DeletedAt: Date | null
  message: string
  username: string
}
