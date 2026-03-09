export type User = {
  id: string
  email: string
  password: string
}

export type OrbitProfile = {
  id: string
  name: string
  company?: string
  role?: string
  interests?: string[]
  projects?: string[]
  goals?: string[]
  location?: string
}

export type OrbitConversationMessage = {
  id: string
  from: 'you' | 'them'
  text: string
  createdAt: string
}

export type OrbitConversation = {
  id: string
  profileId?: string
  topic?: string
  category?: string
  liked?: boolean
  messages: OrbitConversationMessage[]
  lastUpdated: string
}

export type OrbitUserProfile = {
  id: string
  name: string
  email?: string
  company?: string
  role?: string
  interests?: string[]
  skills?: string[]
  goals?: string[]
  location?: string
  projects?: string[]
}

export type OrbitData = {
  myProfile?: OrbitUserProfile
  profiles: OrbitProfile[]
  conversations: OrbitConversation[]
}

