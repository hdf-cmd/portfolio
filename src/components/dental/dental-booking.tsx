"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { IconShield } from "./dental-icons";

const slots = ["工作日上午", "工作日下午", "夜诊", "周末"];
const chief = ["初诊检查", "牙痛", "磕碰出血", "涂氟", "换牙咨询"];

type Form = {
  nickname: string;
  birth: string;
  phone: string;
  topic: string;
  slot: string;
  store: string;
};

const empty: Form = { nickname: "", birth: "", phone: "", topic: chief[0], slot: slots[0], store: "拱墅总院" };

export function DentalBooking() {
  const [f, setF] = useState<Form>(empty);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [done, setDone] = useState<Form | null>(null);

  const errors: Partial<Record<keyof Form, string>> = {};
  if (!/^[\u4e00-\u9fa5a-zA-Z0-9]{2,8}$/.test(f.nickname)) errors.nickname = "小名两到八个字，名花有主也行";
  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(f.birth)) errors.birth = "选到年月就行，比如 2019-04";
  if (!/^1[3-9]\d{9}$/.test(f.phone)) errors.phone = f.phone.length > 0 && f.phone.length !== 11 ? `手机号十一位，现在 ${f.phone.length} 位` : "留个打得通的手机号";

  const show = (k: keyof Form) => (touched[k] || touched.__submit) && errors[k];
  const set = (k: keyof Form, v: string) => setF((s) => ({ ...s, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ ...touched, __submit: true });
    if (Object.keys(errors).length === 0) setDone(f);
  };

  const maskPhone = (p: string) => `${p.slice(0, 3)}****${p.slice(7)}`;
  const birthNote = (() => {
    if (!done) return "";
    const y = 2026 - Number(done.birth.slice(0, 4));
    if (y <= 2) return "婴幼儿期，先看乳牙萌出";
    if (y <= 6) return "涂氟习惯期";
    if (y <= 12) return "换牙期，重点盯六龄齿";
    return "恒牙列，可做正畸评估";
  })();

  return (
    <section id="booking" className="relative overflow-hidden bg-[#23B39A] py-24">
      {/* 刻意例外：表单块用品牌色实底 + CSS 圆点纹理，不叠实拍图（技能 §3 例外条款，已在方案 §4.2 报备） */}
      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{ backgroundImage: "radial-gradient(#F4FAF8 1.2px, transparent 1.2px)", backgroundSize: "22px 22px" }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-3xl px-6">
        <div className="text-center">
          <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#0E2A31]">
            Booking · 预约初诊
          </div>
          <h2 className="mx-auto mt-4 max-w-xl text-2xl font-bold tracking-tight text-[#0E2A31] sm:text-3xl">
            约一个不太会哭的上午。
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mt-10 rounded-3xl bg-white p-8 shadow-[0_32px_64px_-32px_rgba(14,42,49,0.5)] sm:p-10"
        >
          {done ? (
            <div className="text-center" role="status">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#23B39A]/12 text-[#0E7A63]">
                <IconShield className="h-7 w-7" />
              </div>
              <h3 className="mt-5 text-xl font-bold text-[#123840]">约上了。</h3>
              <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-[#4F6E75]">
                给 <b className="text-[#123840]">{done.nickname}</b> 约了{" "}
                <b className="text-[#123840]">{done.slot} · {done.store}</b>，出生年月{" "}
                <b className="font-mono tabular-nums text-[#123840]">{done.birth}</b>（{birthNote}）。
                联系方式 <b className="font-mono tabular-nums text-[#123840]">{maskPhone(done.phone)}</b>。
                第一次来只做检查和数牙，不治牙，前台会先给{" "}
                {done.nickname}一只小风车。
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => { setDone(null); setTouched({}); setF(empty); }}
                  className="rounded-full border border-[#123840]/16 px-6 py-2.5 text-sm font-semibold text-[#123840] transition-colors hover:border-[#23B39A]/50 active:scale-[0.98]"
                >
                  再约一个娃
                </button>
                <span className="text-xs text-[#4F6E75]">演示站点，表单不发送到任何服务器</span>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="dk-name" className="text-xs font-bold text-[#123840]">孩子小名</label>
                  <input
                    id="dk-name"
                    required
                    value={f.nickname}
                    onChange={(e) => set("nickname", e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, nickname: true }))}
                    placeholder="两到八个字"
                    aria-invalid={!!show("nickname")}
                    className={`mt-2 w-full rounded-2xl border bg-[#F4FAF8] px-4 py-3 text-sm text-[#123840] outline-none transition-colors focus:border-[#0E7A63] ${
                      show("nickname") ? "border-[#D9536B]" : "border-[#123840]/14"
                    }`}
                  />
                  {show("nickname") && <p className="mt-1.5 text-xs text-[#D9536B]">{errors.nickname}</p>}
                </div>
                <div>
                  <label htmlFor="dk-birth" className="text-xs font-bold text-[#123840]">出生年月</label>
                  <input
                    id="dk-birth"
                    type="month"
                    required
                    value={f.birth}
                    onChange={(e) => set("birth", e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, birth: true }))}
                    aria-invalid={!!show("birth")}
                    className={`mt-2 w-full rounded-2xl border bg-[#F4FAF8] px-4 py-3 text-sm tabular-nums text-[#123840] outline-none transition-colors focus:border-[#0E7A63] ${
                      show("birth") ? "border-[#D9536B]" : "border-[#123840]/14"
                    }`}
                  />
                  {show("birth") && <p className="mt-1.5 text-xs text-[#D9536B]">{errors.birth}</p>}
                </div>
              </div>
              <div>
                <label htmlFor="dk-phone" className="text-xs font-bold text-[#123840]">家长手机号</label>
                <input
                  id="dk-phone"
                  type="tel"
                  required
                  inputMode="numeric"
                  pattern="1[3-9]\d{9}"
                  value={f.phone}
                  onChange={(e) => set("phone", e.target.value.replace(/\D/g, "").slice(0, 11))}
                  onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
                  placeholder="11 位手机号"
                  aria-invalid={!!show("phone")}
                  className={`mt-2 w-full rounded-2xl border bg-[#F4FAF8] px-4 py-3 font-mono text-sm tabular-nums tracking-wider text-[#123840] outline-none transition-colors focus:border-[#0E7A63] ${
                    show("phone") ? "border-[#D9536B]" : "border-[#123840]/14"
                  }`}
                />
                {show("phone") && <p className="mt-1.5 text-xs text-[#D9536B]">{errors.phone}</p>}
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="dk-topic" className="text-xs font-bold text-[#123840]">来看什么</label>
                  <select
                    id="dk-topic"
                    value={f.topic}
                    onChange={(e) => set("topic", e.target.value)}
                    className="mt-2 w-full rounded-2xl border border-[#123840]/14 bg-[#F4FAF8] px-4 py-3 text-sm text-[#123840] outline-none focus:border-[#0E7A63]"
                  >
                    {chief.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="dk-store" className="text-xs font-bold text-[#123840]">门店</label>
                  <select
                    id="dk-store"
                    value={f.store}
                    onChange={(e) => set("store", e.target.value)}
                    className="mt-2 w-full rounded-2xl border border-[#123840]/14 bg-[#F4FAF8] px-4 py-3 text-sm text-[#123840] outline-none focus:border-[#0E7A63]"
                  >
                    {["拱墅总院", "西湖院", "滨江院", "余杭院"].map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <fieldset>
                <legend className="text-xs font-bold text-[#123840]">时段偏好</legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {slots.map((s) => (
                    <button
                      key={s}
                      type="button"
                      aria-pressed={f.slot === s}
                      onClick={() => set("slot", s)}
                      className={`rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-200 active:scale-[0.97] ${
                        f.slot === s
                          ? "border-[#0E7A63] bg-[#23B39A]/8 text-[#0E7A63]"
                          : "border-[#123840]/14 text-[#4F6E75] hover:border-[#23B39A]/45"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </fieldset>
              <button
                type="submit"
                className="w-full rounded-full bg-[#0E7A63] py-3.5 text-sm font-bold text-white shadow-[0_16px_36px_-16px_rgba(14,122,99,0.8)] transition-all duration-200 hover:bg-[#0B6351] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99]"
              >
                提交预约（初诊 ¥180，当天不治牙）
              </button>
              <p className="text-center text-[11px] leading-relaxed text-[#4F6E75]">
                演示站点，表单不发送到任何服务器 · 本站为设计演示作品，非真实医疗机构，就诊请以到院检查为准
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
