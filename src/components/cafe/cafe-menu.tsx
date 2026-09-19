"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type MenuItem = {
  name: string;
  en: string;
  desc: string;
  price: string;
  img: string;
  badge?: string;
};

const categories: { id: string; label: string; note: string; items: MenuItem[] }[] = [
  {
    id: "espresso",
    label: "经典浓缩",
    note: "拼配豆「山雾基底」,中深烘焙,奶咖打底稳得很。",
    items: [
      { name: "美式", en: "Americano", desc: "双份浓缩 · 山泉水", price: "¥22", img: "/cafe/menu/americano.jpg" },
      { name: "拿铁", en: "Caffè Latte", desc: "鲜牛乳 · 可换燕麦奶 +3", price: "¥28", img: "/cafe/menu/latte.jpg" },
      { name: "澳白", en: "Flat White", desc: "双份 ristretto · 薄奶泡", price: "¥30", img: "/cafe/menu/flatwhite.jpg" },
      { name: "摩卡", en: "Caffè Mocha", desc: "70% 黑巧 · 微苦回甘", price: "¥32", img: "/cafe/menu/mocha.jpg" },
      { name: "Dirty", en: "Dirty", desc: "冰博克牛奶 · 大口喝", price: "¥30", img: "/cafe/menu/dirty.jpg", badge: "店员推荐" },
    ],
  },
  {
    id: "pourover",
    label: "手冲单品",
    note: "与本季豆单同步,三支云南高山豆,现点现冲。",
    items: [
      { name: "雾里高山", en: "Misty Highland", desc: "茉莉 · 柑橘 · 红糖尾韵", price: "¥38", img: "/cafe/menu/pourover-wuli.jpg", badge: "镇店" },
      { name: "落日晚霞", en: "Sunset Glow", desc: "熟莓 · 黑巧 · 坚果", price: "¥38", img: "/cafe/menu/pourover-luori.jpg" },
      { name: "林间晨雾", en: "Morning Fog", desc: "柠檬草 · 绿茶 · 蜂蜜", price: "¥42", img: "/cafe/menu/pourover-linjian.jpg" },
      { name: "手冲双拼", en: "Trio Flight", desc: "三支各 120ml · 含杯测讲解", price: "¥88", img: "/cafe/menu/pourover-flight.jpg", badge: "体验装" },
    ],
  },
  {
    id: "signature",
    label: "屿雾特调",
    note: "把云南风土装进杯子里的招牌作品。",
    items: [
      { name: "雾奶云", en: "Misty Cloud", desc: "冷萃奶盖 · 烤米香", price: "¥36", img: "/cafe/menu/signature-wunaiyun.jpg", badge: "招牌" },
      { name: "保山糖包", en: "Baoshan Sugar", desc: "红糖姜汁 · 浓缩沉底", price: "¥34", img: "/cafe/menu/signature-baoshan.jpg" },
      { name: "日落长夏", en: "Endless Summer", desc: "云南百香果 · 气泡冷萃", price: "¥36", img: "/cafe/menu/signature-riluo.jpg" },
      { name: "雨后山林", en: "After Rain", desc: "抹茶 · 玄米 · 燕麦奶", price: "¥34", img: "/cafe/menu/signature-yuhou.jpg" },
    ],
  },
  {
    id: "seasonal",
    label: "季节限定",
    note: "只在风味最好的窗口期供应,售完即止。",
    items: [
      { name: "桂花酒酿冷萃", en: "Osmanthus Brew", desc: "秋日限定 · 米酒微醺", price: "¥42", img: "/cafe/menu/seasonal-osmanthus.jpg", badge: "限定" },
      { name: "柑橘高山红茶", en: "Citrus Black", desc: "无咖啡 · 云南红茶底", price: "¥30", img: "/cafe/menu/seasonal-citrus.jpg" },
      { name: "热红酒式香料咖啡", en: "Spiced Red", desc: "肉桂 · 丁香 · 橙皮", price: "¥38", img: "/cafe/menu/seasonal-spiced.jpg", badge: "冬日" },
    ],
  },
  {
    id: "dessert",
    label: "甜点搭配",
    note: "后厨每天只做一炉,卖完收工。",
    items: [
      { name: "巴斯克芝士", en: "Basque Cheesecake", desc: "焦香流心 · 配黑咖绝了", price: "¥28", img: "/cafe/menu/dessert-basque.jpg", badge: "热卖" },
      { name: "红糖布朗尼", en: "Brown Sugar Brownie", desc: "云南红糖 · 温热上桌", price: "¥24", img: "/cafe/menu/dessert-brownie.jpg" },
      { name: "酸种蛋挞", en: "Sourdough Tart", desc: "每日三只 · 手冲伴侣", price: "¥18", img: "/cafe/menu/dessert-tart.jpg" },
      { name: "米乳布丁", en: "Rice Milk Pudding", desc: "玄米香 · 素可", price: "¥20", img: "/cafe/menu/dessert-pudding.jpg" },
    ],
  },
];

