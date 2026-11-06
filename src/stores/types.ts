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
