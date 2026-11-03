export const discounts = [
  {
    id: "flexible-delivery",
    title: "納期お任せ",
    amount: 500,
    amountLabel: "-¥500",
    description:
      "納期をこちらにお任せいただける場合の割引です。",
    note:
      "スケジュールに余裕がある場合におすすめです。",
    active: true,
    featured: true,
    order: 1,
  },

  {
    id: "bank-transfer",
    title: "銀行振込",
    amount: 500,
    amountLabel: "-¥500",
    description:
      "銀行振込をご利用いただく場合の割引です。",
    note:
      "決済方法として銀行振込を選択した場合に適用します。",
    active: true,
    featured: false,
    order: 2,
  },

  {
    id: "no-correction",
    title: "補正不要",
    amount: 1000,
    amountLabel: "-¥1,000",
    description:
      "ピッチ・タイミング補正が不要な場合の割引です。",
    note:
      "提出データの状態を確認したうえで適用します。",
    active: true,
    featured: false,
    order: 3,
  },

  {
    id: "repeat",
    title: "継続依頼",
    amount: 1000,
    amountLabel: "-¥1,000",
    description:
      "継続してご依頼いただいている方向けの割引です。",
    note:
      "3回目のご依頼時に適用します。",
    active: true,
    featured: false,
    order: 4,
  },

  {
    id: "referral",
    title: "ご友人紹介",
    amount: 1000,
    amountLabel: "-¥1,000",
    description:
      "ご友人をご紹介いただいた場合の割引です。",
    note:
      "紹介条件を確認したうえで適用します。",
    active: true,
    featured: false,
    order: 5,
  },
];


/* =========================================================
   Utility
   ========================================================= */


/*
 * 公開対象の割引だけ取得
 */
export function getActiveDiscounts() {
  return discounts
    .filter(
      (item) =>
        item.active === true
    )
    .sort(
      (a, b) =>
        a.order - b.order
    );
}


/*
 * ID指定
 */
export function getDiscountById(id) {
  return discounts.find(
    (item) =>
      item.id === id
  );
}


/*
 * 初期表示候補
 */
export function getFeaturedDiscount() {
  return discounts.find(
    (item) =>
      item.active === true &&
      item.featured === true
  );
}