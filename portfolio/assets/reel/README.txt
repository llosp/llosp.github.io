Hero reel assets.

  reel.mp4    -- IN, as a raw drop-in (not yet run through the
                 normalize/encode pipeline below).
  reel.webm   (VP9, 1280x720, 30fps, no audio) -- still missing.
  poster.webp (first frame, 1280x720, under 120 KB) -- still missing.

Both videos together must stay under 4 MB. See the "Hero reel" section of
../../README.md for the exact ffmpeg pipeline (trim/normalize, encode both
formats, extract the poster). Until reel.webm and poster.webp exist, the
page falls back to an unrelated project screenshot as the hero poster.
