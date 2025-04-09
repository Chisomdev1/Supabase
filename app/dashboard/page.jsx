"use client"
import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';
import { useRouter } from 'next/router'

export default function page() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      if (!data?.user) {
        router.push('/login')
      } else {
        setUser(data.user)
      }
    }
    getUser()
  }, [])

  return <div>{user ? <h2>Welcome, {user.email}</h2> : <p>Loading...</p>}</div>
}
