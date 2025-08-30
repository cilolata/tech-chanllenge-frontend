const useRichText = () => {
  const handleBoldFormat = () => {
    const selection = window.getSelection()
    const range = selection?.getRangeAt(0)
    const parent = selection?.anchorNode?.parentElement

    if (selection && selection?.rangeCount < 0) return

    if (parent && parent.tagName.toLowerCase() !== 'span') {
      let span
      span = document.createElement('span')
      span.style.fontWeight = 'bold'
      range?.surroundContents(span)
      selection?.removeAllRanges()
    } else if (parent && parent?.style.fontWeight !== 'bold') {
      parent.style.fontWeight = 'bold'
      selection?.removeAllRanges()
    } else {
      if (parent) {
        parent.style.fontWeight = 'normal'
        selection?.removeAllRanges()
      }
    }
  }

  const handleItalicFormat = () => {
    const selection = window.getSelection()
    const range = selection?.getRangeAt(0)
    const parent = selection?.anchorNode?.parentElement

    if (selection && selection?.rangeCount < 0) return

    if (parent?.style.fontStyle !== 'italic' && parent?.tagName !== 'span') {
      let span
      span = document.createElement('span')
      span.style.fontStyle = 'italic'
      range?.surroundContents(span)
      selection?.removeAllRanges()
    }
    if (parent?.style.fontStyle !== 'italic' && parent?.tagName === 'span') {
      parent.style.fontStyle = 'italic'
      selection?.removeAllRanges()
    }
    if (parent?.style.fontStyle === 'italic' && parent?.tagName === 'span') {
      parent.style.fontStyle = 'normal'
      selection?.removeAllRanges()
    }
  }

  const handleUnderlineFormat = () => {
    const selection = window.getSelection()
    const range = selection?.getRangeAt(0)
    const parent = selection?.anchorNode?.parentElement

    if (selection && selection?.rangeCount < 0) return

    if (parent && parent?.tagName.toLowerCase() !== 'span') {
      let span
      span = document.createElement('span')
      span.style.textDecoration = 'underline'
      range?.surroundContents(span)
      selection?.removeAllRanges()
    } else if (parent && parent?.style.textDecoration !== 'underline') {
      parent.style.textDecoration = 'underline'
      selection?.removeAllRanges()
    } else {
      if (parent) {
        parent.style.textDecoration = 'none'
        selection?.removeAllRanges()
      }
    }
  }

  return {
    handleBoldFormat,
    handleItalicFormat,
    handleUnderlineFormat,
  }
}

export default useRichText
