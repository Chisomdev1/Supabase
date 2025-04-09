"use client"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from "./utils/Supabase";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()

  useEffect(() => {
    // Supabase automatically sets session when the reset link is opened
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        setMessage('Invalid or expired reset link')
      }
    })
  }, [])

  const handleReset = async (e) => {
    e.preventDefault()

    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    })

    if (error) {
      setMessage(error.message)
    } else {
      setMessage('Password updated! Redirecting to login...')
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    }
  }

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleReset}>
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      <p>{message}</p>
    </div>
  )
}
