export interface VoiceData {
  id: string
  name: string
  title: string
  languages: string[]
  gender: 'FEMALE' | 'MALE'
  style: 'WARM' | 'PROFESSIONAL' | 'CONVERSATIONAL' | 'ENERGETIC' | 'CALM'
  description: string
  gradient: string
  tags?: string[]
  latency: string
  quality: string
}

export const voicesData: VoiceData[] = [
  {
    id: 'aarohi',
    name: 'Aarohi',
    title: 'Warm Hindi conversationalist',
    languages: ['Hindi', 'English'],
    gender: 'FEMALE',
    style: 'WARM',
    description: 'A warm, naturally paced voice designed for customer conversations and assistants.',
    gradient: 'linear-gradient(135deg, #FF6B35, #FF3CAC)',
    tags: ['POPULAR'],
    latency: '~320ms',
    quality: '98%'
  },
  {
    id: 'kabir',
    name: 'Kabir',
    title: 'Professional bilingual agent',
    languages: ['Hindi', 'English'],
    gender: 'MALE',
    style: 'PROFESSIONAL',
    description: 'Clear and authoritative, perfect for banking, healthcare, and formal inquiries.',
    gradient: 'linear-gradient(135deg, #4F46E5, #0EA5E9)',
    latency: '~290ms',
    quality: '99%'
  },
  {
    id: 'meera',
    name: 'Meera',
    title: 'Conversational Tamil guide',
    languages: ['Tamil', 'English'],
    gender: 'FEMALE',
    style: 'CONVERSATIONAL',
    description: 'Highly expressive and energetic, ideal for retail and everyday consumer interactions.',
    gradient: 'linear-gradient(135deg, #10B981, #3B82F6)',
    tags: ['NEW'],
    latency: '~310ms',
    quality: '97%'
  },
  {
    id: 'arjun',
    name: 'Arjun',
    title: 'Energetic Hinglish presenter',
    languages: ['English', 'Hinglish'],
    gender: 'MALE',
    style: 'ENERGETIC',
    description: 'Upbeat and modern, designed for engaging younger demographics and sales flows.',
    gradient: 'linear-gradient(135deg, #F59E0B, #EF4444)',
    latency: '~340ms',
    quality: '96%'
  },
  {
    id: 'kavya',
    name: 'Kavya',
    title: 'Warm Telugu assistant',
    languages: ['Telugu', 'English'],
    gender: 'FEMALE',
    style: 'WARM',
    description: 'Soft-spoken and highly articulate for supportive healthcare and education apps.',
    gradient: 'linear-gradient(135deg, #8B5CF6, #EC4899)',
    latency: '~330ms',
    quality: '98%'
  },
  {
    id: 'rohan',
    name: 'Rohan',
    title: 'Professional Marathi voice',
    languages: ['Marathi', 'Hindi'],
    gender: 'MALE',
    style: 'PROFESSIONAL',
    description: 'Trustworthy tone tailored for insurance, finance, and regional government services.',
    gradient: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
    latency: '~300ms',
    quality: '99%'
  },
  {
    id: 'ananya',
    name: 'Ananya',
    title: 'Calm Bengali narrator',
    languages: ['Bengali', 'English'],
    gender: 'FEMALE',
    style: 'CALM',
    description: 'Soothing and measured, great for complex instructions and long-form information.',
    gradient: 'linear-gradient(135deg, #14B8A6, #3B82F6)',
    latency: '~315ms',
    quality: '98%'
  },
  {
    id: 'harpreet',
    name: 'Harpreet',
    title: 'Conversational Punjabi agent',
    languages: ['Punjabi', 'Hindi'],
    gender: 'MALE',
    style: 'CONVERSATIONAL',
    description: 'Friendly and relatable, designed for logistics, agriculture, and local commerce.',
    gradient: 'linear-gradient(135deg, #F59E0B, #10B981)',
    tags: ['BETA'],
    latency: '~360ms',
    quality: '95%'
  },
  {
    id: 'nisha',
    name: 'Nisha',
    title: 'Warm Kannada companion',
    languages: ['Kannada', 'English'],
    gender: 'FEMALE',
    style: 'WARM',
    description: 'Empathetic and clear for regional customer support and booking services.',
    gradient: 'linear-gradient(135deg, #F43F5E, #F59E0B)',
    latency: '~310ms',
    quality: '97%'
  },
  {
    id: 'vikram',
    name: 'Vikram',
    title: 'Professional Malayalam guide',
    languages: ['Malayalam', 'English'],
    gender: 'MALE',
    style: 'PROFESSIONAL',
    description: 'Deep and resonant, best suited for news reading and corporate notifications.',
    gradient: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
    latency: '~325ms',
    quality: '98%'
  }
]
