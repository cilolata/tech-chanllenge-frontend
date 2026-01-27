export const permissionTypeFormatter = (permissionType: boolean) => {
  return permissionType ? 1 : 0
}

export const dateFormatter = (date?: string | Date) => {
  if (!date) return
  return new Intl.DateTimeFormat('pt-BR').format(new Date(date))
}

export const parsed = (transcription?: string) => {
  if (!transcription) return
  if (typeof transcription === 'string') {
    const newText = JSON.parse(transcription).trim()
    const newJson = JSON.parse(newText)
    const objCopy = Object.assign({}, newJson)
    return objCopy
  }
}
