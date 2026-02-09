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

export const handleTranscriptTime = (newTranscription: any[]) => {
  const postNewTranscription = newTranscription.flat()
  const arrReorder = postNewTranscription.map((item) => {
    const time =
      typeof item.resultEndTime === 'string'
        ? item.resultEndTime.split('s')[0]
        : `${item.resultEndTime}`.split('s')[0]

    return {
      transcript: item.alternatives.map((alt: any) => alt)[0].transcript,
      resultEndTime: (+time * 1000).toFixed(2),
    }
  })
  return arrReorder
}

const msToVttTime = (ms: number) => {
  const date = new Date(ms)
  const hh = String(date.getUTCHours()).padStart(2, '0')
  const mm = String(date.getUTCMinutes()).padStart(2, '0')
  const ss = String(date.getUTCSeconds()).padStart(2, '0')
  const msStr = String(date.getUTCMilliseconds()).padStart(3, '0')

  return `${hh}:${mm}:${ss}.${msStr}`
}

export const generateVttFromTranscript = (
  transcript: { transcript: string; resultEndTime: string }[]
) => {
  if(!transcript || transcript.length === 0) return ''
  let previousEnd = 0

  const cues = transcript.map((item) => {
    const end = Number(item.resultEndTime)
    const start = previousEnd
    previousEnd = end

    return `${msToVttTime(start)} --> ${msToVttTime(end)}
${item.transcript}
`
  })

  return `WEBVTT

${cues.join('\n')}`
}

export const loadVlibras = (): Promise<void> =>
  new Promise((resolve) => {
    if ((window as any).VLibras) return resolve()

    const script = document.createElement('script')
    script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js'
    script.onload = () => resolve()
    document.body.appendChild(script)
  })
