<!-- markdownlint-disable MD033 MD025 -->

# React Scroll Snapper

[![npm](https://img.shields.io/npm/v/react-scroll-snapper)](https://www.npmjs.com/package/react-scroll-snapper)
[![bundlephobia](https://img.shields.io/bundlephobia/minzip/react-scroll-snapper)](https://bundlephobia.com/package/react-scroll-snapper)

[![codesandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/github/phaux/react-scroll-snapper/main?import=true&embed=1&file=/example.tsx)

A library for creating swipeable views using CSS scroll snap.

Originally developed as a replacement for the [`react-swipeable-views`](https://github.com/oliviertassinari/react-swipeable-views) which is not compatible with latest React and no longer maintained.

## You might not need this library

If you don't need to control the current page from JavaScript, you can use a simple scrollable div with following styles:

```css
.ScrollSnapper {
  display: flex;
  scroll-snap-type: x mandatory;
  overflow-x: scroll;
  scroll-behavior: smooth;
}

.ScrollSnapper > * {
  box-sizing: border-box; /* if not set globally */
  width: 100%;
  flex-shrink: 0;
  scroll-snap-align: center;
  scroll-snap-stop: always;
}
```

Then use it in your JSX:

```jsx
function App() {
  return (
    <div className="ScrollSnapper">
      <div>Page 1</div>
      <div>Page 2</div>
      <div>Page 3</div>
    </div>
  )
}
```

Here are the same styles in Tailwind CSS:

```jsx
function App() {
  return (
    <div
      className={
        "flex snap-x snap-mandatory overflow-x-scroll scroll-smooth " +
        "*:w-full *:flex-shrink-0 *:snap-center *:snap-always"
      }
    >
      <div>Page 1</div>
      <div>Page 2</div>
      <div>Page 3</div>
    </div>
  )
}
```

To implement tabs which scroll to different pages when clicked, you can use anchors which point to the page ids:

```jsx
function App() {
  return (
    <>
      <ul>
        <li>
          <a href="#page1">Page 1</a>
        </li>
        <li>
          <a href="#page2">Page 2</a>
        </li>
        <li>
          <a href="#page3">Page 3</a>
        </li>
      </ul>

      <div className="ScrollSnapper">
        <div id="page1">Page 1</div>
        <div id="page2">Page 2</div>
        <div id="page3">Page 3</div>
      </div>
    </>
  )
}
```

If you don't need to react to a page change from user, but want to scroll to a page programmatically, you can use the [`scrollIntoView`](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView) method on the page element:

```tsx
function App() {
  const scrollSnapperRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <p>
        <button onClick={() => scrollSnapperRef.current?.children[0]?.scrollIntoView()}>
          First page
        </button>
        <button onClick={() => scrollSnapperRef.current?.children[2]?.scrollIntoView()}>
          Last page
        </button>
      </p>
      <div className="ScrollSnapper" ref={scrollSnapperRef}>
        <div>Page 1</div>
        <div>Page 2</div>
        <div>Page 3</div>
      </div>
    </>
  )
}
```

## Importing styles

You can import only the styles from this library and use them with the snippets above.

Import the styles in your HTML:

```html
<link rel="stylesheet" href="react-scroll-snapper/index.css" />
```

or in your CSS:

```css
@import "react-scroll-snapper/index.css";
```

or in your JavaScript if your bundler supports it:

```js
import "react-scroll-snapper/index.css"
```

> [!TIP]
>
> You can also import the styles from `esm.sh` or similar CDN.
>
> That way you don't need to install this library in your node_modules and you can use the styles without any build tools.
>
> ```html
> <link rel="stylesheet" href="https://esm.sh/react-scroll-snapper/index.css" />
> ```

## Using the React component

You can use the `ScrollSnapper` component to easily bind the current page index to your React state:

```jsx
import "react-scroll-snapper/index.css"
import { ScrollSnapper } from "react-scroll-snapper"
import { useState } from "react"

function App() {
  const [pageIndex, setPageIndex] = useState(0)

  return (
    <ScrollSnapper index={pageIndex} onIndexChange={setPageIndex}>
      <div>Page 1</div>
      <div>Page 2</div>
      <div>Page 3</div>
    </ScrollSnapper>
  )
}
```

> [!TIP]
> Consider simply copy-pasting the [component's source code](./index.tsx) into your project.
> It's very small and easy to maintain and doesn't have any dependencies.
> You can also add any additional features you need yourself.

See [`example`](./example.tsx) for a more complete example.

## Tips

### How to hide the scrollbar?

Add `scrollbar-width: none` to the container:

```css
.noScrollbar {
  scrollbar-width: none;
}
```

For Safari:

```css
.noScrollbar::-webkit-scrollbar {
  display: none;
}
```

Usage:

```jsx
<ScrollSnapper className="noScrollbar">...</ScrollSnapper>
```

### How to remove empty space when current page is shorter than the others?

You can set `max-height` on the container and add `overflow-y: scroll` to the pages.

```css
.scrollChildren {
  max-height: 384px;
}

.scrollChildren > * {
  overflow-y: scroll;
}
```

```jsx
<ScrollSnapper className="scrollChildren">...</ScrollSnapper>
```

<!-- TODO: calculate the max height based on the current page's actual height so that the current page never scrolls. -->

## Developing

- `npm start`: Start the example app using vite.
- `npm run prepare`: Build the library using tsc.
- `npm test`: Check code using tsc.

# API

## ScrollSnapper()

> **ScrollSnapper**(`props`): `Element`

Scroll Snapper React component.

### Parameters

| Parameter | Type                                                                                   |
| --------- | -------------------------------------------------------------------------------------- |
| `props`   | [`ScrollSnapperProps`](README.md#scrollsnapperprops) & `HTMLProps`\<`HTMLDivElement`\> |

### Returns

`Element`

---

## ScrollSnapperProps

Props for the [ScrollSnapper](README.md#scrollsnapper) component.

### Properties

| Property        | Type                                                      | Description                                                                                                                                                                                                                                               |
| --------------- | --------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `index`         | `number`                                                  | The current page index. Can be changed to programmatically scroll to a different page.                                                                                                                                                                    |
| `onIndexChange` | (`index`: `number`, `target`: `HTMLDivElement`) => `void` | A callback which runs after the container is scrolled to a page. This will run even if the user scrolled but ended up on the same page. Scrolling triggered by changing the `index` prop will also trigger this callback after the animation is finished. |
