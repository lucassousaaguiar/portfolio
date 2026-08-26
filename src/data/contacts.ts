export interface ContactLink {
  id: 'email' | 'whatsapp' | 'linkedin' | 'github'
  label: string
  value: string
  href: string
}

export const contacts: ContactLink[] = [
  { id: 'email', label: 'E-mail', value: 'lucassousaaguiar@gmail.com', href: 'mailto:lucassousaaguiar@gmail.com' },
  { id: 'whatsapp', label: 'WhatsApp', value: '+55 (31) 9 0000-0000', href: 'https://wa.me/5531900000000' },
  { id: 'linkedin', label: 'LinkedIn', value: 'linkedin.com/in/lucassousaaguiar', href: 'https://www.linkedin.com/in/lucassousaaguiar' },
  { id: 'github', label: 'GitHub', value: 'github.com/lucassousaaguiar', href: 'https://github.com/lucassousaaguiar' },
]

export const skills = ['React', 'TypeScript', 'JavaScript', 'Node.js', 'Python', 'C', 'SQL', 'Supabase', 'Git/GitHub', 'HTML/CSS']
