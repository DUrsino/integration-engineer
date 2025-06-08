import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export default function Home() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const clearMessages = () => {
    if (messages.length === 0) return;
    if (window.confirm('Are you sure you want to clear all messages?')) {
      setMessages([]);
    }
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const sendMessage = async () => {
    const newMessages = [...messages, { role: 'user', content: input, timestamp: new Date().toISOString() }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.body) throw new Error('No response body');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      
      // Add the assistant message once at the start
      const assistantMessage = { role: 'assistant', content: '', timestamp: new Date().toISOString() };
      setMessages(messages => [...messages, assistantMessage]);
      
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          
          // Update only the content of the last message
          setMessages(messages => {
            const newMessages = [...messages];
            const lastMessage = newMessages[newMessages.length - 1];
            lastMessage.content += chunk;
            return newMessages;
          });
        }
      } finally {
        reader.releaseLock(); // Clean up the reader
      }

      setLoading(false);
    } catch (error) {
      console.error('Streaming error:', error);
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: 'Something went wrong. Please check the logs.',
          timestamp: new Date().toISOString(),
        },
      ]);
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="team-credit">Made by Integrations Team 2025</div>
      <h1>Integration Intelligence</h1>
      <div className="chat-thread">
        {messages.map((msg, i) => {
          const isUser = msg.role === 'user';
          // Don't render empty assistant messages
          if (!isUser && !msg.content) return null;

          return (
            <div key={i} className={`bubble-row ${isUser ? 'right' : 'left'}`}>
              <div className="avatar">{isUser ? '🧑' : '🤖'}</div>
              <div className={`bubble ${isUser ? 'user' : 'assistant'}`}>
                <ReactMarkdown
                  components={{
                    code({ inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || '');
                      return !inline && match ? (
                        <SyntaxHighlighter
                          style={oneDark}
                          language={match[1]}
                          PreTag="div"
                          {...props}
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      ) : (
                        <code className="inline-code" {...props}>
                          {children}
                        </code>
                      );
                    },
                  }}
                >
                  {msg.content}
                </ReactMarkdown>
                <div className="timestamp">{new Date(msg.timestamp).toLocaleTimeString()}</div>
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="bubble-row left">
            <div className="avatar">🤖</div>
            <div className="bubble assistant">
              <span className="spinner">⏳ Typing...</span>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      <div className="input-row">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') sendMessage();
          }}
          placeholder="Ask something..."
        />
        <button onClick={sendMessage}>Send</button>
        <button className="clear-button" onClick={clearMessages}>Clear</button>
      </div>

      <style jsx global>{`
        /* Markdown styles in chat bubbles */
        .bubble p {
          margin: 0 0 12px 0;
        }
        
        .bubble p:last-child {
          margin-bottom: 0;
        }

        .bubble pre {
          margin: 12px 0;
          border-radius: 6px;
          overflow-x: auto;
        }

        .bubble code {
          font-family: 'Consolas', monospace;
        }

        .bubble h1, .bubble h2, .bubble h3 {
          margin-top: 16px;
          margin-bottom: 8px;
          color: inherit;
        }

        .bubble strong {
          color: inherit;
          font-weight: 600;
        }

        .bubble ul, .bubble ol {
          margin: 8px 0;
          padding-left: 20px;
        }

        .bubble li {
          margin: 4px 0;
        }

        .bubble blockquote {
          margin: 8px 0;
          padding-left: 12px;
          border-left: 3px solid #565656;
          color: #888;
        }
      `}</style>

      <style jsx>{`
        .chat-container {
          max-width: 800px;
          margin: 40px auto;
          padding: 20px;
          color: #eee;
          font-family: 'Segoe UI', sans-serif;
          position: relative;
        }

        .team-credit {
          position: absolute;
          top: -30px;
          right: 0;
          font-size: 14px;
          color: #888;
        }

        h1 {
          text-align: center;
          margin-bottom: 24px;
        }

        .chat-thread {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 24px;
        }

        .bubble-row {
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }

        .bubble-row.right {
          flex-direction: row-reverse;
        }

        .avatar {
          font-size: 24px;
          padding-top: 6px;
        }

        .bubble {
          max-width: 80%;
          padding: 12px;
          border-radius: 12px;
          line-height: 1.4;
          font-size: 15px;
          white-space: pre-wrap;
          overflow-x: auto;
          position: relative;
        }

        .user {
          background: #333;
          color: #fff;
        }

        .assistant {
          background: #1e1e1e;
          color: #eee;
        }

        .inline-code {
          background: #222;
          padding: 2px 6px;
          border-radius: 4px;
          font-family: monospace;
          color: #ffc;
        }

        .input-row {
          display: flex;
          gap: 10px;
        }

        .input-row input {
          flex: 1;
          padding: 10px;
          font-size: 16px;
          background: #222;
          color: #fff;
          border: 1px solid #333;
          border-radius: 4px;
        }

        .input-row button {
          padding: 10px 16px;
          font-size: 16px;
          background: #444;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .clear-button {
          padding: 10px 16px;
          font-size: 16px;
          background: #662222;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .clear-button:hover {
          background: #993333;
        }

        .timestamp {
          margin-top: 8px;
          font-size: 12px;
          color: #888;
        }

        h1, h2, h3 {
          margin: 16px 0 8px;
        }

        a {
          color: #58a6ff;
          text-decoration: underline;
        }

        ul, ol {
          margin-left: 20px;
        }

        .spinner {
          font-style: italic;
          color: #aaa;
        }
      `}</style>
    </div>
  );
}
