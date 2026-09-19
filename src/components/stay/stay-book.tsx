"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const roomTypes = ["湖景大床房", "山景亲子房", "独栋木屋"];

export function StayBook() {
  const [form, setForm] = useState({
    checkin: "",
    checkout: "",
    room: roomTypes[0],
    guests: "2",
    name: "",
    phone: "",
  });
  const [sent, setSent] = useState(false);

  const set = (k: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const inputCls =
    "w-full rounded-lg border border-[#1F3A4D]/15 bg-white px-4 py-3 text-sm text-[#1F3A4D] outline-none transition-colors focus:border-[#C89B6A]";

  return (
    <section id="book" className="relative bg-[#FAF7F2] py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          <div className="text-[11px] uppercase tracking-[0.32em] text-[#C89B6A]">
            Booking · 在线留房
          </div>
          <h2 className="mt-5 font-serif text-3xl font-semibold leading-snug tracking-tight text-[#1F3A4D] sm:text-4xl">
            先留房,
            <br />
            定金到店再说。
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-[#5B6B75]">
            填完表单 30 分钟内管家会电话确认。旺季(7-9 月、雪季)建议提前两周,
            独栋木屋每月只放出 4 晚。
          </p>
          <ul className="mt-8 space-y-3 text-sm text-[#3E525E]">
            {["免费取消:入住前 7 天", "含双早 + 下午茶 + 晚安甜汤", "宠物友好(独栋木屋)", "接驳:县城车站专车往返"].map(
              (t) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C89B6A]" aria-hidden />
                  {t}
                </li>
              ),
            )}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="rounded-3xl border border-[#1F3A4D]/10 bg-white p-8 shadow-[0_30px_80px_-40px_rgba(31,58,77,0.35)] sm:p-10"
        >
          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex min-h-[420px] flex-col items-center justify-center text-center"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#C89B6A]/15 text-3xl text-[#C89B6A]">
                ✓
              </div>
              <h3 className="mt-6 font-serif text-2xl font-semibold text-[#1F3A4D]">
                收到,{form.name || "贵客"}!
              </h3>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#5B6B75]">
                {form.checkin || "入住日"} · {form.room} · {form.guests} 位。
                管家马上电话联系你,留意陌生号码。
              </p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="mt-8 rounded-full border border-[#1F3A4D]/20 px-6 py-2.5 text-sm text-[#1F3A4D] transition-colors hover:bg-[#1F3A4D] hover:text-white"
              >
                再订一单
              </button>
            </motion.div>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <label className="block">
                  <span className="mb-1.5 block text-xs font-medium text-[#5B6B75]">入住</span>
                  <input type="date" required value={form.checkin} onChange={set("checkin")} className={inputCls} />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-medium text-[#5B6B75]">离店</span>
                  <input type="date" required value={form.checkout} onChange={set("checkout")} className={inputCls} />
                </label>
              </div>
              <label className="block">
                <span className="mb-1.5 block text-xs font-medium text-[#5B6B75]">房型</span>
                <select value={form.room} onChange={set("room")} className={inputCls}>
                  {roomTypes.map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-medium text-[#5B6B75]">入住人数</span>
                <select value={form.guests} onChange={set("guests")} className={inputCls}>
                  {["1", "2", "3", "4", "5+"].map((g) => (
                    <option key={g}>{g}</option>
                  ))}
                </select>
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className="block">
                  <span className="mb-1.5 block text-xs font-medium text-[#5B6B75]">称呼</span>
                  <input required value={form.name} onChange={set("name")} placeholder="怎么称呼" className={cn(inputCls, "placeholder:text-[#9AA8B0]/60")} />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-medium text-[#5B6B75]">手机号</span>
                  <input
                    required
                    type="tel"
                    pattern="1[3-9]\d{9}"
                    value={form.phone}
                    onChange={set("phone")}
                    placeholder="11 位手机号"
                    className={cn(inputCls, "placeholder:text-[#9AA8B0]/60")}
                  />
                </label>
              </div>
              <button
                type="submit"
                className="mt-2 w-full rounded-full bg-[#1F3A4D] py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#2C4F66]"
              >
                提交留房 · 30 分钟内回电
              </button>
              <p className="text-center text-[11px] text-[#9AA8B0]">
                演示站点,表单不发送到任何服务器
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
