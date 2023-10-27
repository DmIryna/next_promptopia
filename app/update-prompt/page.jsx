"use client"

import Form from "@components/Form"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const UpdatePrompt = () => {
  const router = useRouter()

  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  })
  const searchParams = useSearchParams()
  const promptId = searchParams.get("id")

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`)
      const data = await response.json()

      setPost({
        prompt: data.prompt,
        tag: data.tag,
      })
    }

    if (promptId) getPromptDetails()
  }, [promptId])

  const updatePrompt = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    if (!promptId) alert("Prompt id missing")

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      })

      if (response.ok) router.push("/")
    } catch (err) {
      console.log(err)
    } finally {
      setSubmitting(false)
    }
  }
  {
    console.log(post)
  }
  return (
    <Form
      type="Update"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  )
}

export default UpdatePrompt
