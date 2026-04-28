---
title: Compose, don't render
description: "Agents should manipulate typed domain models and let renderers produce the output. music.build, applied to music."
date: 2026-04-28
author: Reed von Redwitz
order: 2
series: spring-run
tags:
  - thesis
  - agents
  - typed-models
---

A few months ago I bought a keyboard. The kind of purchase you make at 11pm
convinced this time you'll actually practice. It's been sitting in the corner of
the new apartment ever since, judging me. Around the same time, we'd been
open-sourcing some of our modular Java work. I wanted to try it on something
that wasn't infrastructure. The keyboard seemed obvious.

Turns out there aren't many modern music theory composition libraries in Java.
Or anywhere, really. So I fired up Claude Code: "here are these projects, let's
do something with music."

## What happened

I ended up building [music.build](https://music.build/)
([source](https://github.com/deer/music.build)). It's a structural composition
library — pitches, rhythms, intervals, voices, harmony, form, all the primitives
a musician would name.

These primitives are too low-level for a human to compose with directly. But
composed up via MCP, with markdown explaining the patterns, an agent can use
them the way a musician would. And with this pure structural composition, we can
"render" or "compile" this to... MIDI, MusicXML, sheet music, etc.

## But what about Suno?

Yes, Suno is super cool. It's great at creating audio. But what happens after?
You want to swap an instrument, bump the tempo, take it into FL Studio. With
Suno, every one of those is a probabilistic re-rendering — you ask, you get
something new, you hope it's close. With a model, they're transformations:
deterministic, reversible, exact. Suno's great at producing audio. It just
doesn't give you anything to compose with.

## How does it work?

Here's a snippet of the agent composing a reggae track. What you're seeing: the
agent setting metadata, declaring a key, laying out the chord progression,
building a voice, assigning an instrument:

<details>
<summary>Tool calls (9 lines)</summary>

```json
{"ts":"2026-04-27T04:41:14.895386988Z","tool":"score.set_metadata","args":{"title":"One Drop","tempo":85,"time_signature":"4/4"},"durationMs":2,"ok":true}
{"ts":"2026-04-27T04:41:18.140598554Z","tool":"harmony.set_key","args":{"key":"G minor"},"durationMs":2,"ok":true}
{"ts":"2026-04-27T04:41:21.070161246Z","tool":"harmony.set_bars","args":{"bars":"1:Gm 2:F 3:Eb 4:F 5:Gm 6:F 7:Eb 8:F"},"durationMs":1,"ok":true}
{"ts":"2026-04-27T04:41:27.850246716Z","tool":"voice.create","args":{"name":"skank_4","notes":"cc:pan:80 r/e <G3 Bb3 D4>/e r/e <G3 Bb3 D4>/e r/e <G3 Bb3 D4>/e r/e <G3 Bb3 D4>/e r/e <F3 A3 C4>/e r/e <F3 A3 C4>/e r/e <F3 A3 C4>/e r/e <F3 A3 C4>/e r/e <Eb3 G3 Bb3>/e r/e <Eb3 G3 Bb3>/e r/e <Eb3 G3 Bb3>/e r/e <Eb3 G3 Bb3>/e r/e <F3 A3 C4>/e r/e <F3 A3 C4>/e r/e <F3 A3 C4>/e r/e <F3 A3 C4>/e"},"durationMs":3,"ok":true}
{"ts":"2026-04-27T04:41:31.008355672Z","tool":"voice.repeat","args":{"voice":"skank_4","times":2,"target_voice":"skank"},"durationMs":2,"ok":true}
{"ts":"2026-04-27T04:41:34.643714380Z","tool":"voice.delete","args":{"name":"skank_4"},"durationMs":0,"ok":true}
{"ts":"2026-04-27T04:41:37.326721578Z","tool":"voice.set_dynamics","args":{"voice":"skank","dynamics":"mf"},"durationMs":0,"ok":true}
{"ts":"2026-04-27T04:41:40.029982687Z","tool":"voice.set_articulation","args":{"voice":"skank","articulation":"staccato"},"durationMs":0,"ok":true}
{"ts":"2026-04-27T04:41:43.091153503Z","tool":"score.assign_instrument","args":{"voice":"skank","instrument":"electric_guitar"},"durationMs":2,"ok":true}
```

</details>

We of course keep track of all the tool calls for debugging and record keeping
purposes. But we also automatically get:

- `one_drop_reggae.json` -- the serialized composition which can be loaded and
  mutated later on
- `one_drop_reggae.ly` -- the lilypond syntax for generating a pdf
- `one_drop_reggae.pdf` -- the generated sheet music as a pdf
- `one_drop_reggae.mid` -- the midi representation of our composition

## Why this matters

The agent isn't generating a rendered artifact. The agent is composing, like
humans do. It manipulates the model in the same way that we would, and then
chooses to render it at the end, so that we can consume it (in a variety of
formats).

What's nice about this is that the model is the ultimate value, because it can
be mutated, forked, expanded upon.

## Demo

Here's the full reggae track from before:
<audio controls preload="metadata" src="/one_drop_reggae_cc_pc.mp3">Your browser
does not support audio playback. <a href="/one_drop_reggae_cc_pc.mp3">Download
the track</a></audio>

_8 bars of one-drop reggae in G minor at 85 BPM._

<details>
<summary>Full tool log of composition</summary>

```json
{"ts":"2026-04-27T04:35:16.715602134Z","tool":"score.load","args":{"filename":"47_one_drop_reggae/one_drop_reggae.json"},"durationMs":108,"ok":true}
{"ts":"2026-04-27T04:35:19.567675937Z","tool":"score.describe","args":{},"durationMs":2,"ok":true}
{"ts":"2026-04-27T04:37:03.721438234Z","tool":"query.voice","args":{"voice":"bass"},"durationMs":8,"ok":true}
{"ts":"2026-04-27T04:37:03.754743136Z","tool":"query.voice","args":{"voice":"skank"},"durationMs":8,"ok":true}
{"ts":"2026-04-27T04:37:03.782320186Z","tool":"query.voice","args":{"voice":"organ"},"durationMs":2,"ok":true}
{"ts":"2026-04-27T04:37:03.803518494Z","tool":"query.voice","args":{"voice":"melody"},"durationMs":1,"ok":true}
{"ts":"2026-04-27T04:37:03.821668541Z","tool":"query.voice","args":{"voice":"kick"},"durationMs":0,"ok":true}
{"ts":"2026-04-27T04:37:03.836884120Z","tool":"query.voice","args":{"voice":"snare"},"durationMs":0,"ok":true}
{"ts":"2026-04-27T04:37:03.846444123Z","tool":"query.voice","args":{"voice":"hihat"},"durationMs":1,"ok":true}
{"ts":"2026-04-27T04:41:11.629324098Z","tool":"score.clear","args":{},"durationMs":0,"ok":true}
{"ts":"2026-04-27T04:41:14.895386988Z","tool":"score.set_metadata","args":{"title":"One Drop","tempo":85,"time_signature":"4/4"},"durationMs":2,"ok":true}
{"ts":"2026-04-27T04:41:18.140598554Z","tool":"harmony.set_key","args":{"key":"G minor"},"durationMs":2,"ok":true}
{"ts":"2026-04-27T04:41:21.070161246Z","tool":"harmony.set_bars","args":{"bars":"1:Gm 2:F 3:Eb 4:F 5:Gm 6:F 7:Eb 8:F"},"durationMs":1,"ok":true}
{"ts":"2026-04-27T04:41:27.850246716Z","tool":"voice.create","args":{"name":"skank_4","notes":"cc:pan:80 r/e <G3 Bb3 D4>/e r/e <G3 Bb3 D4>/e r/e <G3 Bb3 D4>/e r/e <G3 Bb3 D4>/e r/e <F3 A3 C4>/e r/e <F3 A3 C4>/e r/e <F3 A3 C4>/e r/e <F3 A3 C4>/e r/e <Eb3 G3 Bb3>/e r/e <Eb3 G3 Bb3>/e r/e <Eb3 G3 Bb3>/e r/e <Eb3 G3 Bb3>/e r/e <F3 A3 C4>/e r/e <F3 A3 C4>/e r/e <F3 A3 C4>/e r/e <F3 A3 C4>/e"},"durationMs":3,"ok":true}
{"ts":"2026-04-27T04:41:31.008355672Z","tool":"voice.repeat","args":{"voice":"skank_4","times":2,"target_voice":"skank"},"durationMs":2,"ok":true}
{"ts":"2026-04-27T04:41:34.643714380Z","tool":"voice.delete","args":{"name":"skank_4"},"durationMs":0,"ok":true}
{"ts":"2026-04-27T04:41:37.326721578Z","tool":"voice.set_dynamics","args":{"voice":"skank","dynamics":"mf"},"durationMs":0,"ok":true}
{"ts":"2026-04-27T04:41:40.029982687Z","tool":"voice.set_articulation","args":{"voice":"skank","articulation":"staccato"},"durationMs":0,"ok":true}
{"ts":"2026-04-27T04:41:43.091153503Z","tool":"score.assign_instrument","args":{"voice":"skank","instrument":"electric_guitar"},"durationMs":2,"ok":true}
{"ts":"2026-04-27T04:41:47.408960474Z","tool":"voice.create","args":{"name":"bass_4","notes":"cc:pan:64 cc:expr:90 G2/q r/e G2/e G2/q r/q F2/q r/e F2/e F2/q r/q Eb2/q r/e Eb2/e G2/q r/q F2/q r/e F2/e C3/q r/q"},"durationMs":0,"ok":true}
{"ts":"2026-04-27T04:41:50.550613451Z","tool":"voice.repeat","args":{"voice":"bass_4","times":2,"target_voice":"bass"},"durationMs":0,"ok":true}
{"ts":"2026-04-27T04:41:54.324738991Z","tool":"voice.delete","args":{"name":"bass_4"},"durationMs":0,"ok":true}
{"ts":"2026-04-27T04:41:57.421497363Z","tool":"voice.set_dynamics","args":{"voice":"bass","dynamics":"f"},"durationMs":0,"ok":true}
{"ts":"2026-04-27T04:42:00.047167036Z","tool":"score.assign_instrument","args":{"voice":"bass","instrument":"electric_bass"},"durationMs":1,"ok":true}
{"ts":"2026-04-27T04:42:03.011650611Z","tool":"voice.create","args":{"name":"kick_1","notes":"r/h C2/q r/q"},"durationMs":0,"ok":true}
{"ts":"2026-04-27T04:42:06.660819418Z","tool":"voice.repeat","args":{"voice":"kick_1","times":8,"target_voice":"kick"},"durationMs":0,"ok":true}
{"ts":"2026-04-27T04:42:08.999952968Z","tool":"voice.delete","args":{"name":"kick_1"},"durationMs":0,"ok":true}
{"ts":"2026-04-27T04:42:12.242768349Z","tool":"voice.create","args":{"name":"snare_1","notes":"r/h D2/q r/q"},"durationMs":0,"ok":true}
{"ts":"2026-04-27T04:42:15.777479815Z","tool":"voice.repeat","args":{"voice":"snare_1","times":8,"target_voice":"snare"},"durationMs":0,"ok":true}
{"ts":"2026-04-27T04:42:18.165354795Z","tool":"voice.delete","args":{"name":"snare_1"},"durationMs":0,"ok":true}
{"ts":"2026-04-27T04:42:22.513501530Z","tool":"voice.create","args":{"name":"hihat_1","notes":"F#2/e F#2/e F#2/e F#2/e F#2/e F#2/e F#2/e F#2/e"},"durationMs":0,"ok":true}
{"ts":"2026-04-27T04:42:25.535687913Z","tool":"voice.repeat","args":{"voice":"hihat_1","times":8,"target_voice":"hihat"},"durationMs":0,"ok":true}
{"ts":"2026-04-27T04:42:28.797102137Z","tool":"voice.delete","args":{"name":"hihat_1"},"durationMs":0,"ok":true}
{"ts":"2026-04-27T04:42:32.954840201Z","tool":"score.assign_instrument","args":{"voice":"kick","instrument":"drums"},"durationMs":0,"ok":true}
{"ts":"2026-04-27T04:42:36.100624465Z","tool":"score.assign_instrument","args":{"voice":"snare","instrument":"drums"},"durationMs":0,"ok":true}
{"ts":"2026-04-27T04:42:40.933101182Z","tool":"score.assign_instrument","args":{"voice":"hihat","instrument":"drums"},"durationMs":0,"ok":true}
{"ts":"2026-04-27T04:42:44.712714333Z","tool":"harmony.comp","args":{"target_voice":"organ","style":"quarter_stabs","octave":3,"velocity":"mp"},"durationMs":4,"ok":true}
{"ts":"2026-04-27T04:42:47.251478785Z","tool":"score.assign_instrument","args":{"voice":"organ","instrument":"organ"},"durationMs":0,"ok":true}
{"ts":"2026-04-27T04:42:54.855810443Z","tool":"voice.create","args":{"name":"melody","notes":"cc:pan:70 cc:reverb:45 cc:expr:75 r/q cc:expr:95 D5/q Bb4/q r/q C5/q r/e Bb4/e G4/q r/q Bb4/h G4/q r/q cc:expr:65 F4/dq G4/e r/h pc:66 cc:expr:80 r/q cc:expr:100 D5/q Bb4/q G4/q F4/q r/e G4/e A4/q r/q Bb4/dh r/q cc:expr:60 G4/q F4/q r/h"},"durationMs":0,"ok":true}
{"ts":"2026-04-27T04:42:57.595350876Z","tool":"voice.set_dynamics","args":{"voice":"melody","dynamics":"f"},"durationMs":0,"ok":true}
{"ts":"2026-04-27T04:43:00.173648487Z","tool":"score.assign_instrument","args":{"voice":"melody","instrument":"saxophone"},"durationMs":0,"ok":true}
{"ts":"2026-04-27T04:43:17.899826365Z","tool":"voice.create","args":{"name":"melody","notes":"pc:65 cc:pan:70 cc:reverb:45 cc:expr:75 r/q cc:expr:95 D5/q Bb4/q r/q C5/q r/e Bb4/e G4/q r/q Bb4/h G4/q r/q cc:expr:65 F4/dq G4/e r/h pc:66 cc:expr:80 r/q cc:expr:100 D5/q Bb4/q G4/q F4/q r/e G4/e A4/q r/q Bb4/dh r/q cc:expr:60 G4/q F4/q r/h"},"durationMs":0,"ok":true}
{"ts":"2026-04-27T04:43:20.417165711Z","tool":"voice.set_dynamics","args":{"voice":"melody","dynamics":"f"},"durationMs":0,"ok":true}
{"ts":"2026-04-27T04:43:23.771510131Z","tool":"score.assign_instrument","args":{"voice":"melody","instrument":"saxophone"},"durationMs":0,"ok":true}
{"ts":"2026-04-27T04:43:26.182422913Z","tool":"rules.check","args":{},"durationMs":3,"ok":true}
{"ts":"2026-04-27T04:43:32.300529722Z","tool":"form.create_section","args":{"name":"A","measures":8},"durationMs":6,"ok":true}
{"ts":"2026-04-27T04:43:35.065944949Z","tool":"form.repeat_section","args":{"section":"A"},"durationMs":1,"ok":true}
{"ts":"2026-04-27T04:43:37.583484376Z","tool":"form.build","args":{},"durationMs":8,"ok":true}
```

</details>

## What's the catch?

This is likely slower and costlier than Suno. I'm just a guy with an idea, not a
company with a team. Doing individual operations (as seen above) is not fast. I
have not optimized this. The agent sometimes gets stuck thinking. I haven't
measured API cost — I'm on a Claude subscription. It's probably not cheap.

But that's not really my concern right now. I find the idea of structured
composition using small building blocks intriguing, and I want to continue
investigating this.

## Next steps

The keyboard is still in the corner. I'm not a musician — I played piano as a
child and I've forgotten almost everything. But I built a music composition
library, which was not the plan, and the keyboard still hasn't taught me
anything, which was. So: a draw. What I'm actually validating is the idea behind
it: agents should compose through typed models instead of generating what should
be a rendering.

Generating audio throws away structure that didn't have to be lost. Seems like
the same idea could be applied to other domains as well. Let's see where it
goes.

For now, I'm happy to receive feedback at https://github.com/deer/music.build.
I'm open to both complaints and contributions!
