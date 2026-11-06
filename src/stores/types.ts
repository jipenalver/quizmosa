import type { Database, Tables } from './database.types'

export type { Database }

export type Host = Tables<'hosts'>
export type QuestionnaireKind = Database['public']['Enums']['questionnaire_kind']
export type SessionStatus = Database['public']['Enums']['session_status']

export type Questionnaire = Tables<'questionnaires'>
export type QuestionnaireWithCounts = Questionnaire & {
  questions: { count: number }[]
  sessions: { count: number }[]
}
export type QuestionnaireInput = Pick<Questionnaire, 'name' | 'kind' | 'seconds_per_question'> & {
  id: number | null
}

export type ChoiceKey = 'A' | 'B' | 'C' | 'D'
export type Question = Tables<'questions'>
export type QuestionWithKey = Question & {
  question_keys: { correct_choice: string } | null
}
export type QuestionInput = {
  id: number | null
  questionnaireId: number
  prompt: string
  // The saved path. A new file replaces it, and null removes it.
  imagePath: string | null
  previousImagePath: string | null
  imageFile: File | null
  choices: Record<ChoiceKey, string>
  correct: ChoiceKey
  points: number
  secondsOverride: number | null
}

// One question in the JSON import format.
export type QuestionImportRow = {
  prompt: string
  choices: Partial<Record<ChoiceKey, string>>
  answer: ChoiceKey
  points?: number
  seconds?: number
}

export type HostSession = Tables<'sessions'> & {
  questionnaires: Pick<Questionnaire, 'name' | 'kind'> | null
}
export type HostSessionWithCounts = HostSession & {
  participants: { count: number }[]
}
export type Participant = Tables<'participants'>

export type SessionReportQuestion = {
  question_id: number
  position: number
  prompt: string
  answered: number
  correct: number
  accuracy: number | null
  average_response_ms: number | null
}
export type SessionReport = {
  scores: number[]
  questions: SessionReportQuestion[]
}

export type PlaySession = Pick<
  Tables<'sessions'>,
  'id' | 'status' | 'current_question_id' | 'question_started_at' | 'question_ends_at'
>
export type PlayParticipant = Pick<Participant, 'id' | 'display_name' | 'is_kicked'>
export type PlayQuestion = Pick<
  Question,
  'id' | 'prompt' | 'image_path' | 'choice_a' | 'choice_b' | 'choice_c' | 'choice_d'
>
// Pre-tests only carry kind and points_so_far. get_reveal returns null outside a reveal.
export type PlayReveal = {
  kind: QuestionnaireKind
  points_so_far: number
  correct_choice?: string
  my_answer?: {
    selected_choice: string
    is_correct: boolean
    points_awarded: number
  } | null
  counts?: Record<string, number>
}
export type LeaderboardRow = Database['public']['Functions']['get_leaderboard']['Returns'][number]

export type HistoryRow = Database['public']['Functions']['get_history']['Returns'][number]
export type ParticipantOverviewRow =
  Database['public']['Functions']['get_participants_overview']['Returns'][number]
