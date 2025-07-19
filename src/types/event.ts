export interface Event {
  id: string
  title: string
  date: Date | string
  image: string
  description: string
  location: string
  isBookmarked?: boolean
  timeZone?: string | undefined
}
