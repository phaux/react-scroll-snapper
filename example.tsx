/// <reference types="vite/client" />
import { StrictMode, useState, type JSX } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import { ScrollSnapper } from "./index.js"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

function App(): JSX.Element {
  const [page, setPage] = useState(1)
  const [containerStyle, setContainerStyle] = useState<React.CSSProperties>({})
  const [childStyle, setChildStyle] = useState<React.CSSProperties>({})

  return (
    <div className="App">
      <h1>React Scroll Snapper</h1>

      <p>
        Select page via button: <button onClick={() => setPage(0)}>Page 0</button>{" "}
        <button onClick={() => setPage(1)}>Page 1</button>{" "}
        <button onClick={() => setPage(2)}>Page 2</button>
      </p>

      <p>
        <label>
          Select page via select:{" "}
          <select value={page} onChange={(e) => setPage(Number(e.target.value))}>
            <option value={0}>Page 0</option>
            <option value={1}>Page 1</option>
            <option value={2}>Page 2</option>
          </select>
        </label>
      </p>

      <p>
        Select page via anchor: <a href="#page0">Page 0</a> <a href="#page1">Page 1</a>{" "}
        <a href="#page2">Page 2</a>
      </p>

      <ScrollSnapper
        style={{ gap: "16px", border: "1px solid currentColor", ...containerStyle }}
        className="yourClassName"
        index={page}
        onIndexChange={setPage}
      >
        <div id="page0" style={{ padding: "32px", backgroundColor: "#fa807280", ...childStyle }}>
          <h2>Page 0</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse in egestas orci.
            Nunc luctus, massa non vestibulum sollicitudin, ligula lacus consequat magna, vitae
            mollis urna lorem et urna. Nulla fringilla urna sit amet diam ultrices elementum. Donec
            consectetur metus at malesuada eleifend. Cras consectetur sed dolor vulputate porttitor.
            Pellentesque nec interdum leo. Curabitur purus arcu, ullamcorper vitae nisi a, facilisis
            ullamcorper leo. Quisque eget vehicula purus. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Suspendisse quis nibh id dui facilisis varius id sed mi. Fusce vitae
            auctor nisl.
          </p>
        </div>
        <div
          id="page1"
          style={{
            margin: "32px",
            backgroundColor: "#add8e660",
            ...childStyle,
          }}
        >
          <h2>Page 1</h2>
          <p>
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
            Etiam consequat mi ac libero luctus gravida. Sed ex magna, consectetur vitae rutrum sed,
            bibendum vitae tellus. Nulla finibus, dolor nec rutrum suscipit, ipsum ex bibendum est,
            non luctus sem elit eget mauris. Maecenas nisi tellus, congue id elit vitae, rutrum
            malesuada sem. Fusce nisi velit, vehicula in dignissim vel, posuere id nisi. Interdum et
            malesuada fames ac ante ipsum primis in faucibus. Suspendisse luctus lorem sed mauris
            convallis, a elementum justo ultricies. Sed ullamcorper erat dolor. Nunc varius ex ac
            convallis vulputate. Sed a ex felis. Etiam accumsan, risus id placerat gravida, ligula
            magna viverra enim, sed condimentum mi dui a neque. Aenean eget gravida tellus, a congue
            mi. Aliquam at augue sed leo suscipit feugiat in sit amet magna. Aliquam vitae felis
            ligula. Sed vel lacinia diam, vel ullamcorper libero.
          </p>
        </div>
        <div
          id="page2"
          style={{
            border: "4px solid #90ee90",
            backgroundColor: "#90ee9080",
            ...childStyle,
          }}
        >
          <h2>Page 2</h2>
          <p>
            Etiam condimentum sagittis massa a pulvinar. Duis eu ex eleifend, suscipit sem eget,
            laoreet nisl. Nullam lobortis elit vel erat interdum, at iaculis velit elementum. Mauris
            at consequat ex. Aliquam sed risus faucibus lorem mollis interdum ac non nisi. Ut
            tincidunt accumsan ligula, at tempor tortor venenatis porta. Ut at mauris consectetur,
            ultrices nisi eu, interdum tortor. Donec eu metus velit. Aenean dictum orci sed vehicula
            mattis.
          </p>
        </div>
      </ScrollSnapper>

      <p>
        Container style:{" "}
        <label>
          <input
            type="checkbox"
            checked={containerStyle.scrollbarWidth != null}
            onChange={(e) =>
              setContainerStyle((style) => ({
                ...style,
                scrollbarWidth: e.target.checked ? "none" : undefined,
              }))
            }
          />
          <code>scrollbar-width: none;</code>
        </label>{" "}
        <label>
          <input
            type="checkbox"
            checked={containerStyle.maxHeight != null}
            onChange={(e) =>
              setContainerStyle((style) => ({
                ...style,
                maxHeight: e.target.checked ? "256px" : undefined,
              }))
            }
          />
          <code>max-height: 256px;</code>
        </label>{" "}
        <label>
          <input
            type="checkbox"
            checked={containerStyle.alignItems != null}
            onChange={(e) =>
              setContainerStyle((style) => ({
                ...style,
                alignItems: e.target.checked ? "start" : undefined,
              }))
            }
          />
          <code>align-items: start;</code>
        </label>
      </p>

      <p>
        Child style:{" "}
        <label>
          <input
            type="checkbox"
            checked={childStyle.maxHeight != null}
            onChange={(e) =>
              setChildStyle((style) => ({
                ...style,
                maxHeight: e.target.checked ? "256px" : undefined,
              }))
            }
          />
          <code>max-height: 256px;</code>
        </label>{" "}
        <label>
          <input
            type="checkbox"
            checked={childStyle.overflowY != null}
            onChange={(e) =>
              setChildStyle((style) => ({
                ...style,
                overflowY: e.target.checked ? "scroll" : undefined,
              }))
            }
          />
          <code>overflow-y: scroll;</code>
        </label>
      </p>
    </div>
  )
}
