# js-generate-webm

Generates video with sound in the browser

```
scene.js ━(draw)━> Canvas ━(convert)━> out.webm ━━━━━━━┳━(merge-out.sh)━> result.webm
sound.js ━(create)━> AudioBuffer ━(convert)━> out.wav ━┛
```

1. Open index.html
2. Press "Create sound", download `out.wav`
3. Press "Create video", download `out.webm`
4. Run `sh ./merge-out.sh`
5. You got `result.webm`