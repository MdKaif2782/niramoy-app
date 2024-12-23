export interface AIQuery {
    id: number
    ai_response_id: number
    diet_plan_id: number
    user_id: string
    created_at: string
    ai_response: AiResponse
    exercises: Exercise[]
    diet_plan: DietPlan
    mood?: Mood
  }
  
  export interface AiResponse {
    id: number
    conversation_id: number
    content: string
    created_at: string
  }
  
  export interface Exercise {
    id: number
    user_id: string
    name: string
    description: string
    category: string
    duration_minutes: number
    completed: boolean
    youtube_link: string
    created_at: string
    response_id: number
  }
  
  export interface DietPlan {
    id: number
    name: string
    description: string
    calorie_target: number
    created_at: string
    meals: Meal[]
  }
  
  export interface Meal {
    id: number
    dietPlanId: number
    user_id: string
    type: string
    items: string
    recipe_description: string
    completed: boolean
    youtube_link: string
  }
  
export interface Mood {
  id: number
  user_id: string
  mood: string
  responseId: number
  date: string
}