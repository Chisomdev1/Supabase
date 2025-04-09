"use client"
import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function page() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser()

      if (error || !data.user) {
        router.push('/login')
      } else {
        setUser(data.user)
      }

      setLoading(false)
    }

    getUser()
  }, [])

  if (loading) return <p>Loading...</p>
  return (
    <div>
      <h1>Dashboard</h1>
      {user && <p>Welcome, {user.email}</p>}
      <button
        onClick={async () => {
          await supabase.auth.signOut()
          router.push('/login')
        }}
      >
        Logout
      </button>
    </div>
  )
}