export function CafeMenu() {
  const [active, setActive] = useState(categories[0].id);
  const current = categories.find((c) => c.id === active) ?? categories[0];

  return (
    <>
      {/* 页头：咖啡吧台摄影垫底 */}
      <section className="relative overflow-hidden">
        <Image
          src="/cafe/story-brew.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#120A04]/82" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#120A04]" />

        <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-[11px] uppercase tracking-[0.32em] text-[#E8C69B]/80"
          >
            Menu · 全部出品
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.12 }}
            className="mt-6 font-serif text-4xl font-semibold tracking-tight text-[#F5EADA] sm:text-5xl"
          >
            这一季的菜单,
            <span className="bg-gradient-to-r from-[#E8C69B] to-[#8B5A2B] bg-clip-text text-transparent">
              都写在山上。
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.26 }}
            className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-[#A38B6E] sm:text-base"
          >
            从经典浓缩到季节限定,共 {categories.reduce((n, c) => n + c.items.length, 0)} 支出品。
            手冲与豆单同步轮换,特调每季微调。
          </motion.p>
        </div>
      </section>

      {/* 分类切换 + 出品列表 */}
      <section className="mx-auto max-w-6xl px-6 pb-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-2.5"
        >
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setActive(c.id)}
              className={cn(
                "rounded-full border px-5 py-2 text-sm transition-all duration-300",
                active === c.id
                  ? "border-[#C99A5B] bg-[#C99A5B] text-[#1A0F06]"
                  : "border-[#C99A5B]/25 text-[#A38B6E] hover:border-[#C99A5B]/60 hover:text-[#F5EADA]",
              )}
            >
              {c.label}
            </button>
          ))}
        </motion.div>

        <p key={current.id + "-note"} className="mt-8 text-center text-sm text-[#8A7358]">
          {current.note}
        </p>

        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mx-auto mt-10 grid max-w-4xl gap-3"
        >
          {current.items.map((item, i) => (
            <div
              key={item.name}
              className="group flex items-center gap-5 rounded-xl border border-[#C99A5B]/12 bg-[#1A0F06]/50 px-5 py-4 transition-colors hover:border-[#C99A5B]/40"
            >
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-[#C99A5B]/15">
                <Image
                  src={item.img}
                  alt={item.name}
                  fill
                  sizes="80px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h3 className="font-serif text-lg font-semibold text-[#F5EADA]">
                    {item.name}
                  </h3>
                  <span className="text-[10px] uppercase tracking-[0.18em] text-[#8A7358]">
                    {item.en}
                  </span>
                  {item.badge && (
                    <span className="rounded-full bg-[#C99A5B]/15 px-2 py-0.5 text-[10px] text-[#E8C69B]">
                      {item.badge}
                    </span>
                  )}
                </div>
                <p className="mt-1.5 text-sm text-[#A38B6E]">{item.desc}</p>
              </div>
              <div
                className="mx-2 hidden h-px w-16 flex-1 border-b border-dotted border-[#C99A5B]/25 sm:block"
                aria-hidden
              />
              <span className="shrink-0 self-start pt-1 font-mono text-sm text-[#E8C69B]">
                {item.price}
              </span>
              <span className="sr-only">{i + 1}</span>
            </div>
          ))}
        </motion.div>

        {/* 镇店体验：手冲双拼引导卡 */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="relative mt-20 overflow-hidden rounded-3xl border border-[#C99A5B]/25"
        >
          <Image
            src="/cafe/reserve.jpg"
            alt="吧台上的一壶手冲咖啡"
            width={1200}
            height={520}
            sizes="(min-width: 1024px) 1100px, 100vw"
            className="h-64 w-full object-cover opacity-60 sm:h-80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#120A04]/92 via-[#120A04]/60 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center gap-4 px-8 sm:px-14">
            <div className="text-[11px] uppercase tracking-[0.32em] text-[#E8C69B]/80">
              坐下来,慢慢喝
            </div>
            <h2 className="max-w-md font-serif text-2xl font-semibold leading-snug text-[#F5EADA] sm:text-3xl">
              吧台十二席,手冲双拼含杯测讲解
            </h2>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/cafe#reserve"
                className="rounded-full bg-[#C99A5B] px-6 py-2.5 text-sm font-medium text-[#1A0F06] transition-colors hover:bg-[#E8C69B]"
              >
                预约吧台席
              </Link>
              <Link
                href="/cafe/store"
                className="rounded-full border border-[#C99A5B]/40 px-6 py-2.5 text-sm text-[#F5EADA] transition-colors hover:bg-[#C99A5B]/10"
              >
                看看门店 →
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
