export type Guide = {
  id: string
  name: string
}

// Edit this list to add guides or change their displayed titles.
export const guides: Guide[] = [
  { id: 'pw-staff', name: 'PW Staff' },
  { id: 'support', name: 'Support' },
  { id: 'manager', name: 'Manager' },
]

export function getGuideById(id: string) {
  return guides.find((guide) => guide.id === id)
}

export default guides
