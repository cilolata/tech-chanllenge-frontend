import { useEffect, useState } from 'react'

type TranscriptItem = {
  transcript: string
  resultEndTime: string // ms
}

export const useSubtitles = (
  videoRef: React.RefObject<HTMLVideoElement>,
  transcript: TranscriptItem[]
) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)


  useEffect(() => {
    const video = videoRef.current
    if (!video || !transcript.length) return
    const onTimeUpdate = () => {
      const currentMs = video.currentTime * 1000

      let start = 0
      let end = 0
      let index = 0

      for (let i = 0; i < transcript.length; i++) {
        start = i === 0 ? 0 : Number(transcript[i - 1].resultEndTime)
        end = Number(transcript[i].resultEndTime)

        if (currentMs >= start && currentMs <= end) {
          index = i
          break
        }
      }

      const duration = end - start
      const p = duration ? (currentMs - start) / duration : 0

      setActiveIndex(index)
      setProgress(Math.min(Math.max(p, 0), 1))
    }

    video.ontimeupdate = (ev) => {
      if (ev.target === null) return
      onTimeUpdate()
    }
    return () => {
      video.ontimeupdate = null
    }
  }, [videoRef, transcript])

  return {
    activeText: transcript[activeIndex]?.transcript || '',
    resultEndTime: transcript[activeIndex]?.resultEndTime || '0',
    progress,
  }
}
