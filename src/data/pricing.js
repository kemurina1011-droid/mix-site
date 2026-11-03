export const pricing = [
  {
    id: "first",
    title: "初回",
    price: 4500,
    priceLabel: "¥4,500",
    suffix: "〜",
    description:
      "初めてご依頼いただく方向けの料金です。",
    note:
      "内容や作業量に応じて追加料金が発生する場合があります。",
    active: true,
    featured: false,
    order: 1,
  },

  {
    id: "short",
    title: "Short",
    price: 2500,
    priceLabel: "¥2,500",
    suffix: "〜",
    description:
      "Short動画・短尺向けのMIXです。",
    note:
      "短尺の歌ってみたやSNS投稿向けにおすすめです。",
    active: true,
    featured: false,
    order: 2,
  },

  {
    id: "one-chorus",
    title: "ワンコーラス",
    price: 3500,
    priceLabel: "¥3,500",
    suffix: "〜",
    description:
      "ワンコーラスまでのMIXです。",
    note:
      "フル尺ではない歌ってみた制作に適しています。",
    active: true,
    featured: false,
    order: 3,
  },

  {
    id: "full",
    title: "Full",
    price: 5000,
    priceLabel: "¥5,000",
    suffix: "〜",
    description:
      "フルコーラスの歌ってみたMIXです。",
    note:
      "メインボーカルを中心に、楽曲全体との馴染みまで仕上げます。",
    active: true,

    /*
     * 3Dロータリー表示時に
     * 最初に中央へ表示する候補
     */
    featured: true,

    order: 4,
  },
];


/* =========================================================
   Utility
   ========================================================= */


/*
 * 公開対象の料金だけ取得
 */
export function getActivePricing() {
  return pricing
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
export function getPricingById(id) {
  return pricing.find(
    (item) =>
      item.id === id
  );
}


/*
 * 初期表示候補
 */
export function getFeaturedPricing() {
  return pricing.find(
    (item) =>
      item.active === true &&
      item.featured === true
  );
}