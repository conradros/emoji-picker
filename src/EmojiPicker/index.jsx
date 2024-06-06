import React, { useState, useRef, useEffect } from 'react'
import useClickOutside from '../Hooks/useClickOutside'; // Import the custom hook

const emojis = {
    'smile, happy, joy, face, emotion, smiley': '😄',
    'home, house, building, apartment, residence': '🏠',
    'urgence, police, fire, light, warning, danger': '🚨',
    'open hands, smiley, hug, love, care': '🤗',
    'angry, mad, face, emotion, smiley': '😠',
    'cry, sad, face, emotion, smiley': '😢',
    'sunglasses, cool, smile, smiley': '😎',
    'vomit':'🤮',
    'laughing, lol, smile, smiley': '😂',
    'heart, like, favorite, love': '❤️',
    'handshake, agreement, hands': '🤝‍',
    'eye, vision, look, see': '👀',
    'angry':'😡',
    'broken house':'🏚',
    'broken heart':'💔',
    'broken car':'🚗',
    'neighborhood':'🏡',
    'cat':'🐱',
    'dog':'🐶',
    'mouse':'🐭',
}

function EmojiPicker({ emoji, setEmoji }) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const buttonRef = useRef(null)
  const panelRef = useRef(null)

  const toggle = () => {
    if (open) {
      return close()
    }
    buttonRef.current.focus()
    setOpen(true)
  }

  const close = (focusAfter) => {
    if (!open) return

    setOpen(false)

    if (focusAfter) {
      focusAfter.focus()
    }
  }


  useClickOutside(panelRef, (eventType) => {
    if (eventType === 'outside' || eventType === 'escape') {
      close();
    }
  });


  const filteredEmojis = Object.keys(emojis)
    .filter((key) => key.includes(search))
    .reduce((obj, key) => {
      obj[key] = emojis[key]
      return obj
    }, {})

  return (
    <div className="">
      <div className="relative" ref={buttonRef}>
        {/* Button */}
        <button
          onClick={toggle}
          aria-expanded={open}
          aria-controls="dropdown-panel"
          type="button"
          className="rounded-md bg-white px-5 py-2.5 shadow"
        >
          <span>{emoji}</span>
        </button>

        <input type="hidden" id="emoji" value={emoji} />

        {/* Panel */}
        {open && (
          <div
            ref={panelRef}
            id="dropdown-panel"
            className="absolute left-0 mt-2 max-h-64 w-64 overflow-scroll rounded bg-white p-4 shadow-md"
          >
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-1 mb-2 h-10 w-full rounded-md border border-slate-200 bg-gray-50 px-2 text-sm placeholder:text-gray-500 text-zinc-800"
              placeholder="Search an emoji..."
            />
            {Object.entries(filteredEmojis).map(([keywords, emoji]) => (
              <button
                key={emoji}
                onClick={() => {
                  setEmoji(emoji)
                  toggle()
                }}
                className="m-1 inline-block cursor-pointer rounded-md bg-gray-100 px-3 py-2 hover:bg-blue-100"
                title={keywords}
              >
                <span className="inline-block h-5 w-5">{emoji}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default EmojiPicker