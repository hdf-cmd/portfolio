"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useState } from "react";
import { IconMoon } from "./dental-icons";

const stores = [
  { name: "拱墅总院", area: "拱墅", img: "/dental/store-1.jpg", addr: "莫干山路 818 号 3 幢 1–2 层", tel: "0571-8855 2130", hours: "周一至周日 9:00–20:30", night: true, size: "620㎡ · 12 间诊室" },
  { name: "西湖院", area: "西湖", img: "/dental/store-2.jpg", addr: "教工路 24 号 A 座 2 层", tel: "0571-8765 4120", hours: "周一至周日 9:00–18:30", night: false, size: "260㎡ · 6 间诊室" },
  { name: "滨江院", area: "滨江", img: "/dental/store-3.jpg", addr: "江南大道 3968 号 1 层", tel: "0571-8687 5130", hours: "周一至周日 10:00–21:00", night: true, size: "320㎡ · 8 间诊室" },
  { name: "余杭院", area: "余杭", img: "/dental/store-4.jpg", addr: "文一西路 1500 号 4 层", tel: "0571-8866 7030", hours: "周二至周日 9:00–18:30（周一院休）", night: false, size: "240㎡ · 5 间诊室" },
];

const areas = ["全部", "拱墅", "西湖", "滨江", "余杭"];

export function DentalStores() {
  const [area, setArea] = useState("全部");
  const [nightOnly, setNightOnly] = useState(false);
  const list = stores.filter(
    (s) => (area === "全部" || s.area === area) && (!nightOnly || s.night)
  );

  return (
    <section id="stores" className="relative overflow-hidden bg-[#F4FAF8] py-24">
      <Image
        src="/dental/detail-mirror.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-50"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#F4FAF8] via-[#F4FAF8]/45 to-[#F4FAF8]" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#0E7A63]">
              Clinics · 门店
            </div>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-[#123840] sm:text-3xl">
              四家门店，一家周一歇。
            </h2>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={nightOnly}
            onClick={() => setNightOnly(!nightOnly)}
            className={`flex h-fit items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-200 active:scale-[0.97] ${
              nightOnly
                ? "border-[#0E7A63] bg-[#0E7A63] text-white"
                : "border-[#123840]/16 bg-white text-[#4F6E75] hover:border-[#23B39A]/50"
            }`}
          >
            <IconMoon className="h-4 w-4" />
            仅看有夜诊
          </button>
        </div>

        <div role="tablist" aria-label="按区筛选" className="mt-8 flex flex-wrap gap-2">
          {areas.map((a) => (
            <button
              key={a}
              type="button"
              role="tab"
              aria-selected={area === a}
              onClick={() => setArea(a)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 active:scale-[0.97] ${
                area === a
                  ? "bg-[#123840] text-white"
                  : "border border-[#123840]/14 bg-white/70 text-[#4F6E75] hover:border-[#23B39A]/45"
              }`}
            >
              {a}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {list.map((s, i) => (
            <motion.article
              key={s.name}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="group overflow-hidden rounded-3xl border border-[#23B39A]/14 bg-white/85 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-28px_rgba(18,56,64,0.28)] active:translate-y-0"
            >
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={s.img}
                  alt={`${s.name}外立面`}
                  fill
                  sizes="(min-width:640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {s.night && (
                  <span className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-[#0E2A31]/85 px-3 py-1 text-[10px] font-bold text-white">
                    <IconMoon className="h-3 w-3" /> 夜诊
                  </span>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-base font-bold text-[#123840]">{s.name}</h3>
                  <span className="text-xs tabular-nums text-[#4F6E75]">{s.size}</span>
                </div>
                <p className="mt-2 text-sm text-[#4F6E75]">杭州市{s.area}区{s.addr}</p>
                <div className="mt-3 flex items-baseline justify-between border-t border-[#123840]/8 pt-3 text-xs">
                  <span className="text-[#4F6E75]">{s.hours}</span>
                  <a
                    href={`tel:${s.tel.replace(/ /g, "")}`}
                    className="font-mono font-semibold text-[#0E7A63] transition-colors hover:text-[#123840] active:scale-[0.98]"
                  >
                    {s.tel}
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
          {list.length === 0 && (
            <p className="col-span-2 rounded-3xl border border-dashed border-[#123840]/20 p-10 text-center text-sm text-[#4F6E75]">
              该组合下暂时没有门店——夜诊目前只有拱墅总院与滨江院。
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
