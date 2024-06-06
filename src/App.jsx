import { useState } from 'react'
import './App.css'
import EmojiPicker from "./EmojiPicker";

function App() {
  const [emoji, setEmoji] = useState("🙂");
  return (
    <>
      <h1>Emoji Picker</h1>
      <form>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            
            <label
              htmlFor="emoji"
              className="block font-medium leading-6 text-white"
            >
              Pick an emoji
            </label>
            <div className="mt-2">
              <EmojiPicker emoji={emoji} setEmoji={setEmoji} />
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default App
