"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState, useCallback } from "react";
import { animate, set, remove } from "animejs";

// 项目 B：音乐可视化播放器
// 技术栈：Web Audio API（合成音频 + 实时频谱） + Anime.js（频谱动画） + Motion（手势/控件）

const BAR_COUNT = 64;

// —— 步进音序器参数 ——
const STEPS = 16; // 一个乐句循环 16 步
const STEP_TIME = 0.22; // 每步 0.22s ≈ 136 BPM
export const LOOP_SECONDS = STEPS * STEP_TIME;

// A 小调五声音阶（下标映射音符频率）
const SCALE = [220.0, 261.63, 293.66, 329.63, 392.0];
// 16 步旋律：五声音阶上游走，结尾落在主音 A
const MELODY = [0, 1, 2, 3, 4, 3, 2, 1, 0, 2, 4, 3, 2, 3, 4, 3];

// 用 Web Audio API 实时合成循环乐句（无需外部音频文件）
// lookahead 调度器：每 50ms 检查，提前排程 120ms 内的下一个音符
function createSequencer(ctx: AudioContext, analyser: AnalyserNode) {
  const master = ctx.createGain();
  master.gain.value = 0.18;
  master.connect(analyser);
  analyser.connect(ctx.destination);

  // 底鼓：低频振荡器 + 指数降频 + 快速衰减
  const scheduleKick = (time: number) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.setValueAtTime(150, time);
    osc.frequency.exponentialRampToValueAtTime(45, time + 0.12);
    gain.gain.setValueAtTime(0.8, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.2);
    osc.connect(gain);
    gain.connect(master);
    osc.start(time);
    osc.stop(time + 0.22);
  };

  // 旋律音：三角波 + 单步包络
  const scheduleNote = (freq: number, time: number) => {
    const osc = ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.value = freq;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(0.4, time + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, time + STEP_TIME * 0.95);
    osc.connect(gain);
    gain.connect(master);
    osc.start(time);
    osc.stop(time + STEP_TIME);
  };

  // 镲片：预生成白噪声 + 高通滤波 + 短促包络
  const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.1, ctx.sampleRate);
  const noiseData = noiseBuffer.getChannelData(0);
  for (let i = 0; i < noiseData.length; i++) {
    noiseData[i] = Math.random() * 2 - 1;
  }
  const scheduleHat = (time: number) => {
    const src = ctx.createBufferSource();
    src.buffer = noiseBuffer;
    const filter = ctx.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.value = 6000;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.12, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.06);
    src.connect(filter);
    filter.connect(gain);
    gain.connect(master);
    src.start(time);
    src.stop(time + 0.08);
  };

  let currentStep = 0;
  let nextNoteTime = ctx.currentTime + 0.08;
  const LOOKAHEAD = 0.12;
  const SCHEDULE_MS = 50;

  const schedulerTick = () => {
    while (nextNoteTime < ctx.currentTime + LOOKAHEAD) {
      const step = currentStep;
      if (step % 4 === 0) scheduleKick(nextNoteTime); // 四拍底鼓
      scheduleNote(SCALE[MELODY[step]], nextNoteTime); // 每步一个旋律音
      if (step % 2 === 1) scheduleHat(nextNoteTime); // 反拍镲片
      nextNoteTime += STEP_TIME;
      currentStep = (currentStep + 1) % STEPS;
    }
  };

  const intervalId = setInterval(schedulerTick, SCHEDULE_MS);
  schedulerTick();

  return {
    master,
    cleanup: () => clearInterval(intervalId),
  };
}

