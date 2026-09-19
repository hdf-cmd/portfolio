"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { KidsLogo } from "@/components/kids/kids-icons";

const courses = ["涂鸦实验室(3–5 岁)", "创想工作室(6–9 岁)", "专业画房(10 岁+)"];

export function KidsSignup() {
  const [form, setForm] = useState({ name: "", age: "5", course: courses[1], phone: "" });
  const [sent, setSent] = useState(false);

  const set = (k: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const inputCls =
    "w-full rounded-xl border-2 border-[#2F3B52]/10 bg-white px-4 py-3 text-sm text-[#2F3B52] outline-none transition-colors focus:border-[#4A90D9]";

  return (
    <section id="signup" className="relative overflow-hidden bg-[#4A90D9] py-28">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3 bg-[repeating-linear-gradient(45deg,#FFC94A_0_16px,#FF7A59_16px_32px,#fff_32px_48px)]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-white"
        >
          <div className="text-xs font-black uppercase tracking-[0.3em] text-[#FFC94A]">
            Free Trial · 试课免费
          </div>
          <h2 className="mt-5 text-3xl font-black leading-snug tracking-tight sm:text-4xl">
            带一支旧画笔来,
            <br />
            其余的教室全包。
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-white/85 sm:text-base">
            试课 90 分钟,和正式班一起上(不是插班旁听)。
            下课后老师会跟你聊 10 分钟:孩子刚才画了什么、为什么、接下来适合哪个班。
          </p>
          <ul className="mt-8 space-y-3 text-sm text-white/90">
            {["每周六 10:00 / 14:00 两场,各 2 个试课位", "试课不收费、不推销、不绑定报名", "可自带围裙,教室也备有"].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FFC94A] text-[10px] font-black text-[#8B5E00]">
                  ✓
                </span>
                {t}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28, rotate: 1 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="rounded-3xl bg-white p-8 shadow-2xl sm:p-10"
        >
          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex min-h-[360px] flex-col items-center justify-center text-center"
            >
              <div className="text-5xl" aria-hidden>🎉</div>
              <h3 className="mt-5 text-2xl font-black text-[#2F3B52]">
                {form.name || "小画家"}的试课位留好了!
              </h3>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#5B6780]">
                {form.course} · {form.age} 岁。前台老师明天电话跟你确认场次,
                记得让宝贝带一支旧画笔来。
              </p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="mt-8 rounded-full border-2 border-[#2F3B52]/15 px-6 py-2.5 text-sm font-bold text-[#2F3B52] transition-colors hover:bg-[#2F3B52] hover:text-white"
              >
                再报一个娃
              </button>
            </motion.div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="space-y-4"
            >
              <h3 className="text-xl font-black text-[#2F3B52]">约一节免费试课</h3>
              <div className="grid grid-cols-2 gap-4">
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold text-[#5B6780]">孩子昵称</span>
                  <input required value={form.name} onChange={set("name")} placeholder="比如:米粒" className={inputCls} />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold text-[#5B6780]">年龄</span>
                  <input required type="number" min={3} max={12} value={form.age} onChange={set("age")} className={inputCls} />
                </label>
              </div>
              <label className="block">
                <span className="mb-1.5 block text-xs font-bold text-[#5B6780]">意向班级</span>
                <select value={form.course} onChange={set("course")} className={inputCls}>
                  {courses.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-bold text-[#5B6780]">家长手机号</span>
                <input
                  required
                  type="tel"
                  pattern="1[3-9]\d{9}"
                  value={form.phone}
                  onChange={set("phone")}
                  placeholder="11 位手机号"
                  className={inputCls}
                />
              </label>
              <button
                type="submit"
                className={cn(
                  "w-full rounded-full bg-[#FF7A59] py-3.5 text-sm font-black text-white",
                  "transition-all hover:-translate-y-0.5 hover:bg-[#F0603D] hover:shadow-lg",
                )}
              >
                提交,等前台老师电话
              </button>
              <p className="text-center text-[11px] text-[#8A93A6]">演示站点,表单不发送到任何服务器</p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export function KidsFooter() {
  return (
    <footer className="bg-[#2F3B52] text-white">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5">
              <KidsLogo className="h-9 w-9" />
              <span className="text-base font-black tracking-wide">小满美术教室</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              梧桐区槐安路 42 号院 · 二楼
              <br />
              0551-6642-4200(周二至周日 9:00–19:00)
            </p>
          </div>
          <div>
            <div className="text-xs font-black uppercase tracking-[0.2em] text-white/40">开放时间</div>
            <ul className="mt-3 space-y-2 text-sm text-white/75">
              <li>周二 – 周五 · 15:30 – 20:30</li>
              <li>周六 / 周日 · 9:30 – 18:00</li>
              <li>周一闭馆(老师交作业日)</li>
            </ul>
          </div>
          <div>
            <div className="text-xs font-black uppercase tracking-[0.2em] text-white/40">快速链接</div>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/kids#courses" className="text-white/75 transition-colors hover:text-white">班级与费用</Link></li>
              <li><Link href="/kids#works" className="text-white/75 transition-colors hover:text-white">作品墙</Link></li>
              <li><Link href="/#work" className="text-white/75 transition-colors hover:text-white">← 返回作品集</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-2 border-t border-white/10 pt-6 text-[10px] text-white/40 sm:flex-row">
          <p>© 2026 小满美术教室 · 保留所有权利</p>
          <p>客户项目 · 品牌官网设计 · 图片来自 Openverse / Wikimedia Commons(CC 授权)</p>
        </div>
      </div>
    </footer>
  );
}
