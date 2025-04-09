"use client"
import { useState } from 'react';
import { supabase } from "../utils/supabase";

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSendResetLink = async (e) => {
    e.preventDefault()

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:3000/reset_password',
    })

    if (error) {
      setMessage(error.message)
    } else {
      setMessage('Password reset link sent! Check your email.')
    }
  }

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSendResetLink}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Link</button>
      </form>
      <p>{message}</p>
    </div>
  )
}
