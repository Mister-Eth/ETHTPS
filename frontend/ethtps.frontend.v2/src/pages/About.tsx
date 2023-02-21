import ReactMarkdown from "react-markdown"

const markdown = `A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |
`

export function About() {
  return (
    <>
      <ReactMarkdown children={markdown} />{" "}
    </>
  )
}
