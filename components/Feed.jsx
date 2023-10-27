"use client"

import { useEffect, useState } from "react"
import PromptCard from "./PromptCard"

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [posts, setPosts] = useState([])
  const [searchText, setSearchText] = useState("")
  const [searchResults, setSearchResults] = useState([])

  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText, "i")
    return posts.filter(
      (post) =>
        regex.test(post.creator.username) ||
        regex.test(post.prompt) ||
        regex.test(post.tag)
    )
  }

  const handleSearchChange = (e) => {
    setSearchText(e.target.value)
    const searchResult = filterPrompts(e.target.value)
    setSearchResults(searchResult)
  }

  const handleTagClick = (tag) => {
    setSearchText(tag)
    const search = filterPrompts(tag)
    setSearchResults(search)
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt")
      const data = await response.json()

      setPosts(data)
    }

    fetchPosts()
  }, [])

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          className="search_input peer"
          placeholder="search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
        />
      </form>
      {searchText ? (
        <PromptCardList data={searchResults} handleTagClick={handleTagClick} />
      ) : (
        <PromptCardList data={posts} handleTagClick={handleTagClick} />
      )}
    </section>
  )
}

export default Feed
