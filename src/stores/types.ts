import type { Database, Tables } from './database.types'

export type { Database }

export type Host = Tables<'hosts'>
export type QuestionnaireKind = Database['public']['Enums']['questionnaire_kind']
export type SessionStatus = Database['public']['Enums']['session_status']
