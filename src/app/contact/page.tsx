"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    privacy: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast({
        title: "Message envoyé !",
        description: "Nous vous répondrons bientôt.",
      })
      
      setFormData({
        name: '',
        email: '',
        message: '',
        privacy: false,
      })
      
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Veuillez réessayer plus tard.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="container mx-auto px-4 py-20">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 text-4xl font-bold">Contactez-nous</h1>
        <p className="mb-8 text-muted-foreground">
          Notre équipe est à votre écoute pour répondre à toutes vos questions.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Nom complet *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="message">Message *</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="min-h-[150px]"
                required
              />
            </div>
            
            <div className="flex items-start space-x-2">
              <Checkbox
                id="privacy"
                checked={formData.privacy}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, privacy: !!checked }))}
                required
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="privacy"
                  className="text-sm font-medium leading-none"
                >
                  J'accepte la politique de confidentialité *
                </label>
              </div>
            </div>
          </div>
          
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
          </Button>
        </form>
        
        <div className="mt-16 border-t pt-12">
          <h2 className="mb-6 text-2xl font-bold">Nos coordonnées</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="mb-2 font-semibold">Email</h3>
              <a href="mailto:contact@edenshuu.com" className="text-muted-foreground hover:underline">
                contact@edenshuu.com
              </a>
            </div>
            <div>
              <h3 className="mb-2 font-semibold">Téléphone</h3>
              <a href="tel:+33123456789" className="text-muted-foreground hover:underline">
                +33 1 23 45 67 89
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