export function PlayerView() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const volumeTrackRef = useRef<HTMLDivElement>(null);
  const sequencerCleanupRef = useRef<(() => void) | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [progress, setProgress] = useState(0);

  const freqDataRef = useRef<Uint8Array<ArrayBuffer> | null>(null);
  const rafRef = useRef<number>(0);

  const initAudio = useCallback(() => {
    if (audioCtxRef.current) return;
    const ctx = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 128;
    analyser.smoothingTimeConstant = 0.85;
    const { master, cleanup } = createSequencer(ctx, analyser);
    audioCtxRef.current = ctx;
    analyserRef.current = analyser;
    masterRef.current = master;
    sequencerCleanupRef.current = cleanup;
    freqDataRef.current = new Uint8Array(analyser.frequencyBinCount);
  }, []);

  const startPlayback = useCallback(() => {
    initAudio();
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    ctx.resume();
    setIsPlaying(true);
  }, [initAudio]);

  const pausePlayback = useCallback(() => {
    const ctx = audioCtxRef.current;
    if (ctx) ctx.suspend();
    setIsPlaying(false);
  }, []);

  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafRef.current);
      sequencerCleanupRef.current?.();
      audioCtxRef.current?.close();
    };
  }, []);

  // 频率驱动 + Anime.js 频谱动画
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx2d = canvas.getContext("2d");
    if (!ctx2d) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const analyser = analyserRef.current;
      const freqData = freqDataRef.current;
      if (!analyser || !freqData) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      analyser.getByteFrequencyData(freqData);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx2d.clearRect(0, 0, w, h);

      const barW = w / BAR_COUNT;
      for (let i = 0; i < BAR_COUNT; i++) {
        const value = freqData[i] / 255;
        const barH = value * (h - 20);
        const x = i * barW;
        const hue = 260 + value * 60;
        ctx2d.fillStyle = `hsla(${hue}, 90%, 60%, 0.9)`;
        ctx2d.fillRect(x + 1, h - barH, barW - 2, barH);
      }

      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    if (!masterRef.current) return;
    masterRef.current.gain.value = volume;
  }, [volume]);

  // 进度条：读音频时钟实时同步（suspend 冻结 currentTime，暂停/继续自然衔接）
  useEffect(() => {
    if (!isPlaying) return;
    let raf = 0;
    const update = () => {
      const ctx = audioCtxRef.current;
      if (ctx) {
        const t = ctx.currentTime % LOOP_SECONDS;
        setProgress((t / LOOP_SECONDS) * 100);
      }
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [isPlaying]);

  const togglePlay = () => {
    if (isPlaying) pausePlayback();
    else startPlayback();
  };

  // Anime.js：播放按钮的脉冲环动画
  useEffect(() => {
    const targets = document.querySelectorAll(".pulse-ring");
    if (isPlaying) {
      animate(".pulse-ring", {
        scale: [1, 1.6],
        opacity: [0.6, 0],
        duration: 1200,
        easing: "easeOutQuad",
        loop: true,
      });
    } else {
      remove(targets);
      set(targets, { scale: 1, opacity: 0.5 });
    }
  }, [isPlaying]);

  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-6 pt-24">
      <div className="w-full max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            音乐可视化<span className="bg-gradient-to-r from-[#8b5cf6] to-[#22d3ee] bg-clip-text text-transparent">播放器</span>
          </h1>
          <p className="mt-3 text-[#a1a1aa]">
            Web Audio API 实时频谱 · Anime.js 动画 · Motion 交互
          </p>
        </div>

        {/* 频谱可视化 */}
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <canvas
            ref={canvasRef}
            className="h-48 w-full"
            style={{ height: "192px" }}
          />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={isPlaying ? { rotate: 360 } : {}}
              transition={
                isPlaying
                  ? { duration: 6, repeat: Infinity, ease: "linear" }
                  : {}
              }
              className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#22d3ee] shadow-[0_0_40px_rgba(139,92,246,0.4)]"
            >
              <span className="text-2xl">🎵</span>
            </motion.div>
          </div>
        </div>

        {/* 控件区 */}
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          {/* 进度条（跟随音频时钟只读展示：乐句循环播放，无 seek 概念） */}
          <div className="relative h-6 w-full">
            <div className="absolute top-1/2 h-1 w-full -translate-y-1/2 rounded-full bg-white/10" />
            <motion.div
              className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#22d3ee]"
              style={{ width: `${progress}%` }}
            />
            <motion.div
              className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-lg"
              style={{ left: `${progress}%` }}
            />
          </div>

          {/* 播放按钮 + 音量 */}
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={togglePlay}
                className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#22d3ee] text-white transition-transform hover:scale-105"
              >
                <span className="pulse-ring absolute inset-0 rounded-full bg-[#8b5cf6]/40" />
                <span className="relative text-lg">
                  {isPlaying ? "⏸" : "▶"}
                </span>
              </button>
              <span className="text-sm text-[#a1a1aa]">
                {isPlaying ? "正在播放 · 实时合成" : "点击播放"}
              </span>
            </div>

            {/* 音量滑块 */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-[#a1a1aa]">🔊</span>
              <div ref={volumeTrackRef} className="relative h-6 w-32 cursor-pointer">
                <div className="absolute top-1/2 h-1 w-full -translate-y-1/2 rounded-full bg-white/10" />
                <motion.div
                  className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-white/60"
                  style={{ width: `${volume * 100}%` }}
                />
                <motion.div
                  className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
                  style={{ left: `${volume * 100}%` }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0}
                  onDrag={(_, info) => {
                    const track = volumeTrackRef.current;
                    if (!track) return;
                    const rect = track.getBoundingClientRect();
                    const x = (info.point.x - rect.left) / rect.width;
                    setVolume(Math.max(0, Math.min(1, x)));
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-[#a1a1aa]">
          提示：点击播放按钮启动音频（浏览器要求用户交互后播放）
        </p>
      </div>
    </section>
  );
}